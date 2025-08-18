import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Truck, Star, MapPin, Bell, FileText, CircleHelp as HelpCircle, Settings, ChevronRight, LogOut, Camera, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function CourierProfile() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [availabilityZones, setAvailabilityZones] = useState(true);

  const courierStats = {
    rating: 4.9,
    totalDeliveries: 247,
    acceptanceRate: 98,
    onTimeRate: 96,
    documentStatus: 'verified',
    vehicleType: 'bike',
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const handleDocumentUpload = () => {
    Alert.alert(
      'Document Upload',
      'Choose document type to upload',
      [
        { text: 'ID Document', onPress: () => {} },
        { text: 'Bag Photo', onPress: () => {} },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const profileSections = [
    {
      title: 'Courier Information',
      items: [
        { id: 'personal', title: 'Personal Details', icon: User, action: 'navigate' },
        { id: 'vehicle', title: 'Vehicle Information', icon: Truck, action: 'navigate', subtitle: 'Bike' },
        { id: 'documents', title: 'Documents', icon: FileText, action: 'navigate', status: 'verified' },
        { id: 'zones', title: 'Service Zones', icon: MapPin, action: 'navigate', subtitle: '3 zones active' },
      ],
    },
    {
      title: 'Settings',
      items: [
        { 
          id: 'notifications', 
          title: 'Job Notifications', 
          icon: Bell, 
          action: 'toggle',
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        { 
          id: 'zones', 
          title: 'Auto Accept in Zones', 
          icon: MapPin, 
          action: 'toggle',
          value: availabilityZones,
          onToggle: setAvailabilityZones,
        },
        { id: 'preferences', title: 'Preferences', icon: Settings, action: 'navigate' },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: 'help', title: 'Help Center', icon: HelpCircle, action: 'navigate' },
        { id: 'contact', title: 'Contact Support', icon: HelpCircle, action: 'navigate' },
      ],
    },
  ];

  const renderSectionItem = (item: any) => {
    if (item.action === 'toggle') {
      return (
        <View key={item.id} style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIcon}>
              <item.icon size={20} color="#6B7280" />
            </View>
            <Text style={styles.settingTitle}>{item.title}</Text>
          </View>
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: '#E5E7EB', true: '#D1FAE5' }}
            thumbColor={item.value ? '#059669' : '#F3F4F6'}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity key={item.id} style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <View style={styles.settingIcon}>
            <item.icon size={20} color="#6B7280" />
          </View>
          <View style={styles.settingContent}>
            <View style={styles.settingTitleRow}>
              <Text style={styles.settingTitle}>{item.title}</Text>
              {item.status === 'verified' && (
                <CheckCircle size={16} color="#059669" />
              )}
            </View>
            {item.subtitle && (
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            )}
          </View>
        </View>
        <ChevronRight size={20} color="#9CA3AF" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={32} color="#FFFFFF" />
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Alex Johnson</Text>
          <Text style={styles.userEmail}>alex.johnson@example.com</Text>
          <Text style={styles.userPhone}>+1 (555) 987-6543</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Star size={20} color="#F59E0B" />
              <Text style={styles.statValue}>{courierStats.rating}</Text>
            </View>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Package size={20} color="#059669" />
              <Text style={styles.statValue}>{courierStats.totalDeliveries}</Text>
            </View>
            <Text style={styles.statLabel}>Deliveries</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <CheckCircle size={20} color="#2563EB" />
              <Text style={styles.statValue}>{courierStats.acceptanceRate}%</Text>
            </View>
            <Text style={styles.statLabel}>Acceptance</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionCard} onPress={handleDocumentUpload}>
            <FileText size={24} color="#2563EB" />
            <Text style={styles.quickActionText}>Upload Documents</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionCard}>
            <MapPin size={24} color="#059669" />
            <Text style={styles.quickActionText}>Update Zones</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Sections */}
        {profileSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map(renderSectionItem)}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#DC2626" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

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
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
    marginLeft: 8,
  },
  bottomPadding: {
    height: 100,
  },
});