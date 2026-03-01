import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, FlatList, Alert, ActivityIndicator, Linking,
} from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const BroadcastScreen = () => {
  const [message, setMessage] = useState('');
  const [tenants, setTenants] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [broadcasts, setBroadcasts] = useState([]);

  useEffect(() => {
    getDocs(collection(db, 'tenants')).then(s => setTenants(s.docs.map(d => ({ id: d.id, ...d.data() }))));
    const q = query(collection(db, 'broadcasts'), orderBy('sentAt', 'desc'));
    return onSnapshot(q, s => setBroadcasts(s.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, []);

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const selectAll = () => setSelected(selected.length === tenants.length ? [] : tenants.map(t => t.id));

  const sendBroadcast = async (channel) => {
    if (!message.trim()) { Alert.alert('Error', 'Enter a message'); return; }
    if (selected.length === 0) { Alert.alert('Error', 'Select at least one tenant'); return; }

    setLoading(true);
    const recipientTenants = tenants.filter(t => selected.includes(t.id));

    try {
      // Send via WhatsApp deeplink (opens for each tenant one by one if only one selected, or saves broadcast)
      if (channel === 'whatsapp') {
        // For multiple - we save the broadcast and open first WhatsApp
        if (recipientTenants.length === 1) {
          const t = recipientTenants[0];
          const phone = (t.whatsappNumber || t.phone)?.replace('+', '');
          await Linking.openURL(`whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`);
        } else {
          Alert.alert(
            'WhatsApp Broadcast',
            `Opening WhatsApp for ${recipientTenants.length} tenants. Messages will be saved as a broadcast.`,
            [{ text: 'OK', onPress: async () => {
              for (const t of recipientTenants) {
                const phone = (t.whatsappNumber || t.phone)?.replace('+', '');
                await Linking.openURL(`whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`);
              }
            }}]
          );
        }
      }
      // Save to Firestore
      await addDoc(collection(db, 'broadcasts'), {
        message,
        channel,
        recipientIds: selected,
        recipientNames: recipientTenants.map(t => t.name),
        sentAt: new Date().toISOString(),
      });
      setMessage('');
      setSelected([]);
      Alert.alert('Sent!', `Broadcast sent to ${selected.length} tenant(s)`);
    } catch (err) { Alert.alert('Error', err.message); }
    finally { setLoading(false); }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Broadcast</Text>
        <Text style={styles.subtitle}>Send messages to tenants</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Your Message</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Type your announcement or notice here..."
          placeholderTextColor={colors.textMuted}
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />

        <View style={styles.selHeader}>
          <Text style={styles.label}>Select Recipients</Text>
          <TouchableOpacity onPress={selectAll}>
            <Text style={styles.selAll}>{selected.length === tenants.length ? 'Deselect All' : 'Select All'}</Text>
          </TouchableOpacity>
        </View>

        {tenants.map(t => (
          <TouchableOpacity key={t.id} style={styles.tenantRow} onPress={() => toggleSelect(t.id)}>
            <View style={[styles.checkbox, selected.includes(t.id) && styles.checkboxActive]}>
              {selected.includes(t.id) && <Ionicons name="checkmark" size={14} color={colors.white} />}
            </View>
            <View style={styles.ta}>
              <Text style={styles.tName}>{t.name}</Text>
              <Text style={styles.tSub}>Unit {t.unitNumber}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.sendRow}>
          <TouchableOpacity
            style={[styles.sendBtn, { backgroundColor: '#25D366' }]}
            onPress={() => sendBroadcast('whatsapp')}
            disabled={loading}
          >
            <Ionicons name="logo-whatsapp" size={18} color={colors.white} />
            <Text style={styles.sendText}>{loading ? 'Sending...' : 'WhatsApp'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sendBtn, { backgroundColor: colors.info }]}
            onPress={() => sendBroadcast('sms')}
            disabled={loading}
          >
            <Ionicons name="chatbubble" size={18} color={colors.white} />
            <Text style={styles.sendText}>SMS</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Broadcast History */}
      {broadcasts.length > 0 && (
        <>
          <Text style={styles.histTitle}>Broadcast History</Text>
          {broadcasts.slice(0, 5).map(b => (
            <View key={b.id} style={styles.histCard}>
              <View style={[styles.histIcon, { backgroundColor: b.channel === 'whatsapp' ? '#25D366' + '20' : colors.info + '20' }]}>
                <Ionicons name={b.channel === 'whatsapp' ? 'logo-whatsapp' : 'chatbubble'} size={16} color={b.channel === 'whatsapp' ? '#25D366' : colors.info} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.histMsg} numberOfLines={2}>{b.message}</Text>
                <Text style={styles.histMeta}>{b.recipientIds?.length} recipients • {b.sentAt?.slice(0, 10)}</Text>
              </View>
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
  textArea: {
    backgroundColor: colors.surfaceAlt, borderRadius: 12, borderWidth: 1.5, borderColor: colors.border,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: colors.textPrimary,
    minHeight: 100, textAlignVertical: 'top', marginBottom: 20,
  },
  selHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  selAll: { fontSize: 12, color: colors.primary, fontWeight: '700' },
  tenantRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  checkbox: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  checkboxActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  ta: { flex: 1 },
  tName: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  tSub: { fontSize: 11, color: colors.textSecondary },
  sendRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
  sendBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 12, paddingVertical: 14 },
  sendText: { color: colors.white, fontSize: 14, fontWeight: '700' },
  histTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary, marginHorizontal: 16, marginBottom: 8 },
  histCard: {
    flexDirection: 'row', backgroundColor: colors.white, borderRadius: 14, padding: 14,
    marginHorizontal: 16, marginBottom: 10, elevation: 2, gap: 12,
  },
  histIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  histMsg: { fontSize: 13, color: colors.textPrimary, lineHeight: 18 },
  histMeta: { fontSize: 11, color: colors.textMuted, marginTop: 4 },
});

export default BroadcastScreen;
