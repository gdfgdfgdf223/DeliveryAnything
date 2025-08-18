// App Configuration
export const APP_CONFIG = {
  name: 'DeliverBag',
  version: '1.0.0',
  environment: 'development',
  apiBaseUrl: 'https://api.deliverbag.com',
  
  // Delivery Constraints
  maxBagWeight: 5, // kg
  maxBagVolume: 25, // liters
  maxDeclaredValue: 500, // USD
  
  // Pricing
  baseFare: 5.00,
  perKmRate: 1.50,
  perMinuteRate: 0.25,
  serviceFeeRate: 0.15,
  
  // Map
  defaultRegion: {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  
  // Timers
  courierResponseTime: 60, // seconds
  orderTimeout: 3600, // seconds
  
  // File Upload
  maxImageSize: 5 * 1024 * 1024, // 5MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/heic'],
};

// Order Status Flow
export const ORDER_STATUS_FLOW = [
  'created',
  'assigned',
  'courier_en_route_pickup',
  'picked_up',
  'en_route_dropoff',
  'delivered',
  'completed',
] as const;

// Vehicle Types
export const VEHICLE_TYPES = [
  { key: 'foot', label: 'On Foot', icon: '🚶', maxWeight: 2, maxVolume: 10 },
  { key: 'bike', label: 'Bicycle', icon: '🚴', maxWeight: 5, maxVolume: 25 },
  { key: 'scooter', label: 'Scooter', icon: '🛵', maxWeight: 8, maxVolume: 40 },
] as const;

// Payment Methods
export const PAYMENT_METHODS = [
  'card',
  'apple_pay',
  'google_pay',
  'paypal',
] as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  ORDER_CREATED: 'order_created',
  ORDER_ASSIGNED: 'order_assigned',
  COURIER_EN_ROUTE: 'courier_en_route',
  PACKAGE_PICKED_UP: 'package_picked_up',
  PACKAGE_DELIVERED: 'package_delivered',
  PAYMENT_PROCESSED: 'payment_processed',
  RATING_REQUEST: 'rating_request',
} as const;

// Colors
export const COLORS = {
  primary: '#2563EB',
  secondary: '#059669',
  accent: '#EA580C',
  success: '#059669',
  warning: '#F59E0B',
  error: '#DC2626',
  info: '#2563EB',
  
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

// Typography
export const TYPOGRAPHY = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

// Shadow Presets
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;