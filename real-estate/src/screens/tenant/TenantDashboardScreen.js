import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const TenantDashboardScreen = () => {
  const { user, userProfile } = useAuth();
  const [tenant, setTenant] = useState(null);
  const [pendingPayment, setPendingPayment] = useState(null);
  const [openComplaints, setOpenComplaints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    // Find tenant profile linked to this user
    getDocs(query(collection(db, 'tenants'), where('email', '==', user.email))).then(snap => {
      if (!snap.empty) {
        const t = { id: snap.docs[0].id, ...snap.docs[0].data() };
        setTenant(t);
        // Check payment
        const month = new Date().toLocaleString('default', { month: 'long' });
        const year = new Date().getFullYear().toString();
        getDocs(query(collection(db, 'payments'), where('tenantId', '==', t.id), where('month', '==', month), where('year', '==', year))).then(ps => {
          setPendingPayment(ps.empty ? { amount: t.monthlyRent, month, year, status: 'pending' } : null);
        });
        getDocs(query(collection(db, 'complaints'), where('tenantId', '==', t.id), where('status', '!=', 'resolved'))).then(cs => {
          setOpenComplaints(cs.size);
        });
      }
      setLoading(false);
    });
  }, [user]);

  const daysUntilDue = () => {
    const now = new Date();
    const due = new Date(now.getFullYear(), now.getMonth() + 1, 5); // Due 5th of each month
    return Math.max(0, Math.ceil((due - now) / (1000 * 60 * 60 * 24)));
  };

  if (loading) return <ActivityIndicator color={colors.primary} style={{ flex: 1, marginTop: 100 }} />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, 👋</Text>
          <Text style={styles.name}>{userProfile?.name || tenant?.name || 'Tenant'}</Text>
          <Text style={styles.unit}>Unit {tenant?.unitNumber} {tenant?.propertyName ? `• ${tenant.propertyName}` : ''}</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => signOut(auth)}>
          <Ionicons name="log-out-outline" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Rent Status Card */}
      {pendingPayment ? (
        <View style={[styles.alertCard, { borderColor: colors.warning }]}>
          <View style={styles.alertCardTop}>
            <Ionicons name="warning" size={20} color={colors.warning} />
            <Text style={styles.alertTitle}>Rent Due</Text>
            <View style={styles.dueBadge}><Text style={styles.dueBadgeText}>{daysUntilDue()} days left</Text></View>
          </View>
          <Text style={styles.rentAmount}>KES {tenant?.monthlyRent?.toLocaleString()}</Text>
          <Text style={styles.rentMonth}>{pendingPayment.month} {pendingPayment.year}</Text>
        </View>
      ) : (
        <View style={[styles.alertCard, { borderColor: colors.success }]}>
          <View style={styles.alertCardTop}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={[styles.alertTitle, { color: colors.success }]}>Rent Paid ✓</Text>
          </View>
          <Text style={styles.rentPaidText}>You're all caught up for this month!</Text>
        </View>
      )}

      {/* Quick Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Ionicons name="chatbubble-ellipses" size={22} color={openComplaints > 0 ? colors.danger : colors.success} />
          <Text style={styles.statNum}>{openComplaints}</Text>
          <Text style={styles.statLbl}>Open Issues</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="cash" size={22} color={colors.mpesa} />
          <Text style={styles.statNum}>KES {tenant?.monthlyRent?.toLocaleString()}</Text>
          <Text style={styles.statLbl}>Monthly Rent</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="calendar" size={22} color={colors.info} />
          <Text style={styles.statNum}>{tenant?.leaseEnd?.slice(0, 7) || 'Open'}</Text>
          <Text style={styles.statLbl}>Lease Ends</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickGrid}>
        {[
          { icon: 'wallet', label: 'Pay Rent', color: colors.mpesa },
          { icon: 'document-text', label: 'My Lease', color: colors.primary },
          { icon: 'receipt', label: 'Invoices', color: colors.info },
          { icon: 'chatbubble-ellipses', label: 'Complaint', color: colors.danger },
        ].map((a, i) => (
          <View key={i} style={styles.quickItem}>
            <View style={[styles.quickIcon, { backgroundColor: a.color + '15' }]}>
              <Ionicons name={a.icon} size={26} color={a.color} />
            </View>
            <Text style={styles.quickLabel}>{a.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary, paddingTop: 60, paddingHorizontal: 20, paddingBottom: 28,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    borderBottomLeftRadius: 28, borderBottomRightRadius: 28,
  },
  greeting: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  name: { fontSize: 22, fontWeight: '800', color: colors.white, marginTop: 2 },
  unit: { fontSize: 12, color: colors.accent, marginTop: 4, fontWeight: '600' },
  logoutBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  alertCard: {
    backgroundColor: colors.white, borderRadius: 18, padding: 20, margin: 16,
    marginTop: -16, elevation: 4, borderWidth: 1.5,
  },
  alertCardTop: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  alertTitle: { fontSize: 15, fontWeight: '800', color: colors.warning, flex: 1 },
  dueBadge: { backgroundColor: colors.warning + '20', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  dueBadgeText: { fontSize: 11, fontWeight: '700', color: colors.warning },
  rentAmount: { fontSize: 32, fontWeight: '800', color: colors.textPrimary },
  rentMonth: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  rentPaidText: { fontSize: 14, color: colors.success },
  statsRow: { flexDirection: 'row', marginHorizontal: 16, backgroundColor: colors.white, borderRadius: 16, padding: 16, elevation: 2, marginBottom: 20 },
  statBox: { flex: 1, alignItems: 'center', gap: 4 },
  statNum: { fontSize: 14, fontWeight: '800', color: colors.textPrimary },
  statLbl: { fontSize: 10, color: colors.textSecondary, textAlign: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary, marginHorizontal: 16, marginBottom: 12 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12, paddingBottom: 40 },
  quickItem: { width: '45%', alignItems: 'center', gap: 8 },
  quickIcon: { width: '100%', height: 80, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  quickLabel: { fontSize: 12, color: colors.textSecondary, fontWeight: '600' },
});

export default TenantDashboardScreen;
