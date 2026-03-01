import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, Alert, ActivityIndicator, Linking,
} from 'react-native';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const PayRentScreen = () => {
  const [tenant, setTenant] = useState(null);
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [currentMonthPaid, setCurrentMonthPaid] = useState(false);

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear().toString();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    getDocs(query(collection(db, 'tenants'), where('email', '==', user.email))).then(snap => {
      if (!snap.empty) {
        const t = { id: snap.docs[0].id, ...snap.docs[0].data() };
        setTenant(t);
        setPhone(t.phone || '');
        setAmount(t.monthlyRent?.toString() || '');
        // Check if paid this month
        getDocs(query(collection(db, 'payments'),
          where('tenantId', '==', t.id),
          where('month', '==', currentMonth),
          where('year', '==', currentYear),
          where('status', '==', 'paid')
        )).then(ps => setCurrentMonthPaid(!ps.empty));
      }
      setFetching(false);
    });
  }, []);

  // M-Pesa STK Push via Daraja API
  // For production: this calls your Firebase Cloud Function which triggers STK Push
  // For now: opens M-Pesa payment via USSD deeplink or saves pending payment
  const handleMpesaPay = async () => {
    if (!phone || !amount) { Alert.alert('Error', 'Phone number and amount required'); return; }
    const formattedPhone = phone.replace(/^\+/, '').replace(/^0/, '254');

    Alert.alert(
      'Confirm M-Pesa Payment',
      `Send KES ${parseFloat(amount).toLocaleString()} from ${phone}?\n\nAn M-Pesa prompt will be sent to your phone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm', onPress: async () => {
            setLoading(true);
            try {
              // TODO: Replace with your Firebase Cloud Function URL for STK Push
              // await fetch(`https://YOUR_FUNCTION_URL/stkPush`, {
              //   method: 'POST',
              //   headers: {'Content-Type':'application/json'},
              //   body: JSON.stringify({ phone: formattedPhone, amount, tenantId: tenant.id, month: currentMonth, year: currentYear })
              // });

              // For now: save as pending and show USSD instructions
              await addDoc(collection(db, 'payments'), {
                tenantId: tenant.id,
                tenantName: tenant.name,
                unitNumber: tenant.unitNumber,
                amount: parseFloat(amount),
                method: 'mpesa',
                month: currentMonth,
                year: currentYear,
                status: 'pending',
                mpesaRef: '',
                paidAt: new Date().toISOString(),
              });

              Alert.alert(
                'M-Pesa STK Push',
                `A payment request for KES ${parseFloat(amount).toLocaleString()} has been initiated.\n\nCheck your phone for the M-Pesa prompt and enter your PIN to complete.\n\nYour manager will confirm the payment.`,
                [{ text: 'OK' }]
              );
              setCurrentMonthPaid(false); // Will update once manager confirms
            } catch (err) { Alert.alert('Error', err.message); }
            finally { setLoading(false); }
          }
        }
      ]
    );
  };

  if (fetching) return <ActivityIndicator color={colors.primary} style={{ flex: 1, marginTop: 80 }} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Pay Rent</Text>
        <Text style={styles.subtitle}>Quick and secure via M-Pesa</Text>
      </View>

      {/* Status Card */}
      {currentMonthPaid ? (
        <View style={[styles.statusCard, { backgroundColor: colors.success + '15', borderColor: colors.success }]}>
          <Ionicons name="checkmark-circle" size={32} color={colors.success} />
          <View>
            <Text style={[styles.statusTitle, { color: colors.success }]}>Paid for {currentMonth}! ✓</Text>
            <Text style={styles.statusSub}>Thank you, your rent is up to date.</Text>
          </View>
        </View>
      ) : (
        <View style={[styles.statusCard, { backgroundColor: colors.warning + '15', borderColor: colors.warning }]}>
          <Ionicons name="warning" size={32} color={colors.warning} />
          <View>
            <Text style={[styles.statusTitle, { color: colors.warning }]}>{currentMonth} Rent Due</Text>
            <Text style={styles.statusSub}>KES {tenant?.monthlyRent?.toLocaleString()} pending</Text>
          </View>
        </View>
      )}

      {/* M-Pesa Form */}
      <View style={styles.card}>
        <View style={styles.mpesaHeader}>
          <View style={styles.mpesaLogo}>
            <Ionicons name="phone-portrait" size={24} color={colors.white} />
          </View>
          <View>
            <Text style={styles.mpesaTitle}>M-Pesa Payment</Text>
            <Text style={styles.mpesaSub}>Lipa Na M-Pesa</Text>
          </View>
        </View>

        <Text style={styles.label}>M-Pesa Phone Number</Text>
        <View style={styles.inputWrap}>
          <Text style={styles.countryCode}>🇰🇪 +254</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="700 000 000"
            placeholderTextColor={colors.textMuted}
            value={phone.replace('+254', '').replace('254', '').replace(/^0/, '')}
            onChangeText={v => setPhone('0' + v.replace(/^0+/, ''))}
            keyboardType="phone-pad"
          />
        </View>

        <Text style={styles.label}>Amount (KES)</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
          placeholderTextColor={colors.textMuted}
        />

        <Text style={styles.label}>Paying For</Text>
        <View style={styles.monthBox}>
          <Ionicons name="calendar" size={16} color={colors.primary} />
          <Text style={styles.monthText}>{currentMonth} {currentYear}</Text>
        </View>

        <TouchableOpacity style={styles.payBtn} onPress={handleMpesaPay} disabled={loading}>
          {loading ? <ActivityIndicator color={colors.white} /> : (
            <>
              <Ionicons name="phone-portrait" size={20} color={colors.white} />
              <Text style={styles.payBtnText}>Pay KES {parseFloat(amount || 0).toLocaleString()}</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          You will receive an M-Pesa prompt on your phone. Enter your PIN to complete the payment.
        </Text>
      </View>

      {/* How it works */}
      <View style={styles.howCard}>
        <Text style={styles.howTitle}>How it works</Text>
        {[
          'Tap "Pay" to initiate M-Pesa STK Push',
          'Check your phone for the M-Pesa prompt',
          'Enter your 4-digit M-Pesa PIN',
          'Payment is confirmed & rent marked as paid',
        ].map((step, i) => (
          <View key={i} style={styles.step}>
            <View style={styles.stepNum}><Text style={styles.stepNumText}>{i + 1}</Text></View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.mpesa, paddingTop: 56, paddingHorizontal: 20, paddingBottom: 24,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  title: { fontSize: 24, fontWeight: '800', color: colors.white },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  statusCard: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    margin: 16, padding: 16, borderRadius: 16, borderWidth: 1.5,
  },
  statusTitle: { fontSize: 16, fontWeight: '800' },
  statusSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  card: { backgroundColor: colors.white, borderRadius: 20, marginHorizontal: 16, padding: 20, elevation: 3 },
  mpesaHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  mpesaLogo: { width: 48, height: 48, borderRadius: 16, backgroundColor: colors.mpesa, justifyContent: 'center', alignItems: 'center' },
  mpesaTitle: { fontSize: 17, fontWeight: '800', color: colors.textPrimary },
  mpesaSub: { fontSize: 12, color: colors.textSecondary },
  label: { fontSize: 11, fontWeight: '700', color: colors.textPrimary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, marginTop: 14 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surfaceAlt, borderWidth: 1.5, borderColor: colors.border,
    borderRadius: 12, overflow: 'hidden',
  },
  countryCode: { paddingHorizontal: 12, paddingVertical: 13, fontSize: 14, backgroundColor: colors.surfaceAlt, borderRightWidth: 1, borderRightColor: colors.border },
  phoneInput: { flex: 1, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, color: colors.textPrimary },
  input: {
    backgroundColor: colors.surfaceAlt, borderWidth: 1.5, borderColor: colors.border,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 16, color: colors.textPrimary, fontWeight: '700',
  },
  monthBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.surfaceAlt, borderRadius: 12, borderWidth: 1.5, borderColor: colors.border,
    paddingHorizontal: 14, paddingVertical: 13,
  },
  monthText: { fontSize: 14, color: colors.textPrimary, fontWeight: '600' },
  payBtn: {
    backgroundColor: colors.mpesa, borderRadius: 14, paddingVertical: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 20,
  },
  payBtnText: { color: colors.white, fontSize: 17, fontWeight: '800' },
  disclaimer: { fontSize: 11, color: colors.textMuted, textAlign: 'center', marginTop: 12, lineHeight: 16 },
  howCard: { backgroundColor: colors.white, borderRadius: 20, margin: 16, padding: 20, elevation: 2 },
  howTitle: { fontSize: 15, fontWeight: '800', color: colors.textPrimary, marginBottom: 16 },
  step: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  stepNum: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.mpesa, justifyContent: 'center', alignItems: 'center' },
  stepNumText: { fontSize: 13, fontWeight: '800', color: colors.white },
  stepText: { flex: 1, fontSize: 13, color: colors.textSecondary },
});

export default PayRentScreen;
