export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number | null;
  iconName?: string;
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
