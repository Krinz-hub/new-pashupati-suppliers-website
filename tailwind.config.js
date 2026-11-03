/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F58220',
          hover: '#E97516',
          light: '#FFF4EB',
        },
        secondary: {
          DEFAULT: '#13984B',
          light: '#EBF7EE',
        },
        tertiary: {
          DEFAULT: '#F08080',
          light: '#FEECEC',
        },
        navy: {
          DEFAULT: '#09132F',
          dark: '#050B1A',
          light: '#132147',
        },
        surface: {
          DEFAULT: '#F8F8F9',
          muted: '#F1F0F6',
        },
        // Keep brand aliases for full backwards compatibility
        brandRed: {
          DEFAULT: '#F58220',
          hover: '#E97516',
          light: '#FFF4EB',
        },
        brandOrange: {
          DEFAULT: '#F58220',
        },
        brandBg: '#FFFFFF',
        brandSurface: '#F8F8F9',
        brandText: {
          DEFAULT: '#171717',
          muted: '#777777',
          subtle: '#9CA3AF',
        },
        brandBorder: {
          DEFAULT: '#EEEEF0',
          strong: '#DCDCDE',
        },
        brandSuccess: {
          DEFAULT: '#13984B',
          light: '#EBF7EE',
        },
        brandError: {
          DEFAULT: '#DC2626',
          light: '#FEE2E2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft-xs': '0 1px 2px 0 rgba(9, 19, 47, 0.04)',
        'soft-sm': '0 1px 3px 0 rgba(9, 19, 47, 0.05)',
        'soft-md': '0 4px 16px -2px rgba(9, 19, 47, 0.06), 0 2px 6px -1px rgba(9, 19, 47, 0.03)',
        'soft-lg': '0 12px 28px -4px rgba(9, 19, 47, 0.08), 0 4px 12px -2px rgba(9, 19, 47, 0.04)',
      },
      borderRadius: {
        'card': '16px',
        'section': '14px',
        'button': '24px',
        'btn': '24px',
        'img': '16px',
      },
      maxWidth: {
        'container': '1240px',
      },
      transitionDuration: {
        'interaction': '180ms',
      },
    },
  },
  plugins: [],
}
