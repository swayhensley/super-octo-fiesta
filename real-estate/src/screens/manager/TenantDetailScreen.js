import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, Modal, TextInput, ActivityIndicator,
} from 'react-native';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Linking } from 'react-native';
import { db } from '../../../firebase';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const PAYMENT_METHODS = ['mpesa', 'bank', 'cash'];

const TenantDetailScreen = ({ navigation, route }) => {
  const { tenant } = route.params;
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [payForm, setPayForm] = useState({ amount: tenant.monthlyRent?.toString() || '', method: 'mpesa', ref: '', bankName: '', month: '', year: new Date().getFullYear().toString() });

  useEffect(() => {
    const q = query(collection(db, 'payments'), where('tenantId', '==', tenant.id));
    return onSnapshot(q, snap => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      list.sort((a, b) => (b.paidAt || '').localeCompare(a.paidAt || ''));
      setPayments(list);
      setLoading(false);
    });
  }, []);

  const handleWhatsApp = () => {
    const phone = tenant.whatsappNumber?.replace('+', '') || tenant.phone?.replace('+', '');
    const msg = `Hello ${tenant.name}, this is regarding your tenancy at unit ${tenant.unitNumber}.`;
    Linking.openURL(`whatsapp://send?phone=${phone}&text=${encodeURIComponent(msg)}`);
  };

  const handleCall = () => Linking.openURL(`tel:${tenant.phone}`);

  const handleRecordPayment = async () => {
    if (!payForm.amount || !payForm.month) { Alert.alert('Error', 'Amount and month are required'); return; }
    try {
      await addDoc(collection(db, 'payments'), {
        tenantId: tenant.id,
        tenantName: tenant.name,
        unitId: tenant.unitId || '',
        unitNumber: tenant.unitNumber,
        amount: parseFloat(payForm.amount),
        method: payForm.method,
        mpesaRef: payForm.method === 'mpesa' ? payForm.ref : '',
        bankRef: payForm.method === 'bank' ? payForm.ref : '',
        bankName: payForm.method === 'bank' ? payForm.bankName : '',
        month: payForm.month,
        year: payForm.year,
        status: 'paid',
        paidAt: new Date().toISOString(),
      });
      setModal(false);
      Alert.alert('Success', 'Payment recorded!');
    } catch (err) { Alert.alert('Error', err.message); }
  };

  const methodColor = { mpesa: colors.mpesa, bank: colors.info, cash: colors.warning };
  const methodIcon = { mpesa: 'phone-portrait', bank: 'business', cash: 'cash' };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.avatar}><Text style={styles.avatarText}>{tenant.name?.[0]?.toUpperCase()}</Text></View>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('AddEditTenant', { tenant })}
        >
          <Ionicons name="create" size={18} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.tenantName}>{tenant.name}</Text>
        <Text style={styles.tenantUnit}>Unit {tenant.unitNumber} {tenant.propertyName ? `• ${tenant.propertyName}` : ''}</Text>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.success }]} onPress={handleCall}>
            <Ionicons name="call" size={18} color={colors.white} />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#25D366' }]} onPress={handleWhatsApp}>
            <Ionicons name="logo-whatsapp" size={18} color={colors.white} />
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.mpesa }]} onPress={() => setModal(true)}>
            <Ionicons name="cash" size={18} color={colors.white} />
            <Text style={styles.actionText}>Record Payment</Text>
          </TouchableOpacity>
        </View>

        {/* Details */}
        <View style={styles.infoCard}>
          {[
            { label: 'Email', value: tenant.email, icon: 'mail' },
            { label: 'Phone', value: tenant.phone, icon: 'call' },
            { label: 'National ID', value: tenant.nationalId, icon: 'card' },
            { label: 'Monthly Rent', value: `KES ${tenant.monthlyRent?.toLocaleString()}`, icon: 'cash' },
            { label: 'Lease Start', value: tenant.leaseStart, icon: 'calendar' },
            { label: 'Lease End', value: tenant.leaseEnd || 'Open', icon: 'calendar-clear' },
          ].map(({ label, value, icon }) => value ? (
            <View key={label} style={styles.infoRow}>
              <Ionicons name={icon} size={15} color={colors.primary} style={{ marginRight: 10 }} />
              <Text style={styles.infoLabel}>{label}</Text>
              <Text style={styles.infoValue}>{value}</Text>
            </View>
          ) : null)}
        </View>

        {/* Payment History */}
        <Text style={styles.sectionTitle}>Payment History</Text>
        {loading ? <ActivityIndicator color={colors.primary} /> : payments.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="receipt-outline" size={40} color={colors.border} />
            <Text style={styles.emptyText}>No payments recorded</Text>
          </View>
        ) : payments.map(p => (
          <View key={p.id} style={styles.payRow}>
            <View style={[styles.payIcon, { backgroundColor: (methodColor[p.method] || colors.primary) + '20' }]}>
              <Ionicons name={methodIcon[p.method] || 'cash'} size={18} color={methodColor[p.method] || colors.primary} />
            </View>
            <View style={styles.payInfo}>
              <Text style={styles.payMonth}>{p.month} {p.year}</Text>
              <Text style={styles.payRef}>{p.method?.toUpperCase()} {p.mpesaRef || p.bankRef || ''}</Text>
              {p.bankName ? <Text style={styles.payRef}>{p.bankName}</Text> : null}
            </View>
            <View style={styles.payRight}>
              <Text style={styles.payAmt}>KES {p.amount?.toLocaleString()}</Text>
              <View style={[styles.payBadge, { backgroundColor: colors.success + '20' }]}>
                <Text style={[styles.payBadgeText, { color: colors.success }]}>Paid</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Record Payment Modal */}
      <Modal visible={modal} animationType="slide" transparent onRequestClose={() => setModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Record Payment</Text>
            <Text style={styles.modalTenant}>{tenant.name} • Unit {tenant.unitNumber}</Text>

            <Text style={styles.mLabel}>Payment Method</Text>
            <View style={styles.methodRow}>
              {PAYMENT_METHODS.map(m => (
                <TouchableOpacity
                  key={m}
                  style={[styles.methodBtn, payForm.method === m && { backgroundColor: methodColor[m], borderColor: methodColor[m] }]}
                  onPress={() => setPayForm(f => ({ ...f, method: m }))}
                >
                  <Ionicons name={methodIcon[m]} size={16} color={payForm.method === m ? colors.white : colors.textSecondary} />
                  <Text style={[styles.methodText, payForm.method === m && { color: colors.white }]}>{m.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {[
              { label: 'Amount (KES)', field: 'amount', keyboard: 'numeric' },
              { label: 'Month (e.g. January)', field: 'month' },
              { label: 'Year', field: 'year', keyboard: 'numeric' },
              payForm.method === 'mpesa' ? { label: 'M-Pesa Reference', field: 'ref' } : null,
              payForm.method === 'bank' ? { label: 'Bank Reference No.', field: 'ref' } : null,
              payForm.method === 'bank' ? { label: 'Bank Name (e.g. Equity)', field: 'bankName' } : null,
            ].filter(Boolean).map(({ label, field, keyboard }) => (
              <View key={field} style={{ marginBottom: 10 }}>
                <Text style={styles.mLabel}>{label}</Text>
                <TextInput
                  style={styles.mInput}
                  placeholder={label}
                  placeholderTextColor={colors.textMuted}
                  value={payForm[field]}
                  onChangeText={v => setPayForm(f => ({ ...f, [field]: v }))}
                  keyboardType={keyboard || 'default'}
                />
              </View>
            ))}

            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleRecordPayment}>
                <Text style={styles.confirmText}>Save Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary, paddingTop: 56, paddingHorizontal: 20, paddingBottom: 24,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderBottomLeftRadius: 28, borderBottomRightRadius: 28,
  },
  backBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.accent, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 26, fontWeight: '800', color: colors.white },
  editBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  scroll: { padding: 20, paddingBottom: 40 },
  tenantName: { fontSize: 22, fontWeight: '800', color: colors.textPrimary, textAlign: 'center' },
  tenantUnit: { fontSize: 13, color: colors.textSecondary, textAlign: 'center', marginTop: 4, marginBottom: 20 },
  actionRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 12, paddingVertical: 12 },
  actionText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  infoCard: { backgroundColor: colors.white, borderRadius: 16, padding: 16, marginBottom: 24, elevation: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  infoLabel: { fontSize: 12, color: colors.textSecondary, flex: 1 },
  infoValue: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary, marginBottom: 12 },
  empty: { alignItems: 'center', padding: 24 },
  emptyText: { fontSize: 13, color: colors.textMuted, marginTop: 8 },
  payRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 14, padding: 14, marginBottom: 10, elevation: 2 },
  payIcon: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  payInfo: { flex: 1 },
  payMonth: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  payRef: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  payRight: { alignItems: 'flex-end' },
  payAmt: { fontSize: 15, fontWeight: '800', color: colors.textPrimary },
  payBadge: { marginTop: 4, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  payBadgeText: { fontSize: 10, fontWeight: '700' },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: colors.white, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 40 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: colors.textPrimary },
  modalTenant: { fontSize: 13, color: colors.textSecondary, marginBottom: 20 },
  mLabel: { fontSize: 11, fontWeight: '700', color: colors.textPrimary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  methodRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  methodBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4,
    borderWidth: 1.5, borderColor: colors.border, borderRadius: 10, paddingVertical: 10,
  },
  methodText: { fontSize: 12, color: colors.textSecondary, fontWeight: '700' },
  mInput: {
    backgroundColor: colors.surfaceAlt, borderWidth: 1.5, borderColor: colors.border,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 11, fontSize: 14, color: colors.textPrimary,
  },
  modalBtns: { flexDirection: 'row', gap: 12, marginTop: 16 },
  cancelBtn: { flex: 1, borderWidth: 1.5, borderColor: colors.border, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  cancelText: { fontSize: 14, fontWeight: '700', color: colors.textSecondary },
  confirmBtn: { flex: 2, backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  confirmText: { fontSize: 14, fontWeight: '700', color: colors.white },
});

export default TenantDetailScreen;
