export interface Product {
  id: string;
  name: string;
  slug?: string;
  sku?: string;
  category: string;
  categoryId?: string;
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
  sortOrder?: number;
  status?: 'draft' | 'published';
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  altText?: string;
  sortOrder?: number;
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number | null;
  iconName?: string;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  categoryId?: string;
  categoryName?: string;
  categorySlug?: string;
  authorName?: string;
  status: 'draft' | 'published';
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MediaItem {
  id: string;
  fileName: string;
  url: string;
  altText?: string;
  fileType: string;
  fileSize: number;
  createdAt?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: AdminUser;
  token: string;
}

export interface ProductFormData {
  name: string;
  slug: string;
  category: string;
  categoryId?: string;
  description: string;
  shortDescription?: string;
  image: string;
  featured: boolean;
  status: 'draft' | 'published';
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  categoryId: string;
  status: 'draft' | 'published';
  seoTitle?: string;
  seoDescription?: string;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  image: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "store" | "products" | "wholesale";
  image: string;
  alt: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  location: string;
  generalLocation: string;
  phone: string;
  phones: string[];
  phoneSecondary?: string;
  whatsapp: string;
  whatsapps: string[];
  whatsappSecondary?: string;
  email: string;
  address: string;
  phoneLink: string;
  phoneSecondaryLink?: string;
  whatsappLink: string;
  whatsappSecondaryLink?: string;
  emailLink: string;
  mapsEmbedUrl: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  social: {
    facebook: string;
    instagram: string;
    whatsapp: string;
  };
  stats: {
    products: string;
    customers: string;
    experienceYears: string;
    partners: string;
  };
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  message?: string;
}

export type LogoVariant = "default" | "light" | "compact";

export type ButtonVariant = "primary" | "secondary" | "outline" | "dark" | "ghost";

