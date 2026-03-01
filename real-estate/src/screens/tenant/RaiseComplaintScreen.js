import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView,
  TouchableOpacity, Alert, ActivityIndicator, Linking, FlatList,
} from 'react-native';
import { collection, query, where, addDoc, onSnapshot, orderBy, getDocs } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES = ['Plumbing', 'Electrical', 'Water', 'Security', 'Neighbour Issue', 'Cleaning', 'Other'];

const RaiseComplaintScreen = () => {
  const [tenant, setTenant] = useState(null);
  const [category, setCategory] = useState('Plumbing');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [myComplaints, setMyComplaints] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [managerPhone, setManagerPhone] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    getDocs(query(collection(db, 'tenants'), where('email', '==', user.email))).then(snap => {
      if (!snap.empty) {
        const t = { id: snap.docs[0].id, ...snap.docs[0].data() };
        setTenant(t);
        // Fetch manager WhatsApp if property exists
        if (t.propertyId) {
          import('firebase/firestore').then(({ doc, getDoc }) => {
            getDoc(doc(db, 'properties', t.propertyId)).then(async (pSnap) => {
              if (pSnap.exists()) {
                const managerId = pSnap.data().managerId;
                if (managerId) {
                  const mSnap = await getDoc(doc(db, 'users', managerId));
                  if (mSnap.exists()) setManagerPhone(mSnap.data().whatsappNumber || mSnap.data().phone || '');
                }
              }
            });
          });
        }
        // Listen to tenant complaints
        const q = query(collection(db, 'complaints'), where('tenantId', '==', t.id), orderBy('createdAt', 'desc'));
        const unsub = onSnapshot(q, s => {
          setMyComplaints(s.docs.map(d => ({ id: d.id, ...d.data() })));
          setFetching(false);
        });
        return unsub;
      } else { setFetching(false); }
    });
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'complaints'), {
        tenantId: tenant.id,
        tenantName: tenant.name,
        tenantPhone: tenant.phone,
        tenantWhatsapp: tenant.whatsappNumber,
        unitNumber: tenant.unitNumber,
        propertyId: tenant.propertyId || '',
        category,
        title: title.trim(),
        description: description.trim(),
        status: 'open',
        createdAt: new Date().toISOString(),
        lastReminderSent: new Date().toISOString(),
      });

      // Open WhatsApp to notify manager
      if (managerPhone) {
        const phone = managerPhone.replace('+', '');
        const msg = `🔔 New Complaint from ${tenant.name} (Unit ${tenant.unitNumber})\n\nCategory: ${category}\nIssue: ${title}\n\n${description}`;
        Alert.alert(
          'Complaint Submitted!',
          'Would you like to also send this directly to your manager on WhatsApp?',
          [
            { text: 'No', style: 'cancel' },
            { text: 'Yes, WhatsApp', onPress: () => Linking.openURL(`whatsapp://send?phone=${phone}&text=${encodeURIComponent(msg)}`) },
          ]
        );
      } else {
        Alert.alert('Submitted!', 'Your complaint has been sent to the management team.');
      }

      setTitle('');
      setDescription('');
      setCategory('Plumbing');
    } catch (err) { Alert.alert('Error', err.message); }
    finally { setLoading(false); }
  };

  const statusColor = { open: colors.danger, 'in-progress': colors.warning, resolved: colors.success };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Raise Complaint</Text>
        <Text style={styles.subtitle}>Report an issue to management</Text>
      </View>

      {/* Form */}
      <View style={styles.card}>
        <Text style={styles.label}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {CATEGORIES.map(c => (
            <TouchableOpacity
              key={c}
              style={[styles.catChip, category === c && styles.catChipActive]}
              onPress={() => setCategory(c)}
            >
              <Text style={[styles.catText, category === c && styles.catTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Issue Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Kitchen tap is leaking"
          placeholderTextColor={colors.textMuted}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe the issue in detail — location, severity, how long..."
          placeholderTextColor={colors.textMuted}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={15} color={colors.info} />
          <Text style={styles.infoText}>
            Your complaint will be sent to management and a WhatsApp message will be sent to confirm receipt.
          </Text>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color={colors.white} /> : (
            <>
              <Ionicons name="send" size={18} color={colors.white} />
              <Text style={styles.submitText}>Submit Complaint</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* My Complaints History */}
      {!fetching && myComplaints.length > 0 && (
        <>
          <Text style={styles.histTitle}>My Complaints</Text>
          {myComplaints.map(c => (
            <View key={c.id} style={[styles.histCard, { borderLeftColor: statusColor[c.status], borderLeftWidth: 4 }]}>
              <View style={styles.histTop}>
                <Text style={styles.histCat}>{c.category}</Text>
                <View style={[styles.statusBadge, { backgroundColor: (statusColor[c.status] || colors.primary) + '20' }]}>
                  <Text style={[styles.statusText, { color: statusColor[c.status] || colors.primary }]}>{c.status?.toUpperCase()}</Text>
                </View>
              </View>
              <Text style={styles.histTitle2}>{c.title}</Text>
              <Text style={styles.histDesc} numberOfLines={2}>{c.description}</Text>
              <Text style={styles.histDate}>{c.createdAt?.slice(0, 10)}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary, paddingTop: 56, paddingHorizontal: 20, paddingBottom: 24,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  title: { fontSize: 24, fontWeight: '800', color: colors.white },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  card: { backgroundColor: colors.white, borderRadius: 20, margin: 16, padding: 20, elevation: 3 },
  label: { fontSize: 11, fontWeight: '700', color: colors.textPrimary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
  catChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 8,
    borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surfaceAlt,
  },
  catChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  catText: { fontSize: 13, color: colors.textSecondary },
  catTextActive: { color: colors.white, fontWeight: '700' },
  input: {
    backgroundColor: colors.surfaceAlt, borderWidth: 1.5, borderColor: colors.border,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 14, color: colors.textPrimary, marginBottom: 16,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  infoBox: {
    flexDirection: 'row', gap: 8, alignItems: 'flex-start',
    backgroundColor: '#EBF5FB', borderRadius: 10, padding: 12, marginBottom: 16,
  },
  infoText: { flex: 1, fontSize: 12, color: colors.info, lineHeight: 17 },
  submitBtn: {
    backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 15,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  submitText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  histTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary, marginHorizontal: 16, marginBottom: 10, marginTop: 4 },
  histCard: {
    backgroundColor: colors.white, borderRadius: 16, padding: 16,
    marginHorizontal: 16, marginBottom: 10, elevation: 2,
  },
  histTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  histCat: { fontSize: 11, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 10, fontWeight: '700' },
  histTitle2: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  histDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  histDate: { fontSize: 11, color: colors.textMuted, marginTop: 6 },
});

export default RaiseComplaintScreen;
