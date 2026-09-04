import { useState, useEffect, useCallback } from 'react';
import { BlogPost } from '../types';
import { blogService } from '../services/blogService';

export function useBlogs(initialFilters: { status?: 'all' | 'published' | 'draft'; category?: string; search?: string } = {}) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async (filters = initialFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await blogService.getBlogs(filters);
      setBlogs(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(initialFilters)]);

  useEffect(() => {
    fetchBlogs(initialFilters);
  }, [fetchBlogs]);

  return { blogs, loading, error, refetch: fetchBlogs };
}
