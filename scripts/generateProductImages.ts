import fs from 'fs';
import path from 'path';
import { PRODUCTS as fallbackProducts } from '../src/data/products.js';

function getCategoryTheme(category: string, name: string) {
  const cat = category.toLowerCase();
  const n = name.toLowerCase();

  if (cat === 'kitchen') {
    return {
      bgGrad: ['#1E293B', '#0F172A'],
      accent: '#F23822',
      badgeText: 'KITCHENWARE',
      iconSvg: `
        <ellipse cx="200" cy="160" rx="60" ry="20" fill="#E2E8F0" opacity="0.9" />
        <rect x="140" y="120" width="120" height="40" rx="8" fill="#CBD5E1" />
        <path d="M 140 120 Q 200 90 260 120 Z" fill="#94A3B8" />
        <circle cx="200" cy="95" r="10" fill="#F23822" />
        <rect x="120" y="130" width="20" height="8" rx="4" fill="#64748B" />
        <rect x="260" y="130" width="20" height="8" rx="4" fill="#64748B" />
      `,
    };
  }

  if (cat === 'cleaning') {
    return {
      bgGrad: ['#082F49', '#0369A1'],
      accent: '#06B6D4',
      badgeText: 'CLEANING',
      iconSvg: `
        <path d="M 180 180 L 220 180 L 210 110 L 190 110 Z" fill="#38BDF8" />
        <rect x="195" y="60" width="10" height="50" rx="3" fill="#E0F2FE" />
        <circle cx="170" cy="100" r="4" fill="#06B6D4" />
        <circle cx="230" cy="90" r="6" fill="#38BDF8" opacity="0.8" />
        <circle cx="210" cy="75" r="3" fill="#E0F2FE" />
      `,
    };
  }

  if (cat === 'plastic') {
    return {
      bgGrad: ['#065F46', '#047857'],
      accent: '#10B981',
      badgeText: 'PLASTICWARE',
      iconSvg: `
        <path d="M 160 100 L 240 100 L 225 180 L 175 180 Z" fill="#34D399" />
        <ellipse cx="200" cy="100" rx="40" ry="10" fill="#A7F3D0" />
        <path d="M 150 100 Q 200 60 250 100" stroke="#E11D48" stroke-width="5" fill="none" stroke-linecap="round" />
      `,
    };
  }

  if (cat === 'electrical') {
    return {
      bgGrad: ['#78350F', '#B45309'],
      accent: '#F59E0B',
      badgeText: 'ELECTRICAL',
      iconSvg: `
        <rect x="160" y="100" width="80" height="80" rx="16" fill="#FBBF24" />
        <path d="M 205 110 L 185 145 L 205 145 L 195 170 L 220 135 L 200 135 Z" fill="#78350F" />
      `,
    };
  }

  if (cat === 'storage') {
    return {
      bgGrad: ['#1E1B4B', '#3730A3'],
      accent: '#6366F1',
      badgeText: 'STORAGE',
      iconSvg: `
        <rect x="165" y="100" width="70" height="90" rx="12" fill="#818CF8" />
        <rect x="175" y="80" width="50" height="20" rx="6" fill="#C7D2FE" />
        <rect x="185" y="65" width="30" height="15" rx="4" fill="#EEF2FF" />
      `,
    };
  }

  if (cat === 'household') {
    if (n.includes('metal box')) {
      return {
        bgGrad: ['#334155', '#1E293B'],
        accent: '#94A3B8',
        badgeText: 'STEEL TRUNK',
        iconSvg: `
          <rect x="130" y="110" width="140" height="70" rx="6" fill="#CBD5E1" stroke="#475467" stroke-width="3" />
          <line x1="130" y1="130" x2="270" y2="130" stroke="#475467" stroke-width="3" />
          <rect x="185" y="125" width="30" height="18" rx="3" fill="#F23822" />
        `,
      };
    }
    return {
      bgGrad: ['#334155', '#0F172A'],
      accent: '#F23822',
      badgeText: 'HOUSEHOLD',
      iconSvg: `
        <rect x="150" y="90" width="100" height="90" rx="12" fill="#94A3B8" />
        <path d="M 150 90 L 200 60 L 250 90 Z" fill="#F23822" />
      `,
    };
  }

  return {
    bgGrad: ['#111827', '#1F2937'],
    accent: '#F23822',
    badgeText: 'GENERAL UTILITY',
    iconSvg: `
      <rect x="155" y="95" width="90" height="85" rx="10" fill="#6B7280" />
      <polygon points="200,75 240,95 160,95" fill="#F23822" />
    `,
  };
}

