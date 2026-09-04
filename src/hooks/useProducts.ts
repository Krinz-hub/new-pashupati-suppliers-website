import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { productService, ProductFilters } from '../services/productService';

export function useProducts(initialFilters: ProductFilters = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (filters: ProductFilters = initialFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts(filters);
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(initialFilters)]);

  useEffect(() => {
    fetchProducts(initialFilters);
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}
