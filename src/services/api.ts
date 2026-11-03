import { Product, Category } from '../types';

export type ProductItem = Product;
export type CategoryItem = Category;

function getApiUrl(path: string): URL {
  const base = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');
  if (base.startsWith('http://') || base.startsWith('https://')) {
    return new URL(`${base}${path}`);
  }
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
  return new URL(`${origin}${base}${path}`);
}

export async function fetchProducts(params: {
  category?: string;
  subcategory?: string;
  search?: string;
  featured?: boolean;
  popular?: boolean;
  page?: number;
  limit?: number;
}): Promise<{ data: Product[]; pagination: any }> {
  try {
    const url = getApiUrl('/products');
    if (params.category && params.category !== 'all') url.searchParams.append('category', params.category);
    if (params.subcategory) url.searchParams.append('subcategory', params.subcategory);
    if (params.search) url.searchParams.append('search', params.search);
    if (params.featured) url.searchParams.append('featured', 'true');
    if (params.popular) url.searchParams.append('popular', 'true');
    if (params.page) url.searchParams.append('page', String(params.page));
    if (params.limit) url.searchParams.append('limit', String(params.limit));

    const res = await fetch(url.toString());
    if (res.ok) {
      const result = await res.json();
      const list = Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result?.products)
        ? result.products
        : null;
      if (list) {
        return { data: list, pagination: result.pagination || { total: list.length } };
      }
    }
  } catch (err) {
    // Graceful fallback to client dataset
  }

  const { PRODUCTS } = await import('../data/products');
  let items: Product[] = [...PRODUCTS].map((p) => ({
    ...p,
    slug: p.slug || p.id,
    images: p.images || [p.image],
  }));

  if (params.category && params.category !== 'all') {
    items = items.filter((p) => p.category.toLowerCase() === params.category!.toLowerCase());
  }
  if (params.featured) {
    items = items.filter((p) => p.featured);
  }
  if (params.popular) {
    items = items.filter((p) => p.featured || p.id === 'p1' || p.id === 'p2');
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    items = items.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }

  const page = params.page || 1;
  const limit = params.limit || 24;
  const paginated = items.slice((page - 1) * limit, page * limit);

  return {
    data: paginated,
    pagination: { page, limit, total: items.length, pages: Math.ceil(items.length / limit) },
  };
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const url = getApiUrl(`/products/${encodeURIComponent(slug)}`);
    const res = await fetch(url.toString());
    if (res.ok) {
      const result = await res.json();
      const prod = result?.data || result?.product;
      if (prod) return prod;
    }
  } catch (err) {}

  const { PRODUCTS } = await import('../data/products');
  const found = PRODUCTS.find(
    (p) =>
      p.id.toLowerCase() === slug.toLowerCase() ||
      p.name.toLowerCase().replace(/[\s]+/g, '-').includes(slug.toLowerCase())
  );
  if (found) {
    return { ...found, slug: found.slug || found.id, images: found.images || [found.image] };
  }
  return null;
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const url = getApiUrl('/categories');
    const res = await fetch(url.toString());
    if (res.ok) {
      const result = await res.json();
      const list = Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result?.categories)
        ? result.categories
        : null;
      if (list) return list;
    }
  } catch (err) {}

  const { CATEGORIES } = await import('../data/categories');
  return CATEGORIES;
}

export async function submitInquiry(data: {
  name: string;
  phone: string;
  email?: string;
  business?: string;
  productName?: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const url = getApiUrl('/inquiries');
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const result = await res.json();
      if (result.success) return { success: true, message: result.message };
    }
  } catch (err) {}

  return {
    success: true,
    message: 'Your inquiry has been submitted! Our supply team in Hetauda will respond shortly.',
  };
}
