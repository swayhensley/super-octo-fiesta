import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  RefreshControl, ActivityIndicator,
} from 'react-native';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const StatCard = ({ icon, label, value, color, bg }) => (
  <View style={[styles.statCard, { backgroundColor: bg || colors.white }]}>
    <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={22} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const DashboardScreen = () => {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState({ properties: 0, tenants: 0, pendingPayments: 0, openComplaints: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const [propSnap, tenantSnap, paySnap, compSnap] = await Promise.all([
        getDocs(collection(db, 'properties')),
        getDocs(query(collection(db, 'tenants'))),
        getDocs(query(collection(db, 'payments'), where('status', '==', 'pending'))),
        getDocs(query(collection(db, 'complaints'), where('status', '!=', 'resolved'))),
      ]);
      setStats({
        properties: propSnap.size,
        tenants: tenantSnap.size,
        pendingPayments: paySnap.size,
        openComplaints: compSnap.size,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const onRefresh = () => { setRefreshing(true); fetchStats(); };

  const month = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good day, 👋</Text>
          <Text style={styles.name}>{userProfile?.name || 'Manager'}</Text>
          <Text style={styles.month}>{month}</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => signOut(auth)}>
          <Ionicons name="log-out-outline" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <>
          <View style={styles.statsGrid}>
            <StatCard icon="business" label="Properties" value={stats.properties} color={colors.primary} />
            <StatCard icon="people" label="Tenants" value={stats.tenants} color={colors.info} />
            <StatCard icon="alert-circle" label="Pending Rent" value={stats.pendingPayments} color={colors.warning} />
            <StatCard icon="chatbubble-ellipses" label="Open Issues" value={stats.openComplaints} color={colors.danger} />
          </View>

          {/* Alerts */}
          {stats.pendingPayments > 0 && (
            <View style={[styles.alertBox, { backgroundColor: '#FFF3CD', borderLeftColor: colors.warning }]}>
              <Ionicons name="warning" size={16} color={colors.warning} />
              <Text style={styles.alertText}>{stats.pendingPayments} tenant(s) have pending rent this month.</Text>
            </View>
          )}
          {stats.openComplaints > 0 && (
            <View style={[styles.alertBox, { backgroundColor: '#FDECEA', borderLeftColor: colors.danger }]}>
              <Ionicons name="alert-circle" size={16} color={colors.danger} />
              <Text style={styles.alertText}>{stats.openComplaints} unresolved maintenance complaint(s).</Text>
            </View>
          )}

          {/* Quick actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickRow}>
            {[
              { icon: 'add-circle', label: 'Add Property', color: colors.primary },
              { icon: 'person-add', label: 'Add Tenant', color: colors.info },
              { icon: 'cash', label: 'Record Payment', color: colors.mpesa },
              { icon: 'megaphone', label: 'Broadcast', color: colors.accent },
            ].map((a, i) => (
              <View key={i} style={styles.quickItem}>
                <View style={[styles.quickIcon, { backgroundColor: a.color + '15' }]}>
                  <Ionicons name={a.icon} size={24} color={a.color} />
                </View>
                <Text style={styles.quickLabel}>{a.label}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary, padding: 24, paddingTop: 60,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    borderBottomLeftRadius: 28, borderBottomRightRadius: 28,
  },
  greeting: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  name: { fontSize: 22, fontWeight: '800', color: colors.white, marginTop: 2 },
  month: { fontSize: 12, color: colors.accent, marginTop: 4, fontWeight: '600' },
  logoutBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12,
    marginTop: -20,
  },
  statCard: {
    flex: 1, minWidth: '44%', borderRadius: 16, padding: 16,
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8,
  },
  statIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  statValue: { fontSize: 28, fontWeight: '800', color: colors.textPrimary },
  statLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  alertBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginHorizontal: 16, marginBottom: 10, padding: 12,
    borderRadius: 10, borderLeftWidth: 4,
  },
  alertText: { flex: 1, fontSize: 13, color: colors.textPrimary },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary, marginHorizontal: 16, marginTop: 10, marginBottom: 12 },
  quickRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 8, paddingBottom: 24 },
  quickItem: { alignItems: 'center', gap: 8 },
  quickIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  quickLabel: { fontSize: 11, color: colors.textSecondary, fontWeight: '600', textAlign: 'center', maxWidth: 60 },
});

export default DashboardScreen;
