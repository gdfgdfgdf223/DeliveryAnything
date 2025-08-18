import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, Users, Package, DollarSign, MapPin, Clock, TriangleAlert as AlertTriangle, ChartBar as BarChart3 } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  const dashboardStats = {
    today: {
      activeOrders: 47,
      completedOrders: 156,
      activeCouriers: 23,
      revenue: 2847.50,
      avgDeliveryTime: 28,
      customerRating: 4.6,
    },
    week: {
      activeOrders: 312,
      completedOrders: 1247,
      activeCouriers: 89,
      revenue: 18642.75,
      avgDeliveryTime: 26,
      customerRating: 4.7,
    },
    month: {
      activeOrders: 1456,
      completedOrders: 5893,
      activeCouriers: 234,
      revenue: 89735.20,
      avgDeliveryTime: 24,
      customerRating: 4.8,
    },
  };

  const currentStats = dashboardStats[selectedPeriod];

  const recentAlerts = [
    {
      id: '1',
      type: 'warning',
      message: 'High demand in Downtown area',
      time: '5 min ago',
    },
    {
      id: '2',
      type: 'error',
      message: 'Courier #247 reported delivery issue',
      time: '12 min ago',
    },
    {
      id: '3',
      type: 'info',
      message: 'New courier onboarding completed',
      time: '25 min ago',
    },
  ];

  const topCouriers = [
    { id: '1', name: 'Alex Johnson', rating: 4.9, deliveries: 28, earnings: 456.75 },
    { id: '2', name: 'Maria Garcia', rating: 4.8, deliveries: 31, earnings: 487.20 },
    { id: '3', name: 'David Chen', rating: 4.9, deliveries: 25, earnings: 398.50 },
  ];

  const periods = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={16} color="#F59E0B" />;
      case 'error':
        return <AlertTriangle size={16} color="#DC2626" />;
      default:
        return <Clock size={16} color="#2563EB" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return '#FEF3C7';
      case 'error':
        return '#FEE2E2';
      default:
        return '#DBEAFE';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Operations Dashboard</Text>
          <TouchableOpacity style={styles.liveButton}>
            <View style={styles.liveIndicator} />
            <Text style={styles.liveText}>Live</Text>
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

        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <Package size={24} color="#2563EB" />
            </View>
            <Text style={styles.metricValue}>{currentStats.activeOrders}</Text>
            <Text style={styles.metricLabel}>Active Orders</Text>
          </View>
          
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <Users size={24} color="#059669" />
            </View>
            <Text style={styles.metricValue}>{currentStats.activeCouriers}</Text>
            <Text style={styles.metricLabel}>Online Couriers</Text>
          </View>
          
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <DollarSign size={24} color="#EA580C" />
            </View>
            <Text style={styles.metricValue}>${currentStats.revenue.toLocaleString()}</Text>
            <Text style={styles.metricLabel}>Revenue</Text>
          </View>
          
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <Clock size={24} color="#7C3AED" />
            </View>
            <Text style={styles.metricValue}>{currentStats.avgDeliveryTime}m</Text>
            <Text style={styles.metricLabel}>Avg Delivery</Text>
          </View>
        </View>

        {/* Live Map Section */}
        <View style={styles.mapSection}>
          <Text style={styles.sectionTitle}>Live Operations Map</Text>
          <View style={styles.mapPlaceholder}>
            <MapPin size={48} color="#9CA3AF" />
            <Text style={styles.mapText}>Interactive map showing live courier locations and active orders</Text>
          </View>
        </View>

        {/* Recent Alerts */}
        <View style={styles.alertsSection}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          {recentAlerts.map((alert) => (
            <View key={alert.id} style={[styles.alertCard, { backgroundColor: getAlertColor(alert.type) }]}>
              <View style={styles.alertContent}>
                {getAlertIcon(alert.type)}
                <Text style={styles.alertMessage}>{alert.message}</Text>
              </View>
              <Text style={styles.alertTime}>{alert.time}</Text>
            </View>
          ))}
        </View>

        {/* Top Performers */}
        <View style={styles.performersSection}>
          <Text style={styles.sectionTitle}>Top Couriers Today</Text>
          {topCouriers.map((courier, index) => (
            <View key={courier.id} style={styles.courierCard}>
              <View style={styles.courierRank}>
                <Text style={styles.rankNumber}>#{index + 1}</Text>
              </View>
              <View style={styles.courierInfo}>
                <Text style={styles.courierName}>{courier.name}</Text>
                <View style={styles.courierStats}>
                  <Text style={styles.courierStat}>⭐ {courier.rating}</Text>
                  <Text style={styles.courierStat}>📦 {courier.deliveries}</Text>
                  <Text style={styles.courierStat}>${courier.earnings.toFixed(0)}</Text>
                </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  liveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
    marginRight: 6,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
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
    color: '#2563EB',
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    width: (width - 52) / 2,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  mapSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  mapPlaceholder: {
    backgroundColor: '#FFFFFF',
    height: 200,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  mapText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 20,
  },
  alertsSection: {
    marginBottom: 24,
  },
  alertCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alertMessage: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
  },
  alertTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  performersSection: {
    marginBottom: 20,
  },
  courierCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  courierRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
  },
  courierInfo: {
    flex: 1,
  },
  courierName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  courierStats: {
    flexDirection: 'row',
    gap: 12,
  },
  courierStat: {
    fontSize: 12,
    color: '#6B7280',
  },
  bottomPadding: {
    height: 100,
  },
});