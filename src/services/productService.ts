import { apiClient } from './apiClient';
import { Product, ProductFormData } from '../types';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';

export interface ProductFilters {
  category?: string;
  search?: string;
  status?: 'all' | 'published' | 'draft';
  featured?: boolean;
}

export const productService = {
  async getProducts(filters: ProductFilters = {}): Promise<Product[]> {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'all') {
      params.append('category', filters.category);
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    if (filters.status) {
      params.append('status', filters.status);
    }
    if (filters.featured) {
      params.append('featured', 'true');
    }

    const query = params.toString() ? `?${params.toString()}` : '';
    const { data, error } = await apiClient.request<any>(`/api/products${query}`);

    const rawList: Product[] | null = Array.isArray(data?.products)
      ? data.products
      : Array.isArray(data?.data)
      ? data.data
      : null;

    if (error || !rawList) {
      // Apply filters on fallback data only on network error
      let filtered = [...DEFAULT_PRODUCTS];
      if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter((p) => p.category.toLowerCase() === filters.category!.toLowerCase());
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );
      }
      if (filters.featured) {
        filtered = filtered.filter((p) => p.featured);
      }
      return filtered;
    }

    return rawList;
  },

  async getProduct(idOrSlug: string): Promise<Product | null> {
    const { data, error } = await apiClient.request<any>(`/api/products/${idOrSlug}`);
    const product: Product | null = data?.product || data?.data || null;
    if (error || !product) {
      const fallback = DEFAULT_PRODUCTS.find(
        (p) => p.id === idOrSlug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === idOrSlug
      );
      return fallback || null;
    }
    return product;
  },

  async createProduct(formData: ProductFormData): Promise<{ success: boolean; id?: string; error?: string }> {
    const { data, error } = await apiClient.request<{ id: string; message: string }>('/api/products', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (error || !data) {
      return { success: false, error: error || 'Failed to create product' };
    }
    return { success: true, id: data.id };
  },

  async updateProduct(id: string, formData: Partial<ProductFormData>): Promise<{ success: boolean; error?: string }> {
    const { error } = await apiClient.request(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
    });

    if (error) {
      return { success: false, error };
    }
    return { success: true };
  },

  async deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await apiClient.request(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (error) {
      return { success: false, error };
    }
    return { success: true };
  },
};