function generateSvgPlaceholder(name: string, category: string): string {
  const theme = getCategoryTheme(category, name);
  const nameSafe = name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${theme.bgGrad[0]}" />
      <stop offset="100%" stop-color="${theme.bgGrad[1]}" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#0F172A" flood-opacity="0.18" />
    </filter>
  </defs>

  <!-- Studio Background -->
  <rect width="600" height="450" fill="url(#bgGrad)" />
  <ellipse cx="300" cy="390" rx="230" ry="24" fill="#CBD5E1" opacity="0.5" filter="blur(10px)" />

  <!-- Central Product Card Container -->
  <g transform="translate(90, 45)" filter="url(#shadow)">
    <rect width="420" height="310" rx="20" fill="url(#cardGrad)" />

    <!-- Grid lines -->
    <line x1="0" y1="80" x2="420" y2="80" stroke="#FFFFFF" stroke-opacity="0.06" stroke-dasharray="4,4" />
    <line x1="0" y1="160" x2="420" y2="160" stroke="#FFFFFF" stroke-opacity="0.06" stroke-dasharray="4,4" />
    <line x1="0" y1="240" x2="420" y2="240" stroke="#FFFFFF" stroke-opacity="0.06" stroke-dasharray="4,4" />

    <!-- Badge -->
    <rect x="24" y="24" width="130" height="26" rx="13" fill="${theme.accent}" />
    <text x="89" y="41" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1.5">${theme.badgeText}</text>

    <!-- Custom Category Icon Graphic -->
    <g transform="translate(10, 10)">
      ${theme.iconSvg}
    </g>

    <!-- Text Information -->
    <text x="210" y="228" font-family="system-ui, sans-serif" font-size="17" font-weight="800" fill="#FFFFFF" text-anchor="middle">${nameSafe}</text>
    <text x="210" y="255" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#94A3B8" text-anchor="middle">NEW PASHUPATI SUPPLIERS • HETAUDA</text>
  </g>
</svg>`;
}

async function runImageGenerator() {
  console.log('--------------------------------------------------');
  console.log('NEW PASHUPATI SUPPLIERS — PRODUCT IMAGE PIPELINE');
  console.log('--------------------------------------------------');

  const productsToProcess = fallbackProducts.map((p) => ({
    name: p.name,
    slug: p.id,
    category: p.category,
    image: p.image,
  }));

  console.log(`Products in Catalog: ${productsToProcess.length}`);

  let generatedCount = 0;

  for (const prod of productsToProcess) {
    const categoryDir = path.resolve(process.cwd(), `public/assets/products/${prod.category}`);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    const svgPath = path.join(categoryDir, `${prod.slug}.svg`);

    // Write SVG catalog visual graphic with custom category icon
    const svgContent = generateSvgPlaceholder(prod.name, prod.category);
    fs.writeFileSync(svgPath, svgContent);

    generatedCount++;
  }

  console.log('\nIMAGE PIPELINE SUMMARY');
  console.log('==================================================');
  console.log(`Generated Custom Visuals: ${generatedCount}`);
  console.log('==================================================');
}

runImageGenerator().catch((err) => {
  console.error('Error running product image pipeline:', err);
  process.exit(1);
});
