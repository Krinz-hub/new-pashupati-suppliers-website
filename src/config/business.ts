import { BusinessConfig } from '../types';
import { formatPhoneHref, formatMailtoHref, formatWhatsAppHref } from '../utils/helpers';

const businessName = import.meta.env.VITE_BUSINESS_NAME || "New Pashupati Suppliers";
const businessTagline = import.meta.env.VITE_BUSINESS_TAGLINE || "Your Trusted Supply Partner";
const businessLocation = import.meta.env.VITE_BUSINESS_LOCATION || "Hetauda-2, Palpasa Road, Makawanpur, Nepal";
const businessGeneralLocation = import.meta.env.VITE_BUSINESS_GENERAL_LOCATION || "Hetauda, Makawanpur, Nepal";
const businessAddress = import.meta.env.VITE_BUSINESS_ADDRESS || "Hetauda-2, Palpasa Road, Makawanpur, Nepal";

const businessPhone = import.meta.env.VITE_BUSINESS_PHONE || "+9779855070435";
const businessPhoneSecondary = import.meta.env.VITE_BUSINESS_PHONE_SECONDARY || "+9779855001105";

const businessWhatsapp = import.meta.env.VITE_BUSINESS_WHATSAPP || "+9779855070435";
const businessWhatsappSecondary = import.meta.env.VITE_BUSINESS_WHATSAPP_SECONDARY || "+9779855001105";

const businessEmail = import.meta.env.VITE_BUSINESS_EMAIL || "dknsakr2005@gmail.com";
const mapsEmbedUrl = import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.146273594872!2d85.03103647595997!3d27.433551776340618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb4916d667abb5%3A0x2abe14462d7b457c!2sNew%20pashupati%20supplies!5e0!3m2!1sen!2snp!4v1787312678190!5m2!1sen!2snp";
const facebookUrl = import.meta.env.VITE_FACEBOOK_URL || "https://facebook.com";
const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL || "https://instagram.com";

const phonesList = [businessPhone, businessPhoneSecondary].filter(Boolean);
const whatsappsList = [businessWhatsapp, businessWhatsappSecondary].filter(Boolean);

export const BUSINESS: BusinessConfig = {
  name: businessName,
  tagline: businessTagline,
  location: businessLocation,
  generalLocation: businessGeneralLocation,
  address: businessAddress,
  phone: businessPhone,
  phones: phonesList,
  phoneSecondary: businessPhoneSecondary,
  whatsapp: businessWhatsapp,
  whatsapps: whatsappsList,
  whatsappSecondary: businessWhatsappSecondary,
  email: businessEmail,
  phoneLink: formatPhoneHref(businessPhone),
  phoneSecondaryLink: businessPhoneSecondary ? formatPhoneHref(businessPhoneSecondary) : undefined,
  whatsappLink: formatWhatsAppHref(businessWhatsapp, "Hello, I would like to know more about your products."),
  whatsappSecondaryLink: businessWhatsappSecondary ? formatWhatsAppHref(businessWhatsappSecondary, "Hello, I would like to know more about your products.") : undefined,
  emailLink: formatMailtoHref(businessEmail),
  mapsEmbedUrl: mapsEmbedUrl,
  hours: {
    weekdays: "9:00 AM – 6:00 PM",
    saturday: "9:00 AM – 6:00 PM",
    sunday: "Closed",
  },
  social: {
    facebook: facebookUrl,
    instagram: instagramUrl,
    whatsapp: formatWhatsAppHref(businessWhatsapp, "Hello, I would like to know more about your products."),
  },
  stats: {
    products: "5000+",
    customers: "1000+",
    experienceYears: "10+",
    partners: "50+",
  },
};
