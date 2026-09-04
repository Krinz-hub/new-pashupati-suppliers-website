import { apiClient } from './apiClient';
import { Category, CategoryFormData } from '../types';
import { CATEGORIES as DEFAULT_CATEGORIES } from '../data/categories';

export const categoryService = {
  async getAllCategories(): Promise<Category[]> {
    const { data, error } = await apiClient.request<{ categories: Category[] }>('/api/categories');
    if (error || !data || !Array.isArray(data.categories)) {
      return DEFAULT_CATEGORIES;
    }
    return data.categories;
  },

  async getCategory(idOrSlug: string): Promise<Category | null> {
    const { data, error } = await apiClient.request<{ category: Category }>(`/api/categories/${idOrSlug}`);
    if (error || !data?.category) {
      const fallback = DEFAULT_CATEGORIES.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
      return fallback || null;
    }
    return data.category;
  },

  async createCategory(formData: CategoryFormData): Promise<{ success: boolean; category?: Category; error?: string }> {
    const { data, error } = await apiClient.request<{ category: Category }>('/api/categories', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (error || !data?.category) {
      return { success: false, error: error || 'Failed to create category' };
    }
    return { success: true, category: data.category };
  },

  async updateCategory(id: string, formData: Partial<CategoryFormData>): Promise<{ success: boolean; category?: Category; error?: string }> {
    const { data, error } = await apiClient.request<{ category: Category }>(`/api/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
    });

    if (error || !data?.category) {
      return { success: false, error: error || 'Failed to update category' };
    }
    return { success: true, category: data.category };
  },

  async deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await apiClient.request(`/api/categories/${id}`, {
      method: 'DELETE',
    });

    if (error) {
      return { success: false, error };
    }
    return { success: true };
  },
};
