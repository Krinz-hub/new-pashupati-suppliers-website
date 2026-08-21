/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUSINESS_NAME?: string;
  readonly VITE_BUSINESS_TAGLINE?: string;
  readonly VITE_BUSINESS_LOCATION?: string;
  readonly VITE_BUSINESS_GENERAL_LOCATION?: string;
  readonly VITE_BUSINESS_ADDRESS?: string;
  readonly VITE_BUSINESS_PHONE?: string;
  readonly VITE_BUSINESS_PHONE_SECONDARY?: string;
  readonly VITE_BUSINESS_WHATSAPP?: string;
  readonly VITE_BUSINESS_WHATSAPP_SECONDARY?: string;
  readonly VITE_BUSINESS_EMAIL?: string;
  readonly VITE_GOOGLE_MAPS_EMBED_URL?: string;
  readonly VITE_CONTACT_API_URL?: string;
  readonly VITE_FACEBOOK_URL?: string;
  readonly VITE_INSTAGRAM_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
