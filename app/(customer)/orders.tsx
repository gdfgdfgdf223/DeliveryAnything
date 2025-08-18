import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import type { DeliveryOrder } from '@/types';

const mockOrders: DeliveryOrder[] = [
  {
    id: '1',
    customerId: 'user1',
    courierId: 'courier1',
    status: 'en_route_dropoff',
    pickupAddress: {
      id: 'addr1',
      label: 'Home',
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'US',
      coordinates: { latitude: 37.7749, longitude: -122.4194 },
    },
    dropoffAddress: {
      id: 'addr2',
      label: 'Office',
      street: '456 Market St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'US',
      coordinates: { latitude: 37.7849, longitude: -122.4094 },
    },
    pickupContact: { name: 'John Doe', phone: '+1234567890' },
    dropoffContact: { name: 'Jane Smith', phone: '+1234567891' },
    itemDescription: 'Important documents',
    itemPhotos: [],
    declaredValue: 100,
    pickupCode: 'ABC123',
    pricing: {
      baseFare: 5.00,
      distanceFee: 3.50,
      timeFee: 2.00,
      surgeFee: 0,
      waitFee: 0,
      serviceFee: 1.50,
      total: 12.00,
      currency: 'USD',
    },
    paymentMethodId: 'pm_123',
    estimatedDeliveryTime: new Date(Date.now() + 30 * 60 * 1000),
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: '2',
    customerId: 'user1',
    status: 'completed',
    pickupAddress: {
      id: 'addr3',
      label: 'Store',
      street: '789 Oak St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'US',
      coordinates: { latitude: 37.7649, longitude: -122.4294 },
    },
    dropoffAddress: {
      id: 'addr4',
      label: 'Friend\'s House',
      street: '321 Pine St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'US',
      coordinates: { latitude: 37.7949, longitude: -122.3994 },
    },
    pickupContact: { name: 'Store Manager', phone: '+1234567892' },
    dropoffContact: { name: 'Mike Johnson', phone: '+1234567893' },
    itemDescription: 'Birthday gift',
    itemPhotos: [],
    declaredValue: 50,
    pickupCode: 'XYZ789',
    pricing: {
      baseFare: 5.00,
      distanceFee: 2.50,
      timeFee: 1.50,
      surgeFee: 0,
      waitFee: 0,
      serviceFee: 1.25,
      total: 10.25,
      currency: 'USD',
    },
    paymentMethodId: 'pm_456',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 23 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 23 * 60 * 60 * 1000),
  },
];

export default function CustomerOrders() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredOrders = mockOrders.filter(order => {
    if (filter === 'active') {
      return !['completed', 'canceled'].includes(order.status);
    }
    if (filter === 'completed') {
      return ['completed', 'canceled'].includes(order.status);
    }
    return true;
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} color="#059669" />;
      case 'canceled':
        return <AlertCircle size={20} color="#DC2626" />;
      default:
        return <Clock size={20} color="#F59E0B" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#059669';
      case 'canceled':
        return '#DC2626';
      default:
        return '#F59E0B';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const renderOrderCard = ({ item }: { item: DeliveryOrder }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => router.push(`/order-details/${item.id}`)}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderTitle}>{item.itemDescription}</Text>
        <View style={styles.statusContainer}>
          {getStatusIcon(item.status)}
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {formatStatus(item.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.addressRow}>
        <MapPin size={16} color="#6B7280" />
        <Text style={styles.addressText}>
          {item.pickupAddress.street} → {item.dropoffAddress.street}
        </Text>
      </View>
      
      <View style={styles.orderFooter}>
        <Text style={styles.orderDate}>
          {item.createdAt.toLocaleDateString()} at {item.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Text style={styles.orderPrice}>${item.pricing.total.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        
        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          {['all', 'active', 'completed'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.filterTab, filter === tab && styles.activeFilterTab]}
              onPress={() => setFilter(tab as any)}
            >
              <Text style={[
                styles.filterTabText,
                filter === tab && styles.activeFilterTabText
              ]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={renderOrderCard}
        keyExtractor={(item) => item.id}
        style={styles.ordersList}
        contentContainerStyle={styles.ordersContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Package size={48} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptySubtitle}>
              Create your first delivery to get started
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeFilterTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterTabText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  ordersList: {
    flex: 1,
  },
  ordersContent: {
    padding: 20,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});