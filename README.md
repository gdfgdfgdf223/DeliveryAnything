# DeliverBag - On-Demand Delivery Platform

A comprehensive React Native delivery platform that transforms the traditional cab booking model into an "deliver anything that fits in a bag" service. Built with Expo Router and designed for production deployment.

## 🚀 Features

### Customer App
- **Easy Delivery Creation**: Intuitive interface for setting pickup/dropoff locations
- **Real-time Tracking**: Live map showing courier location and delivery progress
- **Secure Payments**: Multiple payment options with Stripe integration
- **Order History**: Complete order management with ratings and re-ordering
- **Proof of Delivery**: Photo and signature confirmation for peace of mind

### Courier App
- **Job Management**: Accept/decline delivery requests with earnings preview
- **Turn-by-turn Navigation**: Integrated maps for efficient routing
- **Earnings Dashboard**: Real-time earnings tracking with instant cashouts
- **Proof Collection**: Pickup verification and delivery confirmation tools
- **Zone Management**: Service area configuration and demand heatmaps

### Admin Dashboard
- **Live Operations**: Real-time map showing all active deliveries and couriers
- **User Management**: CRUD operations for customers and couriers
- **Analytics**: Comprehensive reporting with CSV exports
- **Pricing Control**: Dynamic pricing rules with surge and zone-based adjustments
- **Dispute Resolution**: Built-in support chat and issue management

## 🏗️ Architecture

### Frontend
- **React Native** with Expo Router for navigation
- **TypeScript** for type safety
- **Zustand** for state management
- **React Hook Form** for form handling
- **Expo Location** for GPS tracking
- **Expo Camera** for photo capture

### Backend Integration
- **Firebase** compatibility maintained from original template
- **Repository pattern** for easy backend swapping
- **Real-time updates** via WebSocket/Firebase Realtime Database
- **Stripe Connect** for courier payouts

### Key Services
- `AuthService`: User authentication and profile management
- `DeliveryService`: Order creation, tracking, and management
- `PermissionManager`: Device permissions handling
- `GeocodingService`: Address validation and coordinate conversion

## 📱 Apps Structure

```
app/
├── index.tsx                 # App selector/welcome screen
├── (customer)/              # Customer mobile app
│   ├── index.tsx           # Home screen with delivery creation
│   ├── orders.tsx          # Order history and tracking
│   └── profile.tsx         # Customer profile and settings
├── (courier)/              # Courier mobile app
│   ├── index.tsx           # Job list and current delivery
│   ├── earnings.tsx        # Earnings dashboard and history
│   └── profile.tsx         # Courier profile and vehicle info
└── (admin)/                # Admin web dashboard
    └── dashboard.tsx       # Operations dashboard
```

## 🎨 Design System

### Color Palette
- **Primary**: #2563EB (Blue) - Main brand color
- **Secondary**: #059669 (Green) - Success states and courier actions
- **Accent**: #EA580C (Orange) - Call-to-action elements
- **Error**: #DC2626 (Red) - Error states and warnings
- **Gray Scale**: 50-900 for neutral elements

### Typography
- **Font Family**: Inter (via expo-google-fonts)
- **Hierarchy**: 12px to 36px with proper line heights
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Spacing System
- **Base Unit**: 4px
- **Scale**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
- **Consistent margins and padding** throughout the app

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator or Android Emulator
- Stripe account for payments (optional for development)

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
Create a `.env` file with:
```
EXPO_PUBLIC_API_URL=your_api_url
EXPO_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### Firebase Setup (Optional)
1. Create a Firebase project
2. Enable Authentication, Firestore, and Realtime Database
3. Add your configuration to the project
4. Update the service layer to use Firebase instead of mock data

## 📦 Deployment

### Mobile Apps
```bash
# Build for production
npx expo build:ios
npx expo build:android

# Or use EAS Build
npx eas build --platform all
```

### Admin Dashboard
The admin dashboard is built as a responsive web app that can be deployed to any static hosting service or integrated into a larger web application.

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Testing
- Customer journey: Create delivery → Track → Complete
- Courier journey: Accept job → Navigate → Deliver → Collect payment
- Admin operations: Monitor deliveries → Manage disputes → Generate reports

## 🌐 Internationalization

Supports multiple languages:
- **English** (default)
- **Portuguese (Brazil)**
- **Dutch (Netherlands)**

Language switching available in user profiles with automatic system language detection.

## 🔒 Security & Compliance

### GDPR Compliance
- **Data Export**: Users can download their complete data
- **Data Deletion**: Account deletion removes all personal information
- **Audit Logging**: All data access and modifications are logged
- **Consent Management**: Clear privacy controls and preferences

### Security Features
- **End-to-end encryption** for sensitive data
- **Secure photo storage** with automatic expiration
- **Payment tokenization** via Stripe
- **Location data anonymization** after delivery completion

## 📊 Analytics & Monitoring

### Key Metrics
- **Delivery Success Rate**: Percentage of successful deliveries
- **Average Delivery Time**: From pickup to dropoff
- **Courier Utilization**: Active time vs. online time
- **Customer Satisfaction**: Rating and review analytics
- **Revenue Metrics**: Gross revenue, fees, and courier earnings

### Performance Monitoring
- **Real-time error tracking**
- **API response time monitoring**
- **Crash reporting and analysis**
- **User behavior analytics**

## 🛠️ Development Roadmap

### Phase 1 (MVP) ✅
- Core delivery creation and tracking
- Basic courier assignment
- Simple payment processing
- Admin dashboard fundamentals

### Phase 2 (Enhanced Features)
- Advanced route optimization
- Surge pricing algorithms
- Push notification system
- Enhanced analytics dashboard

### Phase 3 (Scale & Optimize)
- Machine learning for demand prediction
- Advanced fraud detection
- Multi-tenant architecture
- Enterprise features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For technical support or feature requests:
- Email: support@deliverbag.com
- Documentation: https://docs.deliverbag.com
- Community: https://community.deliverbag.com

---

Built with ❤️ using React Native and Expo