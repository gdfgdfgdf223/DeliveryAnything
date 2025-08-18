import * as Location from 'expo-location';
import * as Camera from 'expo-camera';
import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';

export class PermissionManager {
  static async requestLocationPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Required',
          'This app needs location access to provide delivery services.',
          [
            { text: 'Settings', onPress: () => {} },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }

  static async requestCameraPermission(): Promise<boolean> {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'This app needs camera access to take photos for proof of delivery.',
          [
            { text: 'Settings', onPress: () => {} },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      return false;
    }
  }

  static async requestNotificationPermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'web') {
        return true; // Web notifications handled differently
      }

      const { status } = await Notifications.requestPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Notification Permission Required',
          'Enable notifications to receive delivery updates.',
          [
            { text: 'Settings', onPress: () => {} },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  static async checkAllPermissions(): Promise<{
    location: boolean;
    camera: boolean;
    notifications: boolean;
  }> {
    const [locationStatus, cameraStatus, notificationStatus] = await Promise.all([
      Location.getForegroundPermissionsAsync(),
      Camera.getCameraPermissionsAsync(),
      Platform.OS === 'web' 
        ? { status: 'granted' }
        : Notifications.getPermissionsAsync(),
    ]);

    return {
      location: locationStatus.status === 'granted',
      camera: cameraStatus.status === 'granted',
      notifications: notificationStatus.status === 'granted',
    };
  }

  static async requestAllPermissions(): Promise<void> {
    await Promise.all([
      this.requestLocationPermission(),
      this.requestCameraPermission(),
      this.requestNotificationPermission(),
    ]);
  }
}