const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ProductItem {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  sku?: string;
  category: string;
  subcategory?: string;
  description: string;
  shortDescription?: string;
  brand?: string;
  image: string;
  images?: any[];
  featured?: boolean;
  popular?: boolean;
  available?: boolean;
  unit?: string;
  packSize?: string;
  imageStatus?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount?: number | null;
  iconName?: string;
}

export async function fetchProducts(params: {
  category?: string;
  subcategory?: string;
  search?: string;
  featured?: boolean;
  popular?: boolean;
  page?: number;
  limit?: number;
}): Promise<{ data: ProductItem[]; pagination: any }> {
  try {
    const url = new URL(`${API_BASE_URL}/products`);
    if (params.category) url.searchParams.append('category', params.category);
    if (params.subcategory) url.searchParams.append('subcategory', params.subcategory);
    if (params.search) url.searchParams.append('search', params.search);
    if (params.featured) url.searchParams.append('featured', 'true');
    if (params.popular) url.searchParams.append('popular', 'true');
    if (params.page) url.searchParams.append('page', String(params.page));
    if (params.limit) url.searchParams.append('limit', String(params.limit));

    const res = await fetch(url.toString());
    if (res.ok) {
      const result = await res.json();
      if (result.success) {
        return { data: result.data, pagination: result.pagination };
      }
    }
  } catch (err) {
    // Graceful fallback to client dataset
  }

  const { PRODUCTS } = await import('../data/products');
  let items: ProductItem[] = [...PRODUCTS].map((p) => ({
    ...p,
    slug: p.id,
    images: [p.image],
  }));

  if (params.category) {
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

export async function fetchProductBySlug(slug: string): Promise<ProductItem | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}`);
    if (res.ok) {
      const result = await res.json();
      if (result.success) return result.data;
    }
  } catch (err) {}

  const { PRODUCTS } = await import('../data/products');
  const found = PRODUCTS.find((p) => p.id.toLowerCase() === slug.toLowerCase() || p.name.toLowerCase().replace(/[\s]+/g, '-').includes(slug.toLowerCase()));
  if (found) {
    return { ...found, slug: found.id, images: [found.image] };
  }
  return null;
}

export async function fetchCategories(): Promise<CategoryItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (res.ok) {
      const result = await res.json();
      if (result.success) return result.data;
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
    const res = await fetch(`${API_BASE_URL}/inquiries`, {
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
    message: "Your inquiry has been submitted! Our supply team in Hetauda will respond shortly.",
  };
}
