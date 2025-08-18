import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Package } from 'lucide-react-native';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Package size={48} color="#2563EB" />
        <ActivityIndicator size="large" color="#2563EB" style={styles.spinner} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  spinner: {
    marginVertical: 20,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});