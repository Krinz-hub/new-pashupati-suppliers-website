/**
 * Centralized Contact API Endpoint Configuration
 * 
 * Loaded from VITE_CONTACT_API_URL environment variable.
 */
export const CONTACT_API_URL: string =
  import.meta.env.VITE_CONTACT_API_URL ||
  "https://script.google.com/macros/s/AKfycbxiah_w1Kz56itkE0UaTRYmwmGamolLP0J8I_Xy7_tTwTmKFhgq9YBintbSLjv7aIjskw/exec";

if (!import.meta.env.VITE_CONTACT_API_URL) {
  console.warn(
    "[Config Warning] VITE_CONTACT_API_URL is not defined in .env. Using fallback endpoint."
  );
}
