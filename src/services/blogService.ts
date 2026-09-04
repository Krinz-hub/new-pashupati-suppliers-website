import { apiClient } from './apiClient';
import { BlogPost, BlogFormData } from '../types';

export const blogService = {
  async getBlogs(filters: { status?: 'all' | 'published' | 'draft'; category?: string; search?: string } = {}): Promise<BlogPost[]> {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);

    const query = params.toString() ? `?${params.toString()}` : '';
    const { data, error } = await apiClient.request<{ blogs: BlogPost[] }>(`/api/blogs${query}`);

    if (error || !data?.blogs) {
      return [];
    }
    return data.blogs;
  },

  async getBlog(idOrSlug: string): Promise<BlogPost | null> {
    const { data, error } = await apiClient.request<{ blog: BlogPost }>(`/api/blogs/${idOrSlug}`);
    if (error || !data?.blog) {
      return null;
    }
    return data.blog;
  },

  async createBlog(formData: BlogFormData): Promise<{ success: boolean; id?: string; error?: string }> {
    const { data, error } = await apiClient.request<{ id: string; message: string }>('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (error || !data) {
      return { success: false, error: error || 'Failed to create blog post' };
    }
    return { success: true, id: data.id };
  },

  async updateBlog(id: string, formData: Partial<BlogFormData>): Promise<{ success: boolean; error?: string }> {
    const { error } = await apiClient.request(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
    });

    if (error) {
      return { success: false, error };
    }
    return { success: true };
  },

  async deleteBlog(id: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await apiClient.request(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (error) {
      return { success: false, error };
    }
    return { success: true };
  },
};
