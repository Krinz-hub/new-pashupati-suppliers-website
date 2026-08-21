/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1F3A',
          dark: '#07182D',
          light: '#132B4D',
        },
        brandRed: {
          DEFAULT: '#F23822',
          hover: '#D92A18',
        },
        brandOrange: {
          DEFAULT: '#FF5533',
        },
        brandBg: '#F7F8FA',
        brandSurface: '#FFFFFF',
        brandText: {
          DEFAULT: '#172033',
          muted: '#667085',
          subtle: '#98A2B3',
        },
        brandBorder: {
          DEFAULT: '#E5E7EB',
          strong: '#D0D5DD',
        },
        brandSuccess: {
          DEFAULT: '#16A34A',
          light: '#DCFCE7',
        },
        brandError: {
          DEFAULT: '#DC2626',
          light: '#FEE2E2',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px 0 rgba(11, 31, 58, 0.05)',
        'soft-md': '0 4px 16px -2px rgba(11, 31, 58, 0.06), 0 2px 6px -1px rgba(11, 31, 58, 0.03)',
        'soft-lg': '0 12px 28px -4px rgba(11, 31, 58, 0.08), 0 4px 12px -2px rgba(11, 31, 58, 0.04)',
        'soft-xl': '0 20px 36px -6px rgba(11, 31, 58, 0.12), 0 8px 16px -4px rgba(11, 31, 58, 0.06)',
      },
      borderRadius: {
        'card': '16px',
        'btn': '10px',
        'img': '20px',
      },
      maxWidth: {
        'container': '1280px',
      }
    },
  },
  plugins: [],
}
