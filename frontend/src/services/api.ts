import axios, { AxiosInstance, AxiosError } from 'axios';

// Get API base URL based on environment
const getApiBaseUrl = () => {
  // In production, VITE_API_URL should be set to the backend URL
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    // If the env URL doesn't include /api, we need to use it as-is
    // because our routes are already prefixed with /api
    return envUrl;
  }
  // Use relative path to leverage Vite's proxy in development
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle 401 errors
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(email: string, password: string, name: string) {
    const response = await this.api.post('/auth/register', { email, password, name });
    return response.data;
  }

  async login(email: string, password: string) {
    const response = await this.api.post('/auth/login', { email, password });
    return response.data;
  }

  // Sweet endpoints
  async getSweets() {
    const response = await this.api.get('/sweets');
    return response.data;
  }

  async searchSweets(params: { name?: string; category?: string; minPrice?: number; maxPrice?: number }) {
    const response = await this.api.get('/sweets/search', { params });
    return response.data;
  }

  async createSweet(sweetData: {
    name: string;
    category: string;
    price: number;
    quantity: number;
    description?: string;
    imageUrl?: string;
  }) {
    const response = await this.api.post('/sweets', sweetData);
    return response.data;
  }

  async updateSweet(id: string, sweetData: Partial<{
    name: string;
    category: string;
    price: number;
    quantity: number;
    description?: string;
    imageUrl?: string;
  }>) {
    const response = await this.api.put(`/sweets/${id}`, sweetData);
    return response.data;
  }

  async deleteSweet(id: string) {
    const response = await this.api.delete(`/sweets/${id}`);
    return response.data;
  }

  async purchaseSweet(id: string, quantity: number) {
    const response = await this.api.post(`/sweets/${id}/purchase`, { quantity });
    return response.data;
  }

  async restockSweet(id: string, quantity: number) {
    const response = await this.api.post(`/sweets/${id}/restock`, { quantity });
    return response.data;
  }
}

export const apiService = new ApiService();
