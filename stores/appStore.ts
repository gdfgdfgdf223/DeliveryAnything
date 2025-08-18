import { create } from 'zustand';
import type { User, DeliveryOrder, CourierProfile } from '@/types';

interface AppState {
  // Authentication
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Orders
  orders: DeliveryOrder[];
  currentOrder: DeliveryOrder | null;
  
  // Courier
  courierProfile: CourierProfile | null;
  isOnline: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  addOrder: (order: DeliveryOrder) => void;
  updateOrder: (orderId: string, updates: Partial<DeliveryOrder>) => void;
  setCurrentOrder: (order: DeliveryOrder | null) => void;
  setCourierProfile: (profile: CourierProfile | null) => void;
  setOnline: (online: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  orders: [],
  currentOrder: null,
  courierProfile: null,
  isOnline: false,

  // Actions
  setUser: (user) => set({ user }),
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  setLoading: (loading) => set({ isLoading: loading }),
  
  addOrder: (order) => set((state) => ({ 
    orders: [...state.orders, order] 
  })),
  
  updateOrder: (orderId, updates) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === orderId ? { ...order, ...updates } : order
    ),
    currentOrder: state.currentOrder?.id === orderId 
      ? { ...state.currentOrder, ...updates } 
      : state.currentOrder,
  })),
  
  setCurrentOrder: (order) => set({ currentOrder: order }),
  setCourierProfile: (profile) => set({ courierProfile: profile }),
  setOnline: (online) => set({ isOnline: online }),
}));