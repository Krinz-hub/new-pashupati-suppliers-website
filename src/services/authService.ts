import { apiClient } from './apiClient';
import { AdminUser, AuthResponse } from '../types';

export const authService = {
  async checkSetupStatus(): Promise<boolean> {
    const { data } = await apiClient.request<{ isSetup: boolean }>('/api/auth/setup-status');
    return data?.isSetup ?? true;
  },

  async setupInitialAdmin(data: { name: string; email: string; password: string }): Promise<{ success: boolean; error?: string; user?: AdminUser }> {
    const { data: res, error } = await apiClient.request<AuthResponse>('/api/auth/setup', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (error || !res) {
      return { success: false, error: error || 'Failed to setup admin' };
    }

    apiClient.setToken(res.token);
    apiClient.setUser(res.user);
    return { success: true, user: res.user };
  },

  async login(credentials: { email: string; password: string }): Promise<{ success: boolean; error?: string; user?: AdminUser }> {
    const { data, error } = await apiClient.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (error || !data) {
      return { success: false, error: error || 'Invalid email or password' };
    }

    apiClient.setToken(data.token);
    apiClient.setUser(data.user);
    return { success: true, user: data.user };
  },

  async getCurrentUser(): Promise<AdminUser | null> {
    const { data } = await apiClient.request<{ user: AdminUser }>('/api/auth/me');
    if (data?.user) {
      apiClient.setUser(data.user);
      return data.user;
    }
    return null;
  },

  async updatePassword(payload: { currentPassword: string; newPassword: string }): Promise<{ success: boolean; error?: string }> {
    const { error } = await apiClient.request('/api/auth/password', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });

    if (error) {
      return { success: false, error };
    }
    return { success: true };
  },

  logout() {
    apiClient.clearToken();
  },

  isAuthenticated(): boolean {
    return !!apiClient.getToken();
  },
};
