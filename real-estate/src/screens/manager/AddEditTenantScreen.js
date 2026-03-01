import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { collection, addDoc, updateDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const AddEditTenantScreen = ({ navigation, route }) => {
  const existing = route.params?.tenant;
  const preProperty = route.params?.propertyId;

  const [form, setForm] = useState({
    name: existing?.name || '',
    email: existing?.email || '',
    phone: existing?.phone || '',
    whatsappNumber: existing?.whatsappNumber || '',
    nationalId: existing?.nationalId || '',
    propertyId: existing?.propertyId || preProperty || '',
    propertyName: existing?.propertyName || '',
    unitNumber: existing?.unitNumber || '',
    monthlyRent: existing?.monthlyRent?.toString() || '',
    leaseStart: existing?.leaseStart || '',
    leaseEnd: existing?.leaseEnd || '',
  });
  const [loading, setLoading] = useState(false);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.name || !form.phone || !form.unitNumber || !form.monthlyRent) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      const data = {
        ...form,
        whatsappNumber: form.whatsappNumber || form.phone,
        monthlyRent: parseFloat(form.monthlyRent) || 0,
        updatedAt: new Date().toISOString(),
      };
      if (existing) {
        await updateDoc(doc(db, 'tenants', existing.id), data);
        Alert.alert('Success', 'Tenant updated');
      } else {
        await addDoc(collection(db, 'tenants'), { ...data, createdAt: new Date().toISOString() });
        Alert.alert('Success', 'Tenant added');
      }
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, field, placeholder, keyboard = 'default' }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={form[field]}
        onChangeText={v => update(field, v)}
        keyboardType={keyboard}
        autoCapitalize={['email'].includes(field) ? 'none' : 'words'}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>{existing ? 'Edit Tenant' : 'Add Tenant'}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        <Text style={styles.section}>Personal Info</Text>
        <Field label="Full Name *" field="name" placeholder="Tenant full name" />
        <Field label="Phone Number *" field="phone" placeholder="+254 700 000 000" keyboard="phone-pad" />
        <Field label="WhatsApp Number" field="whatsappNumber" placeholder="Same as phone if blank" keyboard="phone-pad" />
        <Field label="Email Address" field="email" placeholder="tenant@email.com" keyboard="email-address" />
        <Field label="National ID" field="nationalId" placeholder="ID Number" keyboard="numeric" />

        <Text style={styles.section}>Lease Details</Text>
        <Field label="Unit Number *" field="unitNumber" placeholder="e.g. A1, 2B, 101" />
        <Field label="Monthly Rent (KES) *" field="monthlyRent" placeholder="e.g. 15000" keyboard="numeric" />
        <Field label="Lease Start Date *" field="leaseStart" placeholder="YYYY-MM-DD" />
        <Field label="Lease End Date" field="leaseEnd" placeholder="YYYY-MM-DD" />
        <Field label="Property Name" field="propertyName" placeholder="e.g. Sunrise Apartments" />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={loading}>
          {loading ? <ActivityIndicator color={colors.white} /> : (
            <>
              <Ionicons name="checkmark-circle" size={20} color={colors.white} />
              <Text style={styles.saveBtnText}>{existing ? 'Update Tenant' : 'Add Tenant'}</Text>
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
  section: {
    fontSize: 11, fontWeight: '800', color: colors.primary, textTransform: 'uppercase',
    letterSpacing: 1, marginTop: 18, marginBottom: 12,
    borderLeftWidth: 3, borderLeftColor: colors.accent, paddingLeft: 8,
  },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 11, fontWeight: '700', color: colors.textPrimary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  input: {
    backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.border,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15, color: colors.textPrimary,
  },
  saveBtn: {
    backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20,
  },
  saveBtnText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});

export default AddEditTenantScreen;
