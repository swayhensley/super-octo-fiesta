import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  ActivityIndicator, RefreshControl,
} from 'react-native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../../firebase';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const PaymentsScreen = ({ navigation }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | paid | pending

  const currentMonth = MONTHS[new Date().getMonth()];
  const currentYear = new Date().getFullYear().toString();

  useEffect(() => {
    const q = query(collection(db, 'payments'), orderBy('paidAt', 'desc'));
    return onSnapshot(q, snap => {
      setPayments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
  }, []);

  const filtered = payments.filter(p => {
    if (filter === 'paid') return p.status === 'paid';
    if (filter === 'pending') return p.status === 'pending';
    return true;
  });

  const methodColor = { mpesa: colors.mpesa, bank: colors.info, cash: colors.warning };
  const methodIcon = { mpesa: 'phone-portrait', bank: 'business', cash: 'cash' };

  const totalThisMonth = payments
    .filter(p => p.month === currentMonth && p.year === currentYear && p.status === 'paid')
    .reduce((s, p) => s + (p.amount || 0), 0);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: (methodColor[item.method] || colors.primary) + '20' }]}>
        <Ionicons name={methodIcon[item.method] || 'cash'} size={20} color={methodColor[item.method] || colors.primary} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.tenantName}</Text>
        <Text style={styles.sub}>Unit {item.unitNumber} • {item.month} {item.year}</Text>
        {item.mpesaRef ? <Text style={styles.ref}>Ref: {item.mpesaRef}</Text> : null}
        {item.bankRef ? <Text style={styles.ref}>Bank Ref: {item.bankRef} {item.bankName ? `• ${item.bankName}` : ''}</Text> : null}
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>KES {item.amount?.toLocaleString()}</Text>
        <View style={[styles.badge, { backgroundColor: item.status === 'paid' ? colors.success + '20' : colors.warning + '20' }]}>
          <Text style={[styles.badgeText, { color: item.status === 'paid' ? colors.success : colors.warning }]}>
            {item.status?.toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payments</Text>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>{currentMonth} Collections</Text>
          <Text style={styles.summaryAmount}>KES {totalThisMonth.toLocaleString()}</Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {['all', 'paid', 'pending'].map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={i => i.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="receipt-outline" size={60} color={colors.border} />
              <Text style={styles.emptyText}>No payments found</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary, paddingTop: 56, paddingHorizontal: 20, paddingBottom: 24,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  title: { fontSize: 24, fontWeight: '800', color: colors.white, marginBottom: 16 },
  summaryBox: { backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: 14 },
  summaryLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: '600', marginBottom: 4 },
  summaryAmount: { fontSize: 26, fontWeight: '800', color: colors.accent },
  filterRow: { flexDirection: 'row', margin: 16, backgroundColor: colors.white, borderRadius: 12, padding: 4, elevation: 2 },
  filterTab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 10 },
  filterTabActive: { backgroundColor: colors.primary },
  filterText: { fontSize: 12, fontWeight: '700', color: colors.textSecondary },
  filterTextActive: { color: colors.white },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius: 16, padding: 14, marginBottom: 10, elevation: 2,
  },
  icon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  sub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  ref: { fontSize: 11, color: colors.textMuted, marginTop: 1 },
  right: { alignItems: 'flex-end' },
  amount: { fontSize: 15, fontWeight: '800', color: colors.textPrimary },
  badge: { marginTop: 4, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  badgeText: { fontSize: 10, fontWeight: '700' },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyText: { fontSize: 16, fontWeight: '700', color: colors.textSecondary, marginTop: 12 },
});

export default PaymentsScreen;
