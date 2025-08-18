import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Power, MapPin, Clock, Package, DollarSign, Navigation, Camera, CircleCheck as CheckCircle } from 'lucide-react-native';
import type { DeliveryOrder } from '@/types';

const mockJobs: DeliveryOrder[] = [
  {
    id: '1',
    customerId: 'user1',
    status: 'assigned',
    pickupAddress: {
      id: 'addr1',
      label: 'Pickup',
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'US',
      coordinates: { latitude: 37.7749, longitude: -122.4194 },
    },
    dropoffAddress: {
      id: 'addr2',
      label: 'Dropoff',
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
    estimatedPickupTime: new Date(Date.now() + 15 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function CourierJobs() {
  const [isOnline, setIsOnline] = useState(true);
  const [currentJob, setCurrentJob] = useState<DeliveryOrder | null>(mockJobs[0]);

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
  };

  const handleAcceptJob = (job: DeliveryOrder) => {
    setCurrentJob(job);
    Alert.alert('Job Accepted', 'Navigate to pickup location?', [
      { text: 'Later', style: 'cancel' },
      { text: 'Navigate', onPress: () => {} },
    ]);
  };

  const handleDeclineJob = (jobId: string) => {
    Alert.alert('Decline Job', 'Are you sure you want to decline this job?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Decline', style: 'destructive', onPress: () => {} },
    ]);
  };

  const handleUpdateStatus = (status: string) => {
    if (currentJob) {
      setCurrentJob({ ...currentJob, status: status as any });
    }
  };

  const renderJobCard = (job: DeliveryOrder) => (
    <View key={job.id} style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <Text style={styles.jobTitle}>{job.itemDescription}</Text>
        <Text style={styles.jobEarnings}>${job.pricing.total.toFixed(2)}</Text>
      </View>
      
      <View style={styles.addressContainer}>
        <View style={styles.addressRow}>
          <MapPin size={16} color="#059669" />
          <Text style={styles.addressText}>
            {job.pickupAddress.street}, {job.pickupAddress.city}
          </Text>
        </View>
        <View style={styles.addressRow}>
          <MapPin size={16} color="#DC2626" />
          <Text style={styles.addressText}>
            {job.dropoffAddress.street}, {job.dropoffAddress.city}
          </Text>
        </View>
      </View>

      <View style={styles.jobFooter}>
        <View style={styles.jobInfo}>
          <Clock size={14} color="#6B7280" />
          <Text style={styles.jobTime}>15 min away</Text>
        </View>
        <View style={styles.jobActions}>
          <TouchableOpacity 
            style={styles.declineButton}
            onPress={() => handleDeclineJob(job.id)}
          >
            <Text style={styles.declineText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.acceptButton}
            onPress={() => handleAcceptJob(job)}
          >
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderCurrentJob = (job: DeliveryOrder) => (
    <View style={styles.currentJobCard}>
      <View style={styles.currentJobHeader}>
        <Text style={styles.currentJobTitle}>Current Delivery</Text>
        <Text style={styles.currentJobEarnings}>${job.pricing.total.toFixed(2)}</Text>
      </View>

      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{job.status.replace('_', ' ').toUpperCase()}</Text>
      </View>

      <View style={styles.jobDetails}>
        <Text style={styles.itemDescription}>{job.itemDescription}</Text>
        <Text style={styles.pickupCode}>Pickup Code: {job.pickupCode}</Text>
      </View>

      <View style={styles.addressContainer}>
        <View style={styles.addressRow}>
          <MapPin size={16} color="#059669" />
          <Text style={styles.addressText}>
            {job.pickupAddress.street}, {job.pickupAddress.city}
          </Text>
        </View>
        <View style={styles.addressRow}>
          <MapPin size={16} color="#DC2626" />
          <Text style={styles.addressText}>
            {job.dropoffAddress.street}, {job.dropoffAddress.city}
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        {job.status === 'assigned' && (
          <>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleUpdateStatus('courier_en_route_pickup')}
            >
              <Navigation size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Start Pickup</Text>
            </TouchableOpacity>
          </>
        )}
        
        {job.status === 'courier_en_route_pickup' && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleUpdateStatus('picked_up')}
          >
            <Camera size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Confirm Pickup</Text>
          </TouchableOpacity>
        )}
        
        {job.status === 'picked_up' && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleUpdateStatus('en_route_dropoff')}
          >
            <Navigation size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Start Delivery</Text>
          </TouchableOpacity>
        )}
        
        {job.status === 'en_route_dropoff' && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleUpdateStatus('delivered')}
          >
            <CheckCircle size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Complete Delivery</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Jobs</Text>
        <View style={styles.onlineToggle}>
          <Text style={[styles.onlineText, { color: isOnline ? '#059669' : '#6B7280' }]}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
          <Switch
            value={isOnline}
            onValueChange={handleToggleOnline}
            trackColor={{ false: '#E5E7EB', true: '#D1FAE5' }}
            thumbColor={isOnline ? '#059669' : '#F3F4F6'}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Job */}
        {currentJob && renderCurrentJob(currentJob)}

        {/* Earnings Summary */}
        <View style={styles.earningsCard}>
          <Text style={styles.earningsTitle}>Today's Earnings</Text>
          <Text style={styles.earningsAmount}>$68.50</Text>
          <Text style={styles.earningsTrips}>5 deliveries completed</Text>
        </View>

        {/* Available Jobs */}
        {isOnline && !currentJob && (
          <View style={styles.jobsSection}>
            <Text style={styles.sectionTitle}>Available Jobs</Text>
            {mockJobs.map(renderJobCard)}
          </View>
        )}

        {!isOnline && (
          <View style={styles.offlineState}>
            <Power size={48} color="#9CA3AF" />
            <Text style={styles.offlineTitle}>You're Offline</Text>
            <Text style={styles.offlineSubtitle}>
              Turn on to start receiving delivery requests
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  onlineToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  currentJobCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#059669',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  currentJobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentJobTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  currentJobEarnings: {
    fontSize: 20,
    fontWeight: '700',
    color: '#059669',
  },
  statusBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  jobDetails: {
    marginBottom: 16,
  },
  itemDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  pickupCode: {
    fontSize: 14,
    color: '#6B7280',
  },
  earningsCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  earningsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 8,
  },
  earningsAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  earningsTrips: {
    fontSize: 14,
    color: '#6B7280',
  },
  jobsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  jobCard: {
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
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  jobEarnings: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
  },
  addressContainer: {
    marginBottom: 16,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobTime: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  jobActions: {
    flexDirection: 'row',
  },
  declineButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DC2626',
    marginRight: 8,
  },
  declineText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
  },
  acceptButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#059669',
  },
  acceptText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionButtons: {
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  offlineState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  offlineTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 4,
  },
  offlineSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});