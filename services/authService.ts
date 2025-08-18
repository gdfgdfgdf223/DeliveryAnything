import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '@/types';

export class AuthService {
  private static instance: AuthService;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: '1',
      email,
      phone: '+1234567890',
      name: 'John Doe',
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await AsyncStorage.setItem('auth_token', 'mock_token');
    await AsyncStorage.setItem('user', JSON.stringify(user));
    
    return user;
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
    phone: string;
    role: 'customer' | 'courier';
  }): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      phone: userData.phone,
      name: userData.name,
      role: userData.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await AsyncStorage.setItem('auth_token', 'mock_token');
    await AsyncStorage.setItem('user', JSON.stringify(user));
    
    return user;
  }

  async logout(): Promise<void> {
    await AsyncStorage.multiRemove(['auth_token', 'user']);
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem('user');
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem('auth_token');
    return !!token;
  }

  async sendPasswordReset(email: string): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  async verifyPhone(phone: string, code: string): Promise<boolean> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return code === '123456'; // Mock verification
  }

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    // Simulate API call
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not found');
    }

    const updatedUser = { ...currentUser, ...updates, updatedAt: new Date() };
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    
    return updatedUser;
  }
}

export const authService = AuthService.getInstance();