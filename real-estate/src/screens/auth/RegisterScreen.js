import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', whatsapp: '', password: '', role: 'manager' });
  const [loading, setLoading] = useState(false);

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email.trim(), form.password);
      await setDoc(doc(db, 'users', cred.user.uid), {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        whatsappNumber: form.whatsapp.trim() || form.phone.trim(),
        role: form.role,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      Alert.alert('Registration Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  const RoleBtn = ({ label, value, icon }) => (
    <TouchableOpacity
      style={[styles.roleBtn, form.role === value && styles.roleBtnActive]}
      onPress={() => update('role', value)}
    >
      <Ionicons name={icon} size={20} color={form.role === value ? colors.white : colors.primary} />
      <Text style={[styles.roleBtnText, form.role === value && styles.roleBtnTextActive]}>{label}</Text>
    </TouchableOpacity>
  );

  const Field = ({ label, field, placeholder, keyboard = 'default', secure = false }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={form[field]}
          onChangeText={v => update(field, v)}
          keyboardType={keyboard}
          secureTextEntry={secure}
          autoCapitalize={field === 'email' ? 'none' : 'words'}
        />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Join PropManager</Text>
          <Text style={styles.cardSubtitle}>Select your role and fill in your details</Text>

          {/* Role Selection */}
          <View style={styles.roleRow}>
            <RoleBtn label="Manager" value="manager" icon="briefcase" />
            <RoleBtn label="Tenant" value="tenant" icon="home" />
          </View>

          <Field label="Full Name *" field="name" placeholder="Your full name" />
          <Field label="Email Address *" field="email" placeholder="email@example.com" keyboard="email-address" />
          <Field label="Phone Number *" field="phone" placeholder="+254 700 000 000" keyboard="phone-pad" />
          <Field label="WhatsApp Number" field="whatsapp" placeholder="Same as phone if blank" keyboard="phone-pad" />
          <Field label="Password *" field="password" placeholder="Min 6 characters" secure />

          {form.role === 'tenant' && (
            <View style={styles.infoBox}>
              <Ionicons name="information-circle" size={16} color={colors.info} />
              <Text style={styles.infoText}>
                As a tenant, your manager will link you to your unit after registration.
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.btn} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.btnText}>Create Account</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginLink} onPress={() => navigation.goBack()}>
            <Text style={styles.loginText}>Already have an account? <Text style={styles.loginBold}>Sign In</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingBottom: 30 },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: colors.white },
  card: { backgroundColor: colors.white, borderRadius: 24, padding: 24, elevation: 8 },
  cardTitle: { fontSize: 20, fontWeight: '800', color: colors.textPrimary },
  cardSubtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 4, marginBottom: 20 },
  roleRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  roleBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderWidth: 2, borderColor: colors.primary, borderRadius: 12, paddingVertical: 12,
  },
  roleBtnActive: { backgroundColor: colors.primary },
  roleBtnText: { fontSize: 14, fontWeight: '700', color: colors.primary },
  roleBtnTextActive: { color: colors.white },
  inputGroup: { marginBottom: 14 },
  label: { fontSize: 11, fontWeight: '700', color: colors.textPrimary, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  inputWrap: {
    borderWidth: 1.5, borderColor: colors.border, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, backgroundColor: colors.surfaceAlt,
  },
  input: { fontSize: 15, color: colors.textPrimary },
  infoBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: '#EBF5FB', borderRadius: 10, padding: 12, marginBottom: 16,
  },
  infoText: { flex: 1, fontSize: 12, color: colors.info },
  btn: {
    backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 15,
    alignItems: 'center', marginTop: 8,
  },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  loginLink: { marginTop: 16, alignItems: 'center' },
  loginText: { fontSize: 13, color: colors.textSecondary },
  loginBold: { color: colors.primary, fontWeight: '700' },
});

export default RegisterScreen;
