import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const MyLeaseScreen = () => {
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    getDocs(query(collection(db, 'tenants'), where('email', '==', user.email))).then(snap => {
      if (!snap.empty) setTenant({ id: snap.docs[0].id, ...snap.docs[0].data() });
      setLoading(false);
    });
  }, []);

  const daysUntilExpiry = () => {
    if (!tenant?.leaseEnd) return null;
    const diff = new Date(tenant.leaseEnd) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const days = daysUntilExpiry();

  if (loading) return <ActivityIndicator color={colors.primary} style={{ flex: 1, marginTop: 80 }} />;
  if (!tenant) return (
    <View style={styles.center}>
      <Ionicons name="document-text-outline" size={60} color={colors.border} />
      <Text style={styles.noDataText}>No lease info found.</Text>
      <Text style={styles.noDataSub}>Contact your manager to set up your account.</Text>
    </View>
  );

  const rows = [
    { label: 'Full Name', value: tenant.name, icon: 'person' },
    { label: 'Unit Number', value: `Unit ${tenant.unitNumber}`, icon: 'home' },
    { label: 'Property', value: tenant.propertyName, icon: 'business' },
    { label: 'Phone', value: tenant.phone, icon: 'call' },
    { label: 'Email', value: tenant.email, icon: 'mail' },
    { label: 'National ID', value: tenant.nationalId, icon: 'card' },
    { label: 'Monthly Rent', value: `KES ${tenant.monthlyRent?.toLocaleString()}`, icon: 'cash' },
    { label: 'Lease Start', value: tenant.leaseStart, icon: 'calendar' },
    { label: 'Lease End', value: tenant.leaseEnd || 'Open Lease', icon: 'calendar-clear' },
    { label: 'Rent Due', value: '5th of every month', icon: 'alarm' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Lease</Text>
        <Text style={styles.subtitle}>Your rental agreement details</Text>
      </View>

      {/* Status Banner */}
      {days !== null && (
        <View style={[styles.banner, { backgroundColor: days < 30 ? colors.danger + '15' : colors.success + '15', borderColor: days < 30 ? colors.danger : colors.success }]}>
          <Ionicons name="time" size={18} color={days < 30 ? colors.danger : colors.success} />
          <Text style={[styles.bannerText, { color: days < 30 ? colors.danger : colors.success }]}>
            {days > 0 ? `Lease expires in ${days} days` : 'Lease has expired — contact manager'}
          </Text>
        </View>
      )}

      {/* Rent Due Card */}
      <View style={styles.rentCard}>
        <View style={styles.rentTop}>
          <Text style={styles.rentLabel}>Monthly Rent</Text>
          <View style={[styles.dueBadge, { backgroundColor: colors.warning + '20' }]}>
            <Text style={[styles.dueText, { color: colors.warning }]}>Due 5th</Text>
          </View>
        </View>
        <Text style={styles.rentAmount}>KES {tenant.monthlyRent?.toLocaleString()}</Text>
        <Text style={styles.rentNote}>Auto-reminder sent 3 days before due date</Text>
      </View>

      {/* Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Lease Details</Text>
        {rows.map(({ label, value, icon }) => value ? (
          <View key={label} style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name={icon} size={15} color={colors.primary} />
            </View>
            <Text style={styles.rowLabel}>{label}</Text>
            <Text style={styles.rowValue}>{value}</Text>
          </View>
        ) : null)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  noDataText: { fontSize: 17, fontWeight: '700', color: colors.textPrimary, marginTop: 16 },
  noDataSub: { fontSize: 13, color: colors.textSecondary, textAlign: 'center', marginTop: 8 },
  header: {
    backgroundColor: colors.primary, paddingTop: 56, paddingHorizontal: 20, paddingBottom: 24,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  title: { fontSize: 24, fontWeight: '800', color: colors.white },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  banner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    margin: 16, padding: 14, borderRadius: 12, borderWidth: 1,
  },
  bannerText: { fontSize: 13, fontWeight: '600', flex: 1 },
  rentCard: {
    backgroundColor: colors.primary, marginHorizontal: 16, marginBottom: 16, borderRadius: 18, padding: 20,
  },
  rentTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  rentLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: '600' },
  dueBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  dueText: { fontSize: 11, fontWeight: '700' },
  rentAmount: { fontSize: 34, fontWeight: '800', color: colors.white },
  rentNote: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 6 },
  card: { backgroundColor: colors.white, borderRadius: 18, marginHorizontal: 16, marginBottom: 24, padding: 20, elevation: 2 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: colors.textPrimary, marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  rowIcon: { width: 28, height: 28, borderRadius: 8, backgroundColor: colors.primary + '12', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  rowLabel: { fontSize: 12, color: colors.textSecondary, flex: 1 },
  rowValue: { fontSize: 13, fontWeight: '600', color: colors.textPrimary, maxWidth: '55%', textAlign: 'right' },
});

export default MyLeaseScreen;
