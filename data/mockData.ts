import type { User, DeliveryOrder, CourierProfile, Zone } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'customer1',
    email: 'john.customer@example.com',
    phone: '+1234567890',
    name: 'John Doe',
    role: 'customer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
  },
  {
    id: 'courier1',
    email: 'alex.courier@example.com',
    phone: '+1234567891',
    name: 'Alex Johnson',
    role: 'courier',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date(),
  },
  {
    id: 'admin1',
    email: 'admin@deliverbag.com',
    phone: '+1234567892',
    name: 'Sarah Admin',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
];

export const mockCourierProfiles: CourierProfile[] = [
  {
    userId: 'courier1',
    isOnline: true,
    vehicleType: 'bike',
    serviceZones: ['zone1', 'zone2'],
    rating: 4.9,
    totalDeliveries: 247,
    documentsVerified: true,
    bagPhoto: 'https://images.pexels.com/photos/1545742/pexels-photo-1545742.jpeg?auto=compress&cs=tinysrgb&w=400',
    idPhoto: 'verified',
    currentLocation: {
      latitude: 37.7749,
      longitude: -122.4194,
      timestamp: new Date(),
    },
    earnings: {
      today: 68.50,
      week: 425.75,
      month: 1847.25,
      total: 12543.80,
    },
  },
];

export const mockOrders: DeliveryOrder[] = [
  {
    id: 'order1',
    customerId: 'customer1',
    courierId: 'courier1',
    status: 'en_route_dropoff',
    pickupAddress: {
      id: 'addr1',
      label: 'Home',
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'US',
      coordinates: { latitude: 37.7749, longitude: -122.4194 },
      instructions: 'Ring doorbell twice',
    },
    dropoffAddress: {
      id: 'addr2',
      label: 'Office',
      street: '456 Market Street, Suite 200',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'US',
      coordinates: { latitude: 37.7849, longitude: -122.4094 },
      instructions: 'Ask for Sarah at reception',
    },
    pickupContact: {
      name: 'John Doe',
      phone: '+1234567890',
      email: 'john@example.com',
    },
    dropoffContact: {
      name: 'Sarah Johnson',
      phone: '+1234567891',
      email: 'sarah@company.com',
    },
    itemDescription: 'Important legal documents',
    itemPhotos: [
      'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=400',
    ],
    declaredValue: 150,
    weight: 0.5,
    dimensions: {
      length: 30,
      width: 21,
      height: 2,
    },
    pickupCode: 'ABC123',
    pickupTime: new Date(Date.now() - 30 * 60 * 1000),
    pickupPhoto: 'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=400',
    pricing: {
      baseFare: 5.00,
      distanceFee: 3.50,
      timeFee: 2.00,
      surgeFee: 0,
      waitFee: 0,
      serviceFee: 1.58,
      total: 12.08,
      currency: 'USD',
    },
    paymentMethodId: 'pm_1234567890',
    tip: 2.50,
    courierLocation: {
      latitude: 37.7799,
      longitude: -122.4144,
      heading: 45,
      speed: 25,
    },
    estimatedPickupTime: new Date(Date.now() - 45 * 60 * 1000),
    estimatedDeliveryTime: new Date(Date.now() + 15 * 60 * 1000),
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
    updatedAt: new Date(),
  },
];

export const mockZones: Zone[] = [
  {
    id: 'zone1',
    name: 'Downtown San Francisco',
    coordinates: [
      { latitude: 37.7849, longitude: -122.4194 },
      { latitude: 37.7949, longitude: -122.4094 },
      { latitude: 37.7849, longitude: -122.3994 },
      { latitude: 37.7749, longitude: -122.4094 },
    ],
    isActive: true,
    pricingRules: [
      {
        id: 'rule1',
        zoneId: 'zone1',
        baseFare: 5.00,
        perKmRate: 1.50,
        perMinuteRate: 0.25,
        surgeMultiplier: 1.0,
        waitTimeRate: 0.50,
        maxBagWeight: 5,
        maxBagVolume: 25,
      },
    ],
  },
  {
    id: 'zone2',
    name: 'Mission District',
    coordinates: [
      { latitude: 37.7649, longitude: -122.4194 },
      { latitude: 37.7749, longitude: -122.4094 },
      { latitude: 37.7649, longitude: -122.3994 },
      { latitude: 37.7549, longitude: -122.4094 },
    ],
    isActive: true,
    pricingRules: [
      {
        id: 'rule2',
        zoneId: 'zone2',
        baseFare: 4.50,
        perKmRate: 1.25,
        perMinuteRate: 0.20,
        surgeMultiplier: 1.2,
        waitTimeRate: 0.45,
        maxBagWeight: 5,
        maxBagVolume: 25,
      },
    ],
  },
];

// Seed data for development and testing
export const seedData = {
  users: mockUsers,
  courierProfiles: mockCourierProfiles,
  orders: mockOrders,
  zones: mockZones,
  
  // Additional test data
  promosCodes: [
    { code: 'WELCOME50', discount: 0.5, description: '50% off first delivery' },
    { code: 'STUDENT20', discount: 0.2, description: '20% off for students' },
    { code: 'LOYAL10', discount: 0.1, description: '10% off for loyal customers' },
  ],
  
  paymentMethods: [
    { id: 'pm_card_1', type: 'card', last4: '4242', brand: 'visa' },
    { id: 'pm_apple_pay', type: 'apple_pay', brand: 'apple_pay' },
    { id: 'pm_google_pay', type: 'google_pay', brand: 'google_pay' },
  ],
  
  supportTickets: [
    {
      id: 'ticket1',
      userId: 'customer1',
      orderId: 'order1',
      subject: 'Package not delivered',
      status: 'open',
      priority: 'high',
      createdAt: new Date(),
    },
  ],
};