import { apiClient } from './apiClient';
import { MediaItem } from '../types';

export const mediaService = {
  async getMedia(): Promise<MediaItem[]> {
    const { data, error } = await apiClient.request<{ media: MediaItem[] }>('/api/media');
    if (error || !data?.media) {
      return [];
    }
    return data.media;
  },

  async uploadMedia(file: File, altText?: string): Promise<{ success: boolean; media?: MediaItem; error?: string }> {
    const formData = new FormData();
    formData.append('file', file);
    if (altText) formData.append('altText', altText);

    const { data, error } = await apiClient.request<{ media: MediaItem; message: string }>('/api/media/upload', {
      method: 'POST',
      body: formData,
    });

    if (error || !data?.media) {
      return { success: false, error: error || 'Failed to upload media' };
    }
    return { success: true, media: data.media };
  },

  async uploadDataUrl(fileName: string, dataUrl: string, altText?: string): Promise<{ success: boolean; media?: MediaItem; error?: string }> {
    const { data, error } = await apiClient.request<{ media: MediaItem; message: string }>('/api/media/upload', {
      method: 'POST',
      body: JSON.stringify({
        fileName,
        dataUrl,
        altText,
        fileType: 'image/jpeg',
      }),
    });

    if (error || !data?.media) {
      return { success: false, error: error || 'Failed to upload image' };
    }
    return { success: true, media: data.media };
  },

  async deleteMedia(id: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await apiClient.request(`/api/media/${id}`, {
      method: 'DELETE',
    });

    if (error) {
      return { success: false, error };
    }
    return { success: true };
  },
};
