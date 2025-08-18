import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { DeliveryOrder } from '@/types';
import { CircleCheck as CheckCircle, Circle, Clock } from 'lucide-react-native';

interface DeliveryTimelineProps {
  order: DeliveryOrder;
}

export function DeliveryTimeline({ order }: DeliveryTimelineProps) {
  const timelineSteps = [
    {
      key: 'created',
      label: 'Order Created',
      time: order.createdAt,
      completed: true,
    },
    {
      key: 'assigned',
      label: 'Courier Assigned',
      time: order.status !== 'created' ? order.updatedAt : null,
      completed: ['assigned', 'courier_en_route_pickup', 'picked_up', 'en_route_dropoff', 'delivered', 'completed'].includes(order.status),
    },
    {
      key: 'pickup',
      label: 'Package Picked Up',
      time: order.pickupTime,
      completed: ['picked_up', 'en_route_dropoff', 'delivered', 'completed'].includes(order.status),
    },
    {
      key: 'delivered',
      label: 'Package Delivered',
      time: order.dropoffTime,
      completed: ['delivered', 'completed'].includes(order.status),
    },
  ];

  const renderTimelineStep = (step: any, index: number) => {
    const isLast = index === timelineSteps.length - 1;
    const isActive = !step.completed && (
      (step.key === 'assigned' && order.status === 'created') ||
      (step.key === 'pickup' && ['assigned', 'courier_en_route_pickup'].includes(order.status)) ||
      (step.key === 'delivered' && ['picked_up', 'en_route_dropoff'].includes(order.status))
    );

    return (
      <View key={step.key} style={styles.timelineStep}>
        <View style={styles.timelineLeft}>
          <View style={[
            styles.timelineIcon,
            step.completed && styles.completedIcon,
            isActive && styles.activeIcon,
          ]}>
            {step.completed ? (
              <CheckCircle size={16} color="#FFFFFF" />
            ) : isActive ? (
              <Clock size={16} color="#FFFFFF" />
            ) : (
              <Circle size={16} color="#9CA3AF" />
            )}
          </View>
          {!isLast && (
            <View style={[
              styles.timelineLine,
              step.completed && styles.completedLine,
            ]} />
          )}
        </View>
        
        <View style={styles.timelineContent}>
          <Text style={[
            styles.timelineLabel,
            step.completed && styles.completedLabel,
            isActive && styles.activeLabel,
          ]}>
            {step.label}
          </Text>
          {step.time && (
            <Text style={styles.timelineTime}>
              {step.time.toLocaleDateString()} at {step.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Progress</Text>
      <View style={styles.timeline}>
        {timelineSteps.map(renderTimelineStep)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 20,
  },
  timeline: {
    paddingLeft: 8,
  },
  timelineStep: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  completedIcon: {
    backgroundColor: '#059669',
  },
  activeIcon: {
    backgroundColor: '#F59E0B',
  },
  timelineLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
  },
  completedLine: {
    backgroundColor: '#059669',
  },
  timelineContent: {
    flex: 1,
    paddingTop: 4,
  },
  timelineLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  completedLabel: {
    color: '#059669',
    fontWeight: '600',
  },
  activeLabel: {
    color: '#F59E0B',
    fontWeight: '600',
  },
  timelineTime: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});