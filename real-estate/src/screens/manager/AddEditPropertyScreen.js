import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Alert, ActivityIndicator, Image,
} from 'react-native';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../../../firebase';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const TYPES = ['Residential', 'Commercial', 'Mixed Use', 'Apartments'];

const AddEditPropertyScreen = ({ navigation, route }) => {
  const existing = route.params?.property;
  const [form, setForm] = useState({
    name: existing?.name || '',
    address: existing?.address || '',
    type: existing?.type || 'Residential',
    totalUnits: existing?.totalUnits?.toString() || '',
    description: existing?.description || '',
  });
  const [image, setImage] = useState(existing?.imageUrl || null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') { Alert.alert('Permission needed', 'Allow photo access'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [16, 9], quality: 0.8 });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    const resp = await fetch(uri);
    const blob = await resp.blob();
    const imgRef = ref(storage, `properties/${Date.now()}.jpg`);
    await uploadBytes(imgRef, blob);
    const url = await getDownloadURL(imgRef);
    setUploading(false);
    return url;
  };

  const handleSave = async () => {
    if (!form.name || !form.address) { Alert.alert('Error', 'Name and address are required'); return; }
    setLoading(true);
    try {
      let imageUrl = existing?.imageUrl || null;
      if (image && image !== existing?.imageUrl) imageUrl = await uploadImage(image);
      const data = {
        ...form,
        totalUnits: parseInt(form.totalUnits) || 0,
        imageUrl,
        updatedAt: new Date().toISOString(),
      };
      if (existing) {
        await updateDoc(doc(db, 'properties', existing.id), data);
        Alert.alert('Success', 'Property updated');
      } else {
        await addDoc(collection(db, 'properties'), { ...data, createdAt: new Date().toISOString() });
        Alert.alert('Success', 'Property added');
      }
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>{existing ? 'Edit Property' : 'Add Property'}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Image Picker */}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="camera" size={32} color={colors.primary} />
              <Text style={styles.imageText}>Tap to add property photo</Text>
            </View>
          )}
          <View style={styles.cameraOverlay}>
            <Ionicons name="camera" size={16} color={colors.white} />
          </View>
        </TouchableOpacity>

        {/* Type Selector */}
        <Text style={styles.label}>Property Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {TYPES.map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.typeChip, form.type === t && styles.typeChipActive]}
              onPress={() => update('type', t)}
            >
              <Text style={[styles.typeText, form.type === t && styles.typeTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {[
          { label: 'Property Name *', field: 'name', placeholder: 'e.g. Sunrise Apartments' },
          { label: 'Address *', field: 'address', placeholder: 'Full address' },
          { label: 'Total Units', field: 'totalUnits', placeholder: 'e.g. 12', keyboard: 'numeric' },
          { label: 'Description', field: 'description', placeholder: 'Optional notes...', multi: true },
        ].map(({ label, field, placeholder, keyboard, multi }) => (
          <View key={field} style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={[styles.input, multi && styles.inputMulti]}
              placeholder={placeholder}
              placeholderTextColor={colors.textMuted}
              value={form[field]}
              onChangeText={v => update(field, v)}
              keyboardType={keyboard || 'default'}
              multiline={multi}
              numberOfLines={multi ? 3 : 1}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={loading || uploading}>
          {loading || uploading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={20} color={colors.white} />
              <Text style={styles.saveBtnText}>{existing ? 'Update Property' : 'Add Property'}</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary, paddingTop: 56, paddingHorizontal: 20, paddingBottom: 20,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: '800', color: colors.white },
  scroll: { padding: 16, paddingBottom: 40 },
  imagePicker: { width: '100%', height: 180, borderRadius: 16, overflow: 'hidden', marginBottom: 20, position: 'relative' },
  imagePreview: { width: '100%', height: '100%' },
  imagePlaceholder: {
    flex: 1, backgroundColor: colors.surfaceAlt, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center', borderWidth: 2,
    borderColor: colors.border, borderStyle: 'dashed', gap: 8,
  },
  imageText: { fontSize: 13, color: colors.textSecondary },
  cameraOverlay: {
    position: 'absolute', bottom: 10, right: 10,
    backgroundColor: colors.primary, width: 34, height: 34, borderRadius: 17,
    justifyContent: 'center', alignItems: 'center',
  },
  label: { fontSize: 11, fontWeight: '700', color: colors.textPrimary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  typeChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 8,
    borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.white,
  },
  typeChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  typeText: { fontSize: 13, color: colors.textSecondary },
  typeTextActive: { color: colors.white, fontWeight: '700' },
  inputGroup: { marginBottom: 14 },
  input: {
    backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.border,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15, color: colors.textPrimary,
  },
  inputMulti: { height: 90, textAlignVertical: 'top' },
  saveBtn: {
    backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8,
  },
  saveBtnText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});

export default AddEditPropertyScreen;
