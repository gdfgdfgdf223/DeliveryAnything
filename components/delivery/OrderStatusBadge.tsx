import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { OrderStatus } from '@/types';
import { Clock, Package, Truck, CircleCheck as CheckCircle, Circle as XCircle, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: 'small' | 'medium' | 'large';
}

export function OrderStatusBadge({ status, size = 'medium' }: OrderStatusBadgeProps) {
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'created':
        return {
          icon: Clock,
          label: 'Created',
          backgroundColor: '#FEF3C7',
          textColor: '#92400E',
          iconColor: '#F59E0B',
        };
      case 'assigned':
        return {
          icon: Package,
          label: 'Assigned',
          backgroundColor: '#DBEAFE',
          textColor: '#1D4ED8',
          iconColor: '#2563EB',
        };
      case 'courier_en_route_pickup':
        return {
          icon: Truck,
          label: 'En Route to Pickup',
          backgroundColor: '#E0E7FF',
          textColor: '#4338CA',
          iconColor: '#6366F1',
        };
      case 'picked_up':
        return {
          icon: Package,
          label: 'Picked Up',
          backgroundColor: '#FECACA',
          textColor: '#B91C1C',
          iconColor: '#DC2626',
        };
      case 'en_route_dropoff':
        return {
          icon: Truck,
          label: 'Out for Delivery',
          backgroundColor: '#FED7AA',
          textColor: '#C2410C',
          iconColor: '#EA580C',
        };
      case 'delivered':
        return {
          icon: CheckCircle,
          label: 'Delivered',
          backgroundColor: '#D1FAE5',
          textColor: '#047857',
          iconColor: '#059669',
        };
      case 'completed':
        return {
          icon: CheckCircle,
          label: 'Completed',
          backgroundColor: '#D1FAE5',
          textColor: '#047857',
          iconColor: '#059669',
        };
      case 'canceled':
        return {
          icon: XCircle,
          label: 'Canceled',
          backgroundColor: '#FEE2E2',
          textColor: '#B91C1C',
          iconColor: '#DC2626',
        };
      case 'disputed':
        return {
          icon: AlertTriangle,
          label: 'Disputed',
          backgroundColor: '#FEF3C7',
          textColor: '#92400E',
          iconColor: '#F59E0B',
        };
      default:
        return {
          icon: Clock,
          label: 'Unknown',
          backgroundColor: '#F3F4F6',
          textColor: '#6B7280',
          iconColor: '#9CA3AF',
        };
    }
  };

  const config = getStatusConfig(status);
  const iconSize = size === 'small' ? 12 : size === 'medium' ? 16 : 20;
  const fontSize = size === 'small' ? 10 : size === 'medium' ? 12 : 14;
  const padding = size === 'small' ? 4 : size === 'medium' ? 6 : 8;

  return (
    <View style={[
      styles.badge,
      { 
        backgroundColor: config.backgroundColor,
        paddingHorizontal: padding * 2,
        paddingVertical: padding,
      }
    ]}>
      <config.icon size={iconSize} color={config.iconColor} />
      <Text style={[
        styles.text,
        { 
          color: config.textColor,
          fontSize,
          marginLeft: 4,
        }
      ]}>
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
  },
});