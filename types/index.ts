export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  avatar?: string;
  role: 'customer' | 'courier' | 'admin' | 'dispatcher';
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  instructions?: string;
}

export interface DeliveryOrder {
  id: string;
  customerId: string;
  courierId?: string;
  status: OrderStatus;
  
  // Pickup details
  pickupAddress: Address;
  pickupContact: ContactInfo;
  pickupNotes?: string;
  pickupCode: string;
  pickupTime?: Date;
  pickupPhoto?: string;
  
  // Dropoff details
  dropoffAddress: Address;
  dropoffContact: ContactInfo;
  dropoffNotes?: string;
  dropoffTime?: Date;
  dropoffProof?: ProofOfDelivery;
  
  // Item details
  itemDescription: string;
  itemPhotos: string[];
  declaredValue: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  
  // Pricing
  pricing: PricingBreakdown;
  paymentMethodId: string;
  promoCode?: string;
  tip?: number;
  
  // Tracking
  courierLocation?: {
    latitude: number;
    longitude: number;
    heading?: number;
    speed?: number;
  };
  estimatedPickupTime?: Date;
  estimatedDeliveryTime?: Date;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  canceledAt?: Date;
  cancelReason?: string;
}

export type OrderStatus = 
  | 'created'
  | 'assigned'
  | 'courier_en_route_pickup'
  | 'picked_up'
  | 'en_route_dropoff'
  | 'delivered'
  | 'completed'
  | 'canceled'
  | 'disputed';

export interface ContactInfo {
  name: string;
  phone: string;
  email?: string;
}

export interface ProofOfDelivery {
  type: 'photo' | 'signature';
  data: string; // base64 or URL
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
  };
  recipientName?: string;
}

export interface PricingBreakdown {
  baseFare: number;
  distanceFee: number;
  timeFee: number;
  surgeFee: number;
  waitFee: number;
  serviceFee: number;
  total: number;
  currency: string;
}

export interface CourierProfile {
  userId: string;
  isOnline: boolean;
  vehicleType: 'foot' | 'bike' | 'scooter';
  serviceZones: string[];
  rating: number;
  totalDeliveries: number;
  documentsVerified: boolean;
  bagPhoto?: string;
  idPhoto?: string;
  currentLocation?: {
    latitude: number;
    longitude: number;
    timestamp: Date;
  };
  earnings: {
    today: number;
    week: number;
    month: number;
    total: number;
  };
}

export interface Zone {
  id: string;
  name: string;
  coordinates: Array<{
    latitude: number;
    longitude: number;
  }>;
  isActive: boolean;
  pricingRules: PricingRule[];
}

export interface PricingRule {
  id: string;
  zoneId: string;
  baseFare: number;
  perKmRate: number;
  perMinuteRate: number;
  surgeMultiplier: number;
  waitTimeRate: number;
  maxBagWeight: number;
  maxBagVolume: number;
}

export interface Rating {
  id: string;
  orderId: string;
  raterId: string;
  ratedId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order_update' | 'payment' | 'promotion' | 'system';
  data?: Record<string, any>;
  read: boolean;
  createdAt: Date;
}