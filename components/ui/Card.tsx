import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
}

export function Card({ children, style, onPress, variant = 'default' }: CardProps) {
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Component
      style={[styles.card, styles[variant], style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </Component>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  default: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  outlined: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: 'transparent',
    elevation: 0,
  },
});