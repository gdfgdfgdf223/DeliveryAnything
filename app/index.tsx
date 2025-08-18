import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Package, Truck, Shield } from 'lucide-react-native';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { authService } from '@/services/authService';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isAuthenticated = await authService.isAuthenticated();
      if (isAuthenticated) {
        const user = await authService.getCurrentUser();
        if (user) {
          // Navigate to appropriate app based on user role
          if (user.role === 'customer') {
            router.replace('/(customer)');
          } else if (user.role === 'courier') {
            router.replace('/(courier)');
          } else if (user.role === 'admin' || user.role === 'dispatcher') {
            router.replace('/(admin)/dashboard');
          }
          return;
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const appOptions = [
    {
      id: 'customer',
      title: 'Customer App',
      subtitle: 'Send packages anywhere',
      icon: Package,
      color: '#2563EB',
      route: '/(customer)',
    },
    {
      id: 'courier',
      title: 'Courier App',
      subtitle: 'Earn money delivering',
      icon: Truck,
      color: '#059669',
      route: '/(courier)',
    },
    {
      id: 'admin',
      title: 'Admin Dashboard',
      subtitle: 'Manage operations',
      icon: Shield,
      color: '#7C3AED',
      route: '/(admin)/dashboard',
    },
  ];

  if (isLoading) {
    return <LoadingScreen message="Initializing DeliverBag..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Package size={48} color="#2563EB" />
          </View>
          <Text style={styles.appName}>DeliverBag</Text>
          <Text style={styles.tagline}>Deliver anything that fits in a bag</Text>
        </View>

        {/* App Selection */}
        <View style={styles.optionsContainer}>
          <Text style={styles.sectionTitle}>Choose Your App</Text>
          {appOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionCard, { borderColor: option.color }]}
              onPress={() => router.push(option.route as any)}
            >
              <View style={[styles.optionIcon, { backgroundColor: option.color }]}>
                <option.icon size={32} color="#FFFFFF" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featuresList}>
            <Text style={styles.feature}>• Real-time tracking & notifications</Text>
            <Text style={styles.feature}>• Secure proof-of-delivery</Text>
            <Text style={styles.feature}>• Multiple payment options</Text>
            <Text style={styles.feature}>• Instant courier matching</Text>
            <Text style={styles.feature}>• 24/7 customer support</Text>
          </View>
        </View>
      </View>
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
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  featuresContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  featuresList: {
    marginTop: 8,
  },
  feature: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    paddingLeft: 8,
  },
});