/**
 * Combine multiple class strings cleanly
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format clean phone link for href="tel:..."
 */
export function formatPhoneHref(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, '')}`;
}

/**
 * Format mailto link
 */
export function formatMailtoHref(email: string, subject?: string): string {
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}

/**
 * Format WhatsApp chat link with optional prefilled message
 */
export function formatWhatsAppHref(phone: string, text?: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const message = text || 'Hello, I would like to know more about your products.';
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Update document head title for SEO
 */
export function setPageTitle(title: string): void {
  const brandSuffix = "New Pashupati Suppliers";
  if (title.includes(brandSuffix)) {
    document.title = title;
  } else {
    document.title = `${title} | ${brandSuffix}`;
  }
}

/**
 * Wishlist storage and reactive synchronization
 */
const WISHLIST_KEY = 'nps_wishlist';

export function getWishlist(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isProductInWishlist(id: string): boolean {
  return getWishlist().includes(id);
}

export function toggleWishlistProduct(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const list = getWishlist();
    const idx = list.indexOf(id);
    const added = idx === -1;
    if (added) {
      list.push(id);
    } else {
      list.splice(idx, 1);
    }
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('wishlist-updated', { detail: { count: list.length, list } }));
    return added;
  } catch {
    return false;
  }
}

/**
 * Unified product catalog filtering
 */
export function filterProducts<T extends { name: string; description: string; category: string; brand?: string; sku?: string; featured?: boolean }>(
  products: T[],
  filters: { category?: string; query?: string; featured?: boolean } = {}
): T[] {
  const { category, query, featured } = filters;
  const q = query?.trim().toLowerCase();
  const cat = category && category !== 'all' ? category.toLowerCase() : null;

  return products.filter((p) => {
    if (cat && p.category.toLowerCase() !== cat && (p as any).categoryId !== cat) {
      return false;
    }
    if (featured && !p.featured) {
      return false;
    }
    if (q) {
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchBrand = p.brand?.toLowerCase().includes(q);
      const matchSku = p.sku?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat && !matchBrand && !matchSku) {
        return false;
      }
    }
    return true;
  });
}
