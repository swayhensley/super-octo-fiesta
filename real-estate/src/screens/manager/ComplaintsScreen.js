import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  ActivityIndicator, Linking, Alert,
} from 'react-native';
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const STATUS_COLORS = { open: colors.danger, 'in-progress': colors.warning, resolved: colors.success };
const STATUS_ICONS = { open: 'alert-circle', 'in-progress': 'time', resolved: 'checkmark-circle' };

const ComplaintsScreen = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('open');

  useEffect(() => {
    const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => {
      setComplaints(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
  }, []);

  const filtered = complaints.filter(c => filter === 'all' ? true : c.status === filter);

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'complaints', id), { status, resolvedAt: status === 'resolved' ? new Date().toISOString() : null });
    } catch (err) { Alert.alert('Error', err.message); }
  };

  const openWhatsApp = (phone, name, title) => {
    const num = phone?.replace('+', '');
    const msg = `Hi ${name}, your complaint "${title}" is currently being attended to.`;
    Linking.openURL(`whatsapp://send?phone=${num}&text=${encodeURIComponent(msg)}`);
  };

  const renderItem = ({ item }) => {
    const sc = STATUS_COLORS[item.status] || colors.primary;
    return (
      <View style={[styles.card, { borderLeftColor: sc, borderLeftWidth: 4 }]}>
        <View style={styles.cardTop}>
          <View style={[styles.statusBadge, { backgroundColor: sc + '20' }]}>
            <Ionicons name={STATUS_ICONS[item.status]} size={12} color={sc} />
            <Text style={[styles.statusText, { color: sc }]}>{item.status?.toUpperCase()}</Text>
          </View>
          <Text style={styles.date}>{item.createdAt?.slice(0, 10)}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.tenant}>{item.tenantName} • Unit {item.unitNumber}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>

        <View style={styles.actions}>
          {item.status !== 'resolved' && (
            <>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: colors.warning + '20' }]}
                onPress={() => updateStatus(item.id, 'in-progress')}
              >
                <Text style={[styles.actionText, { color: colors.warning }]}>In Progress</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: colors.success + '20' }]}
                onPress={() => updateStatus(item.id, 'resolved')}
              >
                <Text style={[styles.actionText, { color: colors.success }]}>Resolve</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#25D366' + '20' }]}
                onPress={() => openWhatsApp(item.tenantWhatsapp || item.tenantPhone, item.tenantName, item.title)}
              >
                <Ionicons name="logo-whatsapp" size={14} color="#25D366" />
                <Text style={[styles.actionText, { color: '#25D366' }]}>Reply</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Complaints</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{complaints.filter(c => c.status === 'open').length} Open</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        {['open', 'in-progress', 'resolved', 'all'].map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && { backgroundColor: STATUS_COLORS[f] || colors.primary }]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && { color: colors.white }]}>
              {f === 'all' ? 'ALL' : f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} /> : (
        <FlatList
          data={filtered}
          keyExtractor={i => i.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="checkmark-circle-outline" size={60} color={colors.success} />
              <Text style={styles.emptyText}>No {filter} complaints!</Text>
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
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  heading: { fontSize: 24, fontWeight: '800', color: colors.white },
  countBadge: { backgroundColor: colors.danger, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  countText: { fontSize: 12, fontWeight: '700', color: colors.white },
  filterRow: { flexDirection: 'row', margin: 16, gap: 6 },
  filterTab: {
    flex: 1, paddingVertical: 7, alignItems: 'center', borderRadius: 10,
    backgroundColor: colors.white, elevation: 1,
  },
  filterText: { fontSize: 10, fontWeight: '700', color: colors.textSecondary },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  card: {
    backgroundColor: colors.white, borderRadius: 16, padding: 16, marginBottom: 12, elevation: 2,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 10, fontWeight: '700' },
  date: { fontSize: 11, color: colors.textMuted },
  title: { fontSize: 15, fontWeight: '800', color: colors.textPrimary },
  tenant: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  desc: { fontSize: 13, color: colors.textSecondary, marginTop: 6, lineHeight: 18 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 12 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 8, borderRadius: 10 },
  actionText: { fontSize: 11, fontWeight: '700' },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyText: { fontSize: 16, fontWeight: '700', color: colors.textSecondary, marginTop: 12 },
});

export default ComplaintsScreen;
