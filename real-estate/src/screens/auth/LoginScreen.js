import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      Alert.alert('Login Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Ionicons name="business" size={40} color={colors.white} />
          </View>
          <Text style={styles.appName}>PropManager</Text>
          <Text style={styles.tagline}>Smart Real Estate Management</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome Back</Text>
          <Text style={styles.cardSubtitle}>Sign in to your account</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="mail-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="lock-closed-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Enter your password"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.loginBtnText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>
              Don't have an account? <Text style={styles.registerTextBold}>Register here</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  scroll: { flexGrow: 1, paddingHorizontal: 24 },
  header: { alignItems: 'center', paddingTop: 80, paddingBottom: 40 },
  logoBox: {
    width: 80, height: 80, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)',
  },
  appName: { fontSize: 28, fontWeight: '800', color: colors.white, letterSpacing: 0.5 },
  tagline: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  card: {
    backgroundColor: colors.white, borderRadius: 24, padding: 28,
    marginBottom: 32, elevation: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 12,
  },
  cardTitle: { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
  cardSubtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 4, marginBottom: 24 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 12, fontWeight: '700', color: colors.textPrimary, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: colors.border,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    backgroundColor: colors.surfaceAlt,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: colors.textPrimary },
  loginBtn: {
    backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 15,
    alignItems: 'center', marginTop: 8, elevation: 4,
    shadowColor: colors.primary, shadowOpacity: 0.4, shadowRadius: 8,
  },
  loginBtnText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  registerLink: { marginTop: 20, alignItems: 'center' },
  registerText: { fontSize: 13, color: colors.textSecondary },
  registerTextBold: { color: colors.primary, fontWeight: '700' },
});

export default LoginScreen;
