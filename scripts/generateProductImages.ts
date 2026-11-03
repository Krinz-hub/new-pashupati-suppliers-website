import fs from 'fs';
import path from 'path';
import { PRODUCTS as fallbackProducts } from '../src/data/products';

interface ProductImageMapping {
  id: string;
  name: string;
  category: string;
  realPhotoPath?: string;
}

// Generate realistic, studio-quality e-commerce product photograph SVG on pure #FFFFFF background
function generateStudioProductSvg(name: string, category: string): string {
  const n = name.toLowerCase();
  const cat = category.toLowerCase();

  // Pure white studio lighting with soft floor contact drop shadow
  const shadowSvg = `
    <ellipse cx="300" cy="385" rx="160" ry="18" fill="#D1D5DB" opacity="0.45" filter="blur(8px)" />
    <ellipse cx="300" cy="384" rx="90" ry="8" fill="#9CA3AF" opacity="0.6" filter="blur(4px)" />
  `;

  let productObjectSvg = '';

  // 1. Electric Kettle (p94, etc.)
  if (n.includes('kettle')) {
    productObjectSvg = `
      <!-- Cordless Electric Kettle -->
      <path d="M 230 160 L 250 135 L 290 135 L 350 145 L 340 180 Z" fill="#1F2937" />
      <path d="M 240 160 C 230 250 240 330 250 365 L 350 365 C 360 330 370 250 360 160 Z" fill="url(#metalGrad)" />
      <!-- Specular reflection highlight on body -->
      <path d="M 265 170 C 260 230 263 300 267 360 L 285 360 C 280 300 278 230 282 170 Z" fill="#FFFFFF" opacity="0.75" />
      <path d="M 315 170 C 318 230 320 300 318 360 L 328 360 C 330 300 328 230 324 170 Z" fill="#FFFFFF" opacity="0.35" />
      <!-- Spout -->
      <path d="M 235 180 L 195 190 L 230 230 Z" fill="url(#metalGrad)" />
      <!-- Handle -->
      <path d="M 355 175 C 410 190 415 320 355 340 L 345 325 C 390 305 385 210 345 190 Z" fill="#1F2937" />
      <!-- Base & Lid knob -->
      <ellipse cx="300" cy="135" rx="35" ry="12" fill="#111827" />
      <circle cx="300" cy="120" r="10" fill="#374151" />
      <rect x="235" y="365" width="130" height="15" rx="4" fill="#111827" />
      <path d="M 230 375 L 370 375 L 365 385 L 235 385 Z" fill="#374151" />
    `;
  }
  // 2. Frying Pan (p61, etc.)
  else if (n.includes('pan') || n.includes('skillet')) {
    productObjectSvg = `
      <!-- Black Non-Stick Frying Pan -->
      <ellipse cx="260" cy="270" rx="140" ry="75" fill="#111827" />
      <ellipse cx="260" cy="265" rx="130" ry="65" fill="#1F2937" />
      <ellipse cx="260" cy="265" rx="125" ry="60" fill="url(#nonstickGrad)" />
      <ellipse cx="230" cy="255" rx="60" ry="25" fill="#FFFFFF" opacity="0.12" />
      <!-- Handle -->
      <path d="M 380 270 L 510 240 C 520 238 525 248 518 255 L 390 295 Z" fill="#111827" />
      <ellipse cx="505" cy="245" rx="4" ry="7" fill="#E5E7EB" />
    `;
  }
  // 3. Electric Fan (p26)
  else if (n.includes('fan')) {
    productObjectSvg = `
      <!-- Table Fan -->
      <circle cx="300" cy="210" r="110" fill="none" stroke="#D1D5DB" stroke-width="4" />
      <circle cx="300" cy="210" r="105" fill="#F9FAFB" opacity="0.6" />
      <line x1="190" y1="210" x2="410" y2="210" stroke="#E5E7EB" stroke-width="1.5" />
      <line x1="300" y1="100" x2="300" y2="320" stroke="#E5E7EB" stroke-width="1.5" />
      <!-- Blades -->
      <path d="M 300 210 Q 250 140 280 120 Q 315 150 300 210 Z" fill="#93C5FD" opacity="0.8" />
      <path d="M 300 210 Q 380 230 375 270 Q 320 260 300 210 Z" fill="#93C5FD" opacity="0.8" />
      <path d="M 300 210 Q 230 280 220 250 Q 260 210 300 210 Z" fill="#93C5FD" opacity="0.8" />
      <circle cx="300" cy="210" r="22" fill="#2563EB" />
      <circle cx="300" cy="210" r="12" fill="#FFFFFF" />
      <!-- Stand & Base -->
      <path d="M 292 315 L 290 355 L 310 355 L 308 315 Z" fill="#E5E7EB" />
      <ellipse cx="300" cy="365" rx="70" ry="18" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="2" />
      <rect x="280" y="358" width="12" height="6" rx="2" fill="#2563EB" />
      <rect x="296" y="358" width="12" height="6" rx="2" fill="#E5E7EB" />
      <rect x="312" y="358" width="12" height="6" rx="2" fill="#E5E7EB" />
    `;
  }
  // 4. Broom / Cleaning (p8, p68, p96)
  else if (n.includes('broom') || n.includes('jhadu')) {
    productObjectSvg = `
      <!-- Natural Fiber Broom -->
      <g transform="rotate(-25 300 250)">
        <path d="M 290 80 L 310 80 L 312 210 L 288 210 Z" fill="#D97706" />
        <rect x="284" y="190" width="32" height="30" rx="3" fill="#DC2626" />
        <rect x="284" y="200" width="32" height="5" fill="#FBBF24" />
        <path d="M 280 220 Q 200 360 240 390 L 360 390 Q 400 360 320 220 Z" fill="url(#strawGrad)" />
        <line x1="260" y1="310" x2="340" y2="310" stroke="#B45309" stroke-width="2" />
        <line x1="250" y1="350" x2="350" y2="350" stroke="#B45309" stroke-width="2" />
      </g>
    `;
  }
  // 5. Water Dispenser (p95, p97)
  else if (n.includes('dispenser')) {
    productObjectSvg = `
      <!-- Tabletop Water Dispenser -->
      <rect x="230" y="160" width="140" height="210" rx="12" fill="#F9FAFB" stroke="#E5E7EB" stroke-width="2" />
      <!-- Water Bottle Upside Down -->
      <path d="M 245 160 C 245 80 355 80 355 160 Z" fill="#60A5FA" opacity="0.75" />
      <ellipse cx="300" cy="85" rx="35" ry="10" fill="#3B82F6" opacity="0.6" />
      <!-- Dispenser Face Panel -->
      <rect x="245" y="180" width="110" height="130" rx="6" fill="#1E293B" />
      <!-- Hot Tap -->
      <rect x="265" y="240" width="18" height="25" rx="3" fill="#EF4444" />
      <!-- Cold Tap -->
      <rect x="315" y="240" width="18" height="25" rx="3" fill="#3B82F6" />
      <!-- Drip Tray -->
      <rect x="240" y="340" width="120" height="20" rx="4" fill="#334155" />
    `;
  }
  // 6. Thermos / Flask (p81, p82, p83, p84, p25)
  else if (n.includes('thermos') || n.includes('flask')) {
    productObjectSvg = `
      <!-- Insulated Stainless Steel Thermos Flask -->
      <rect x="250" y="130" width="100" height="240" rx="18" fill="url(#metalGrad)" />
      <!-- Reflection -->
      <rect x="275" y="130" width="18" height="240" fill="#FFFFFF" opacity="0.65" />
      <rect x="315" y="130" width="10" height="240" fill="#FFFFFF" opacity="0.3" />
      <!-- Black Cap / Cup -->
      <path d="M 255 130 L 260 85 L 340 85 L 345 130 Z" fill="#1F2937" />
      <circle cx="300" cy="80" r="10" fill="#374151" />
      <rect x="265" y="125" width="70" height="8" rx="2" fill="#E5E7EB" />
      <rect x="250" y="360" width="100" height="12" rx="4" fill="#111827" />
    `;
  }
  // 7. Tarpaulin / Tripal (p86 - p93)
  else if (n.includes('tripal') || n.includes('tarpaulin')) {
    productObjectSvg = `
      <!-- Folded Blue & Silver Tarpaulin Sheet -->
      <g transform="translate(180, 180)">
        <polygon points="0,90 120,40 240,80 120,135" fill="#2563EB" />
        <polygon points="0,90 120,135 120,180 0,135" fill="#1D4ED8" />
        <polygon points="120,135 240,80 240,125 120,180" fill="#1E40AF" />
        <!-- Silver inner fold layer -->
        <polygon points="10,85 120,38 230,76 120,125" fill="#E2E8F0" opacity="0.9" />
        <!-- Brass eyelet grommet -->
        <circle cx="22" cy="95" r="7" fill="#F59E0B" stroke="#B45309" stroke-width="2" />
        <circle cx="22" cy="95" r="3.5" fill="#1E293B" />
        <circle cx="220" cy="85" r="7" fill="#F59E0B" stroke="#B45309" stroke-width="2" />
        <circle cx="220" cy="85" r="3.5" fill="#1E293B" />
      </g>
    `;
  }
  // 8. Cleaning Chemicals (Dettol, Colin, Lizol, Kala Hit)
  else if (n.includes('colin') || n.includes('lizol') || n.includes('detol') || n.includes('kalahit')) {
    productObjectSvg = `
      <!-- Spray/Disinfectant Bottle -->
      <rect x="245" y="190" width="110" height="180" rx="14" fill="#0284C7" />
      <path d="M 265 190 L 285 140 L 315 140 L 335 190 Z" fill="#0284C7" />
      <rect x="285" y="125" width="30" height="15" rx="3" fill="#E0F2FE" />
      <!-- Trigger / Cap -->
      <path d="M 270 110 L 330 110 L 335 125 L 265 125 Z" fill="#FFFFFF" stroke="#BAE6FD" stroke-width="1.5" />
      <path d="M 265 110 L 230 118 L 245 132 L 270 125 Z" fill="#FFFFFF" />
      <path d="M 285 125 C 275 145 285 165 295 165" stroke="#E0F2FE" stroke-width="4" fill="none" />
      <!-- Label -->
      <rect x="255" y="220" width="90" height="100" rx="6" fill="#FFFFFF" />
      <rect x="265" y="235" width="70" height="14" rx="3" fill="#0369A1" />
      <rect x="265" y="260" width="50" height="6" rx="2" fill="#94A3B8" />
      <rect x="265" y="272" width="65" height="6" rx="2" fill="#94A3B8" />
      <ellipse cx="270" cy="270" rx="10" ry="60" fill="#FFFFFF" opacity="0.3" />
    `;
  }
  // 9. Brass Padlock (p45)
  else if (n.includes('lock')) {
    productObjectSvg = `
      <!-- Heavy Duty Brass Padlock -->
      <path d="M 250 200 C 250 110 350 110 350 200" fill="none" stroke="url(#chromeGrad)" stroke-width="26" stroke-linecap="round" />
      <rect x="230" y="195" width="140" height="155" rx="14" fill="url(#brassGrad)" stroke="#B45309" stroke-width="2" />
      <!-- Keyhole -->
      <circle cx="300" cy="265" r="12" fill="#451A03" />
      <polygon points="296,265 304,265 306,295 294,295" fill="#451A03" />
      <ellipse cx="275" cy="270" rx="8" ry="50" fill="#FFFFFF" opacity="0.3" />
    `;
  }
  // 10. Kitchen Mixer Grinder (p57)
  else if (n.includes('mixer')) {
    productObjectSvg = `
      <!-- Kitchen Mixer Grinder Machine -->
      <path d="M 250 220 L 350 220 L 365 370 L 235 370 Z" fill="#DC2626" />
      <!-- Control Knob -->
      <circle cx="300" cy="315" r="24" fill="#FFFFFF" stroke="#991B1B" stroke-width="2" />
      <circle cx="300" cy="315" r="14" fill="#1F2937" />
      <line x1="300" y1="315" x2="300" y2="303" stroke="#DC2626" stroke-width="3" />
      <!-- Stainless Steel Jar Mounted -->
      <path d="M 265 220 L 335 220 L 345 105 L 255 105 Z" fill="url(#metalGrad)" />
      <ellipse cx="300" cy="105" rx="45" ry="12" fill="#E2E8F0" />
      <!-- Jar Handle -->
      <path d="M 345 125 C 380 135 380 190 335 200" fill="none" stroke="#1F2937" stroke-width="12" stroke-linecap="round" />
    `;
  }
  // 11. Steel Bowls / Plates / Cutlery (p7, p32, p67, p76, p77, p79)
  else if (n.includes('bowl') || n.includes('plate') || n.includes('spoon') || n.includes('fork') || n.includes('ladel')) {
    productObjectSvg = `
      <!-- Polished Stainless Steel Thali / Bowl -->
      <ellipse cx="300" cy="270" rx="140" ry="75" fill="url(#metalGrad)" stroke="#CBD5E1" stroke-width="2" />
      <ellipse cx="300" cy="270" rx="115" ry="55" fill="#E2E8F0" />
      <ellipse cx="300" cy="270" rx="90" ry="40" fill="#F8FAFC" />
      <ellipse cx="270" cy="255" rx="55" ry="18" fill="#FFFFFF" opacity="0.6" />
      <!-- Spoon/Cutlery beside -->
      <path d="M 380 200 Q 430 250 460 330" stroke="#CBD5E1" stroke-width="14" stroke-linecap="round" fill="none" />
      <ellipse cx="380" cy="190" rx="20" ry="30" fill="url(#metalGrad)" transform="rotate(-30 380 190)" />
    `;
  }
  // 12. Storage Rack / Organizer (p71)
  else if (n.includes('rack') || n.includes('shelf')) {
    productObjectSvg = `
      <!-- Chrome Wire Utility Rack -->
      <!-- Vertical Uprights -->
      <rect x="210" y="100" width="8" height="270" rx="4" fill="url(#chromeGrad)" />
      <rect x="382" y="100" width="8" height="270" rx="4" fill="url(#chromeGrad)" />
      <!-- Shelves (4 tiers) -->
      <rect x="200" y="130" width="200" height="12" rx="3" fill="url(#chromeGrad)" />
      <rect x="200" y="195" width="200" height="12" rx="3" fill="url(#chromeGrad)" />
      <rect x="200" y="260" width="200" height="12" rx="3" fill="url(#chromeGrad)" />
      <rect x="200" y="325" width="200" height="12" rx="3" fill="url(#chromeGrad)" />
      <!-- Wire grating details -->
      <line x1="230" y1="130" x2="230" y2="142" stroke="#FFFFFF" stroke-width="2" />
      <line x1="260" y1="130" x2="260" y2="142" stroke="#FFFFFF" stroke-width="2" />
      <line x1="340" y1="130" x2="340" y2="142" stroke="#FFFFFF" stroke-width="2" />
      <line x1="370" y1="130" x2="370" y2="142" stroke="#FFFFFF" stroke-width="2" />
    `;
  }
  // 13. Default Clean E-Commerce Studio Product
  else {
    productObjectSvg = `
      <!-- Clean Modern Kitchen / Utility Cookware Container -->
      <path d="M 230 170 C 220 270 230 345 250 365 L 350 365 C 370 345 380 270 370 170 Z" fill="url(#metalGrad)" />
      <ellipse cx="300" cy="170" rx="70" ry="24" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="2" />
      <ellipse cx="300" cy="170" rx="55" ry="16" fill="#FFFFFF" />
      <!-- Specular Highlight -->
      <rect x="265" y="180" width="20" height="180" fill="#FFFFFF" opacity="0.5" />
      <!-- Handles -->
      <path d="M 225 180 C 190 190 190 230 225 240" fill="none" stroke="#1F2937" stroke-width="10" stroke-linecap="round" />
      <path d="M 375 180 C 410 190 410 230 375 240" fill="none" stroke="#1F2937" stroke-width="10" stroke-linecap="round" />
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <!-- Seamless Pure White Studio Lighting Gradients -->
    <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#94A3B8" />
      <stop offset="25%" stop-color="#E2E8F0" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="75%" stop-color="#CBD5E1" />
      <stop offset="100%" stop-color="#64748B" />
    </linearGradient>

    <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="35%" stop-color="#CBD5E1" />
      <stop offset="70%" stop-color="#94A3B8" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>

    <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="30%" stop-color="#F59E0B" />
      <stop offset="70%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>

    <linearGradient id="nonstickGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#262626" />
      <stop offset="50%" stop-color="#171717" />
      <stop offset="100%" stop-color="#0A0A0A" />
    </linearGradient>

    <linearGradient id="strawGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D97706" />
      <stop offset="50%" stop-color="#FDE68A" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
  </defs>

  <!-- 1. Pure Seamless White Background (#FFFFFF) -->
  <rect width="600" height="450" fill="#FFFFFF" />

  <!-- 2. Subtle Natural Contact Floor Shadow -->
  ${shadowSvg}

  <!-- 3. Realistic Centered Product Object -->
  <g id="product-artwork">
    ${productObjectSvg}
  </g>
</svg>`;
}

async function runImagePipeline() {
  console.log('====================================================');
  console.log('NEW PASHUPATI SUPPLIERS — PRODUCT IMAGE PIPELINE');
  console.log('====================================================');

  const productsDir = path.resolve(process.cwd(), 'public/assets/products');
  let photoMatchCount = 0;
  let studioSvgCount = 0;

  const updatedProductList = fallbackProducts.map((p) => {
    const category = p.category.toLowerCase();
    const slug = p.slug || p.id;

    // Check if authentic Nano Banana JPG photograph exists in public/assets/products/
    const jpgLocalPath = path.join(productsDir, category, `${slug}.jpg`);
    const pngLocalPath = path.join(productsDir, category, `${slug}.png`);

    let finalImagePath = '';

    if (fs.existsSync(jpgLocalPath)) {
      finalImagePath = `/assets/products/${category}/${slug}.jpg`;
      photoMatchCount++;
    } else if (fs.existsSync(pngLocalPath)) {
      finalImagePath = `/assets/products/${category}/${slug}.png`;
      photoMatchCount++;
    } else {
      // Generate clean, realistic white-background studio SVG representation
      const targetDir = path.join(productsDir, category);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const svgPath = path.join(targetDir, `${slug}.svg`);
      const svgContent = generateStudioProductSvg(p.name, p.category);
      fs.writeFileSync(svgPath, svgContent);

      finalImagePath = `/assets/products/${category}/${slug}.svg`;
      studioSvgCount++;
    }

    return {
      ...p,
      image: finalImagePath,
      images: [finalImagePath],
    };
  });

  // Write updated product definitions with clean realistic image links to src/data/products.ts
  const productsFilePath = path.resolve(process.cwd(), 'src/data/products.ts');
  const fileContent = `// Auto-generated product catalog from New Pashupati Suppliers CSV
import { Product } from '../types';

export const PRODUCTS: Product[] = ${JSON.stringify(updatedProductList, null, 2)};
`;

  fs.writeFileSync(productsFilePath, fileContent, 'utf-8');

  console.log('\nPIPELINE SUMMARY:');
  console.log('----------------------------------------------------');
  console.log(`✓ Real AI Studio Photographs: ${photoMatchCount}`);
  console.log(`✓ Clean White-BG Studio Representations: ${studioSvgCount}`);
  console.log(`✓ Total Products Processed: ${updatedProductList.length}`);
  console.log('✓ Successfully updated src/data/products.ts');
  console.log('====================================================\n');
}

runImagePipeline().catch((err) => {
  console.error('Pipeline execution error:', err);
  process.exit(1);
});
