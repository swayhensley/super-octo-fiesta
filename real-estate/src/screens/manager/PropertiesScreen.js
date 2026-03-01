import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  TextInput, ActivityIndicator, RefreshControl,
} from 'react-native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../../firebase';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const PropertiesScreen = ({ navigation }) => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setProperties(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
      setRefreshing(false);
    });
    return unsub;
  }, []);

  const filtered = properties.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.address?.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PropertyDetail', { property: item })}
      activeOpacity={0.85}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardIcon}>
          <Ionicons name="business" size={24} color={colors.primary} />
        </View>
        <View style={styles.cardBadge}>
          <Text style={styles.cardBadgeText}>{item.type || 'Residential'}</Text>
        </View>
      </View>
      <Text style={styles.propName}>{item.name}</Text>
      <View style={styles.addressRow}>
        <Ionicons name="location-outline" size={13} color={colors.textSecondary} />
        <Text style={styles.addressText}>{item.address}</Text>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.footerStat}>
          <Ionicons name="home-outline" size={14} color={colors.primary} />
          <Text style={styles.footerText}>{item.totalUnits || 0} Units</Text>
        </View>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('AddEditProperty', { property: item })}
        >
          <Ionicons name="create-outline" size={16} color={colors.primary} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Properties</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddEditProperty', {})}
        >
          <Ionicons name="add" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={16} color={colors.textSecondary} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search properties..."
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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} colors={[colors.primary]} />}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="business-outline" size={60} color={colors.border} />
              <Text style={styles.emptyText}>No properties yet</Text>
              <Text style={styles.emptySubtext}>Tap + to add your first property</Text>
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
  addBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: colors.accent, justifyContent: 'center', alignItems: 'center',
  },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    margin: 16, paddingHorizontal: 14, paddingVertical: 10,
    backgroundColor: colors.white, borderRadius: 12,
    borderWidth: 1, borderColor: colors.border,
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.textPrimary },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  card: {
    backgroundColor: colors.white, borderRadius: 16, padding: 16,
    marginBottom: 12, elevation: 3,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cardIcon: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: colors.primary + '12', justifyContent: 'center', alignItems: 'center',
  },
  cardBadge: { backgroundColor: colors.accent + '20', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  cardBadgeText: { fontSize: 11, color: colors.accent, fontWeight: '700' },
  propName: { fontSize: 17, fontWeight: '800', color: colors.textPrimary },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  addressText: { fontSize: 12, color: colors.textSecondary, flex: 1 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 },
  footerStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footerText: { fontSize: 13, color: colors.primary, fontWeight: '600' },
  editBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.primary + '10', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
  },
  editText: { fontSize: 13, color: colors.primary, fontWeight: '600' },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyText: { fontSize: 16, fontWeight: '700', color: colors.textSecondary, marginTop: 12 },
  emptySubtext: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
});

export default PropertiesScreen;
