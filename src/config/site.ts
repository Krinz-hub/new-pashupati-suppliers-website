export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  location: string;
  generalLocation: string;
  address: string;
  contact: {
    phone: string;
    phoneSecondary: string;
    whatsapp: string;
    whatsappSecondary: string;
    email: string;
  };
  mapUrl: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  social: {
    facebook: string;
    instagram: string;
    tiktok?: string;
  };
  branding: {
    logo: string;
    logoLight: string;
    logoDark: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    highlightText: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    image: string;
  };
}

export const SITE: SiteConfig = {
  name: "New Pashupati Suppliers",
  shortName: "New Pashupati",
  tagline: "Wholesale & Retail Supply Partner",
  description:
    "Nepal's trusted supplier of quality kitchenware, household goods, plastics, electricals, cleaning tools, and general utility supplies in Hetauda.",
  location: "Hetauda-2, Palpasa Road, Makawanpur, Nepal",
  generalLocation: "Hetauda, Makawanpur, Nepal",
  address: "Hetauda-2, Palpasa Road, Makawanpur, Nepal",

  contact: {
    phone: "+9779855070435",
    phoneSecondary: "+9779855001105",
    whatsapp: "+9779855070435",
    whatsappSecondary: "+9779855001105",
    email: "dknsakr2005@gmail.com",
  },

  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.146273594872!2d85.03103647595997!3d27.433551776340618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb4916d667abb5%3A0x2abe14462d7b457c!2sNew%20pashupati%20supplies!5e0!3m2!1sen!2snp!4v1787312678190!5m2!1sen!2snp",

  hours: {
    weekdays: "9:00 AM – 6:30 PM",
    saturday: "9:00 AM – 6:30 PM",
    sunday: "Closed",
  },

  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },

  branding: {
    logo: "/assets/logo/logo.svg",
    logoLight: "/assets/logo/logo-light.svg",
    logoDark: "/assets/logo/logo-dark.svg",
  },

  hero: {
    eyebrow: "HE TAUDA, NEPAL — WHOLESALE & RETAIL",
    title: "Everyday essentials.",
    highlightText: "One reliable supplier.",
    description:
      "Direct wholesale and retail supply for kitchenware, household utilities, plastic goods, electrical appliances, and cleaning solutions across Makawanpur and beyond.",
    primaryCta: "Browse Product Catalog",
    secondaryCta: "Request Wholesale Quote",
    image: "/assets/banner.png",
  },
};
