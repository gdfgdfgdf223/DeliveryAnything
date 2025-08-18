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
import { User, MapPin, CreditCard, Bell, Globe, CircleHelp as HelpCircle, Shield, ChevronRight, Settings, LogOut } from 'lucide-react-native';

export default function CustomerProfile() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

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

  const profileSections = [
    {
      title: 'Account',
      items: [
        { id: 'personal', title: 'Personal Information', icon: User, action: 'navigate' },
        { id: 'addresses', title: 'Saved Addresses', icon: MapPin, action: 'navigate' },
        { id: 'payment', title: 'Payment Methods', icon: CreditCard, action: 'navigate' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { 
          id: 'notifications', 
          title: 'Push Notifications', 
          icon: Bell, 
          action: 'toggle',
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        { 
          id: 'location', 
          title: 'Location Services', 
          icon: MapPin, 
          action: 'toggle',
          value: locationEnabled,
          onToggle: setLocationEnabled,
        },
        { id: 'language', title: 'Language', icon: Globe, action: 'navigate', subtitle: 'English' },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: 'help', title: 'Help Center', icon: HelpCircle, action: 'navigate' },
        { id: 'privacy', title: 'Privacy Policy', icon: Shield, action: 'navigate' },
        { id: 'terms', title: 'Terms of Service', icon: Shield, action: 'navigate' },
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
            trackColor={{ false: '#E5E7EB', true: '#DBEAFE' }}
            thumbColor={item.value ? '#2563EB' : '#F3F4F6'}
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
            <Text style={styles.settingTitle}>{item.title}</Text>
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
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          <Text style={styles.userPhone}>+1 (555) 123-4567</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Deliveries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>$324</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
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
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
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
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
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
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
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