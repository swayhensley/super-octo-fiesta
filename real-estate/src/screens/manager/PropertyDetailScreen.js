import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  FlatList, ActivityIndicator, Image,
} from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const PropertyDetailScreen = ({ navigation, route }) => {
  const { property } = route.params;
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'tenants'), where('propertyId', '==', property.id));
    const unsub = onSnapshot(q, snap => {
      setTenants(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  const occupied = tenants.length;
  const vacant = (property.totalUnits || 0) - occupied;
  const occupancyPct = property.totalUnits ? Math.round((occupied / property.totalUnits) * 100) : 0;

  return (
    <ScrollView style={styles.container}>
      {/* Header Image */}
      <View style={styles.imageWrap}>
        {property.imageUrl ? (
          <Image source={{ uri: property.imageUrl }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Ionicons name="business" size={60} color="rgba(255,255,255,0.5)" />
          </View>
        )}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editFab}
          onPress={() => navigation.navigate('AddEditProperty', { property })}
        >
          <Ionicons name="create" size={18} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.typeChip}>
          <Text style={styles.typeText}>{property.type}</Text>
        </View>
        <Text style={styles.propName}>{property.name}</Text>
        <View style={styles.addressRow}>
          <Ionicons name="location" size={14} color={colors.textSecondary} />
          <Text style={styles.addressText}>{property.address}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{property.totalUnits || 0}</Text>
            <Text style={styles.statLbl}>Total Units</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNum, { color: colors.success }]}>{occupied}</Text>
            <Text style={styles.statLbl}>Occupied</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNum, { color: colors.warning }]}>{vacant}</Text>
            <Text style={styles.statLbl}>Vacant</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNum, { color: colors.info }]}>{occupancyPct}%</Text>
            <Text style={styles.statLbl}>Occupancy</Text>
          </View>
        </View>

        {/* Tenants */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tenants in this Property</Text>
          <TouchableOpacity
            style={styles.addTenantBtn}
            onPress={() => navigation.navigate('Tenants', { screen: 'AddEditTenant', params: { propertyId: property.id } })}
          >
            <Ionicons name="person-add" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : tenants.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={40} color={colors.border} />
            <Text style={styles.emptyText}>No tenants yet</Text>
          </View>
        ) : (
          tenants.map(t => (
            <TouchableOpacity
              key={t.id}
              style={styles.tenantRow}
              onPress={() => navigation.navigate('Tenants', { screen: 'TenantDetail', params: { tenant: t } })}
            >
              <View style={styles.tenantAvatar}>
                <Text style={styles.tenantInitial}>{t.name?.[0]?.toUpperCase()}</Text>
              </View>
              <View style={styles.tenantInfo}>
                <Text style={styles.tenantName}>{t.name}</Text>
                <Text style={styles.tenantUnit}>Unit {t.unitNumber} • {t.phone}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
                <Text style={[styles.statusText, { color: colors.success }]}>Active</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  imageWrap: { height: 240, position: 'relative' },
  image: { width: '100%', height: '100%', backgroundColor: colors.primaryLight },
  imagePlaceholder: { justifyContent: 'center', alignItems: 'center' },
  backBtn: {
    position: 'absolute', top: 50, left: 16,
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center',
  },
  editFab: {
    position: 'absolute', top: 50, right: 16,
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: colors.accent, justifyContent: 'center', alignItems: 'center',
  },
  body: { backgroundColor: colors.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -20, padding: 20 },
  typeChip: { backgroundColor: colors.accent + '20', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, alignSelf: 'flex-start', marginBottom: 8 },
  typeText: { fontSize: 11, color: colors.accent, fontWeight: '700', textTransform: 'uppercase' },
  propName: { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4, marginBottom: 20 },
  addressText: { fontSize: 13, color: colors.textSecondary },
  statsRow: { flexDirection: 'row', backgroundColor: colors.white, borderRadius: 16, padding: 16, marginBottom: 24, elevation: 2 },
  statBox: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
  statLbl: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary },
  addTenantBtn: { width: 32, height: 32, borderRadius: 8, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  empty: { alignItems: 'center', padding: 30 },
  emptyText: { fontSize: 14, color: colors.textMuted, marginTop: 8 },
  tenantRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius: 14, padding: 14, marginBottom: 10, elevation: 2,
  },
  tenantAvatar: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  tenantInitial: { fontSize: 17, fontWeight: '800', color: colors.white },
  tenantInfo: { flex: 1 },
  tenantName: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  tenantUnit: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: '700' },
});

export default PropertyDetailScreen;
