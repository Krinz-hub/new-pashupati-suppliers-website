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
