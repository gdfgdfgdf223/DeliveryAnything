import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Package, Clock, CreditCard } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function CustomerHome() {
  const router = useRouter();
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const handleCreateDelivery = () => {
    if (!pickupAddress || !dropoffAddress || !itemDescription) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }
    
    // Navigate to delivery creation flow
    router.push('/create-delivery');
  };

  const quickActions = [
    { id: 'documents', title: 'Documents', icon: Package, color: '#2563EB' },
    { id: 'food', title: 'Food Delivery', icon: Package, color: '#059669' },
    { id: 'shopping', title: 'Shopping', icon: Package, color: '#EA580C' },
    { id: 'emergency', title: 'Emergency', icon: Clock, color: '#DC2626' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.subtitle}>What would you like to deliver today?</Text>
        </View>

        {/* Quick Address Input */}
        <View style={styles.addressSection}>
          <View style={styles.addressInput}>
            <MapPin size={20} color="#6B7280" />
            <TextInput
              style={styles.addressText}
              placeholder="Pickup address"
              value={pickupAddress}
              onChangeText={setPickupAddress}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          
          <View style={styles.addressInput}>
            <MapPin size={20} color="#6B7280" />
            <TextInput
              style={styles.addressText}
              placeholder="Dropoff address"
              value={dropoffAddress}
              onChangeText={setDropoffAddress}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.addressInput}>
            <Package size={20} color="#6B7280" />
            <TextInput
              style={styles.addressText}
              placeholder="What are you sending?"
              value={itemDescription}
              onChangeText={setItemDescription}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Create Delivery Button */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreateDelivery}>
          <Text style={styles.createButtonText}>Create Delivery</Text>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.actionCard}>
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity style={styles.recentCard}>
            <View style={styles.recentInfo}>
              <Text style={styles.recentTitle}>Documents to Office</Text>
              <Text style={styles.recentDate}>Today, 2:30 PM</Text>
              <Text style={styles.recentStatus}>Delivered</Text>
            </View>
            <View style={styles.recentPrice}>
              <Text style={styles.priceText}>$12.50</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Promotions */}
        <View style={styles.promoSection}>
          <View style={styles.promoCard}>
            <Text style={styles.promoTitle}>50% Off First Delivery</Text>
            <Text style={styles.promoSubtitle}>Use code WELCOME50</Text>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Claim Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  addressSection: {
    marginBottom: 20,
  },
  addressInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  addressText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  createButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  quickActions: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  recentSection: {
    marginBottom: 32,
  },
  recentCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recentInfo: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  recentDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  recentStatus: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  recentPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  promoSection: {
    marginBottom: 20,
  },
  promoCard: {
    backgroundColor: '#FEF3C7',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FBBF24',
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 14,
    color: '#B45309',
    marginBottom: 16,
  },
  promoButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});