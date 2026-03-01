import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  TextInput, ActivityIndicator,
} from 'react-native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../../firebase';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const TenantsScreen = ({ navigation, route }) => {
  const [tenants, setTenants] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'tenants'), orderBy('name'));
    return onSnapshot(q, snap => {
      setTenants(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
  }, []);

  const filtered = tenants.filter(t =>
    t.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.phone?.includes(search) ||
    t.unitNumber?.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('TenantDetail', { tenant: item })}
      activeOpacity={0.85}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name?.[0]?.toUpperCase()}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.sub}>{item.phone} • Unit {item.unitNumber}</Text>
        <Text style={styles.lease} numberOfLines={1}>{item.propertyName || ''}</Text>
      </View>
      <View>
        <View style={[styles.badge, { backgroundColor: colors.success + '20' }]}>
          <Text style={[styles.badgeText, { color: colors.success }]}>Active</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={colors.border} style={{ marginTop: 8 }} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tenants</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddEditTenant', {})}
        >
          <Ionicons name="person-add" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={16} color={colors.textSecondary} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, phone, unit..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
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
              <Ionicons name="people-outline" size={60} color={colors.border} />
              <Text style={styles.emptyText}>No tenants found</Text>
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
    backgroundColor: colors.primary, paddingTop: 56, paddingHorizontal: 20, paddingBottom: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  title: { fontSize: 24, fontWeight: '800', color: colors.white },
  addBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.accent, justifyContent: 'center', alignItems: 'center' },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', margin: 16, paddingHorizontal: 14, paddingVertical: 10,
    backgroundColor: colors.white, borderRadius: 12, borderWidth: 1, borderColor: colors.border,
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.textPrimary },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius: 16, padding: 14, marginBottom: 10, elevation: 2,
  },
  avatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  avatarText: { fontSize: 20, fontWeight: '800', color: colors.white },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  sub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  lease: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20, alignSelf: 'flex-end' },
  badgeText: { fontSize: 10, fontWeight: '700' },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyText: { fontSize: 16, fontWeight: '700', color: colors.textSecondary, marginTop: 12 },
});

export default TenantsScreen;
