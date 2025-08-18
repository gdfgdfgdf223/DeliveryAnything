import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  DollarSign, 
  TrendingUp, 
  Package, 
  Clock, 
  Calendar,
  ArrowUpRight,
  CreditCard
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function CourierEarnings() {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('day');

  const earningsData = {
    day: { amount: 68.50, trips: 5, hours: 4.2, avgPerTrip: 13.70 },
    week: { amount: 425.75, trips: 32, hours: 28.5, avgPerTrip: 13.30 },
    month: { amount: 1847.25, trips: 142, hours: 125.8, avgPerTrip: 13.01 },
  };

  const currentData = earningsData[selectedPeriod];

  const recentTrips = [
    {
      id: '1',
      description: 'Documents delivery',
      pickup: '123 Main St',
      dropoff: '456 Market St',
      amount: 12.50,
      tip: 2.00,
      time: '2:30 PM',
      duration: '25 min',
    },
    {
      id: '2',
      description: 'Food delivery',
      pickup: '789 Oak St',
      dropoff: '321 Pine St',
      amount: 15.75,
      tip: 3.25,
      time: '1:45 PM',
      duration: '18 min',
    },
    {
      id: '3',
      description: 'Shopping items',
      pickup: 'Best Buy',
      dropoff: '555 Elm St',
      amount: 18.20,
      tip: 0,
      time: '12:15 PM',
      duration: '32 min',
    },
  ];

  const periods = [
    { key: 'day', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Earnings</Text>
          <TouchableOpacity style={styles.cashOutButton}>
            <CreditCard size={16} color="#FFFFFF" />
            <Text style={styles.cashOutText}>Cash Out</Text>
          </TouchableOpacity>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodTab,
                selectedPeriod === period.key && styles.activePeriodTab,
              ]}
              onPress={() => setSelectedPeriod(period.key as any)}
            >
              <Text style={[
                styles.periodTabText,
                selectedPeriod === period.key && styles.activePeriodTabText,
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Main Earnings Card */}
        <View style={styles.mainEarningsCard}>
          <View style={styles.earningsHeader}>
            <View>
              <Text style={styles.earningsLabel}>Total Earnings</Text>
              <Text style={styles.earningsAmount}>${currentData.amount.toFixed(2)}</Text>
            </View>
            <View style={styles.trendIcon}>
              <TrendingUp size={24} color="#059669" />
            </View>
          </View>
          
          <View style={styles.earningsStats}>
            <View style={styles.statItem}>
              <Package size={16} color="#6B7280" />
              <Text style={styles.statLabel}>{currentData.trips} trips</Text>
            </View>
            <View style={styles.statItem}>
              <Clock size={16} color="#6B7280" />
              <Text style={styles.statLabel}>{currentData.hours}h online</Text>
            </View>
            <View style={styles.statItem}>
              <DollarSign size={16} color="#6B7280" />
              <Text style={styles.statLabel}>${currentData.avgPerTrip.toFixed(2)} avg</Text>
            </View>
          </View>
        </View>

        {/* Performance Metrics */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>4.9</Text>
            <Text style={styles.metricLabel}>Rating</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>98%</Text>
            <Text style={styles.metricLabel}>Acceptance</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>2.1</Text>
            <Text style={styles.metricLabel}>Avg Time</Text>
          </View>
        </View>

        {/* Recent Trips */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Trips</Text>
          {recentTrips.map((trip) => (
            <View key={trip.id} style={styles.tripCard}>
              <View style={styles.tripInfo}>
                <Text style={styles.tripDescription}>{trip.description}</Text>
                <Text style={styles.tripRoute}>
                  {trip.pickup} → {trip.dropoff}
                </Text>
                <View style={styles.tripMeta}>
                  <Text style={styles.tripTime}>{trip.time}</Text>
                  <Text style={styles.tripDuration}>• {trip.duration}</Text>
                </View>
              </View>
              <View style={styles.tripEarnings}>
                <Text style={styles.tripAmount}>${trip.amount.toFixed(2)}</Text>
                {trip.tip > 0 && (
                  <Text style={styles.tripTip}>+${trip.tip.toFixed(2)} tip</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.bottomPadding} />
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
  cashOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cashOutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activePeriodTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  periodTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activePeriodTabText: {
    color: '#059669',
    fontWeight: '600',
  },
  mainEarningsCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  earningsLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  earningsAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#111827',
  },
  trendIcon: {
    backgroundColor: '#D1FAE5',
    padding: 12,
    borderRadius: 12,
  },
  earningsStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: (width - 60) / 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  recentSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tripInfo: {
    flex: 1,
  },
  tripDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  tripRoute: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  tripMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  tripDuration: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  tripEarnings: {
    alignItems: 'flex-end',
  },
  tripAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  tripTip: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 100,
  },
});