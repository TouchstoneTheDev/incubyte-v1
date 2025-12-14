import { create } from 'zustand';
import { apiService } from '../services/api';

export interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface SweetState {
  sweets: Sweet[];
  loading: boolean;
  error: string | null;
  fetchSweets: () => Promise<void>;
  searchSweets: (params: { name?: string; category?: string; minPrice?: number; maxPrice?: number }) => Promise<void>;
  createSweet: (sweetData: Omit<Sweet, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateSweet: (id: string, sweetData: Partial<Sweet>) => Promise<void>;
  deleteSweet: (id: string) => Promise<void>;
  purchaseSweet: (id: string, quantity: number) => Promise<void>;
  restockSweet: (id: string, quantity: number) => Promise<void>;
}

export const useSweetStore = create<SweetState>((set) => ({
  sweets: [],
  loading: false,
  error: null,

  fetchSweets: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiService.getSweets();
      set({ sweets: data.sweets, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Failed to fetch sweets', loading: false });
    }
  },

  searchSweets: async (params) => {
    set({ loading: true, error: null });
    try {
      const data = await apiService.searchSweets(params);
      set({ sweets: data.sweets, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Failed to search sweets', loading: false });
    }
  },

  createSweet: async (sweetData) => {
    set({ loading: true, error: null });
    try {
      await apiService.createSweet(sweetData);
      // Refresh the list
      const data = await apiService.getSweets();
      set({ sweets: data.sweets, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Failed to create sweet', loading: false });
      throw error;
    }
  },

  updateSweet: async (id, sweetData) => {
    set({ loading: true, error: null });
    try {
      await apiService.updateSweet(id, sweetData);
      // Refresh the list
      const data = await apiService.getSweets();
      set({ sweets: data.sweets, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Failed to update sweet', loading: false });
      throw error;
    }
  },

  deleteSweet: async (id) => {
    set({ loading: true, error: null });
    try {
      await apiService.deleteSweet(id);
      // Remove from state
      set((state) => ({
        sweets: state.sweets.filter((s) => s.id !== id),
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Failed to delete sweet', loading: false });
      throw error;
    }
  },

  purchaseSweet: async (id, quantity) => {
    set({ loading: true, error: null });
    try {
      await apiService.purchaseSweet(id, quantity);
      // Refresh the list
      const data = await apiService.getSweets();
      set({ sweets: data.sweets, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Failed to purchase sweet', loading: false });
      throw error;
    }
  },

  restockSweet: async (id, quantity) => {
    set({ loading: true, error: null });
    try {
      await apiService.restockSweet(id, quantity);
      // Refresh the list
      const data = await apiService.getSweets();
      set({ sweets: data.sweets, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Failed to restock sweet', loading: false });
      throw error;
    }
  },
}));
