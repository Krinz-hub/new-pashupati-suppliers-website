import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function categorizeProduct(name: string): { category: string; subcategory: string } {
  const n = name.toLowerCase();

  if (
    n.includes('cooker') ||
    n.includes('pot') ||
    n.includes('pan') ||
    n.includes('bowl') ||
    n.includes('cup') ||
    n.includes('plate') ||
    n.includes('spoon') ||
    n.includes('fork') ||
    n.includes('knife') ||
    n.includes('belna') ||
    n.includes('chopping') ||
    n.includes('tiffin') ||
    n.includes('lunch box') ||
    n.includes('ladel') ||
    n.includes('stainer') ||
    n.includes('momo') ||
    n.includes('apron') ||
    n.includes('mixer') ||
    n.includes('lemon') ||
    n.includes('deli glass') ||
    n.includes('tea') ||
    n.includes('tray') ||
    n.includes('better')
  ) {
    return { category: 'kitchen', subcategory: 'Cookware & Dining' };
  }

  if (
    n.includes('broom') ||
    n.includes('wifer') ||
    n.includes('colin') ||
    n.includes('detol') ||
    n.includes('lizol') ||
    n.includes('pocha') ||
    n.includes('kalahit')
  ) {
    return { category: 'cleaning', subcategory: 'Cleaning Utilities' };
  }

  if (
    n.includes('bucket') ||
    n.includes('chair') ||
    n.includes('flower pot') ||
    n.includes('pigy') ||
    n.includes('plastic bottle') ||
    n.includes('pipe plastic') ||
    n.includes('clip')
  ) {
    return { category: 'plastic', subcategory: 'Molded Plastics' };
  }

  if (
    n.includes('fan') ||
    n.includes('heater') ||
    n.includes('baltra') ||
    n.includes('gas') ||
    n.includes('kettle') ||
    n.includes('water dispenser') ||
    n.includes('electromax') ||
    n.includes('yasuda')
  ) {
    return { category: 'electrical', subcategory: 'Home & Kitchen Appliances' };
  }

  if (
    n.includes('thermos') ||
    n.includes('filter') ||
    n.includes('foodpacker') ||
    n.includes('jug')
  ) {
    return { category: 'storage', subcategory: 'Containers & Insulated Storage' };
  }

  if (
    n.includes('tripal') ||
    n.includes('metal box') ||
    n.includes('doori') ||
    n.includes('rain coat') ||
    n.includes('rack') ||
    n.includes('lock') ||
    n.includes('basin') ||
    n.includes('plastic roll')
  ) {
    return { category: 'household', subcategory: 'Home & Hardware Supplies' };
  }

  return { category: 'general', subcategory: 'General Business Supplies' };
}

async function runImport() {
  console.log('--------------------------------------------------');
  console.log('NEW PASHUPATI SUPPLIERS — CSV PRODUCT IMPORTER');
  console.log('--------------------------------------------------');

  const rawCsvPath = path.resolve(process.cwd(), 'data/raw_products.csv');
  if (!fs.existsSync(rawCsvPath)) {
    console.error(`Error: File not found at ${rawCsvPath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(rawCsvPath, 'utf-8');
  const rows: any[] = parse(fileContent, { columns: true, skip_empty_lines: true, trim: true });

  const productsList: any[] = [];
  const csvNormalizedLines: string[] = [
    'id,product_name,sku,category,subcategory,description,shortDescription,brand,image,featured,popular,available,unit,packSize,sortOrder',
  ];

  let index = 1;

  for (const row of rows) {
    const rawName = row['Product'] || '';
    const var1 = row['Variant / Size'] || '';
    const var2 = row['Variant / Size 2'] || '';

    let fullName = rawName;
    if (var1) fullName += ` ${var1}`;
    if (var2) fullName += ` (${var2})`;
    fullName = fullName.trim();

    if (!fullName) continue;

    const { category, subcategory } = categorizeProduct(fullName);
    const slug = `p${index}-${slugify(fullName)}`;
    const sku = `NPS-${category.substring(0, 3).toUpperCase()}-${String(index).padStart(3, '0')}`;
    const featured = index <= 8 || index % 5 === 0;
    const popular = index % 3 === 0;

    const imagePath = `/assets/products/${category}/${slug}.svg`;
    const desc = `${fullName} supplied by New Pashupati Suppliers in Hetauda. Durable quality for wholesale and retail procurement.`;
    const shortDesc = `${fullName} - Available at New Pashupati Suppliers`;

    const productObj = {
      id: slug,
      slug,
      name: fullName,
      sku,
      category,
      subcategory,
      description: desc,
      shortDescription: shortDesc,
      brand: var2 ? var2 : 'New Pashupati',
      image: imagePath,
      images: [imagePath],
      featured,
      popular,
      available: true,
      unit: 'Piece',
      packSize: var1 ? `Variant: ${var1}` : 'Standard Bulk',
      sortOrder: index,
    };

    productsList.push(productObj);

    csvNormalizedLines.push(
      `"${slug}","${fullName.replace(/"/g, '""')}","${sku}","${category}","${subcategory}","${desc.replace(/"/g, '""')}","${shortDesc.replace(/"/g, '""')}","Pashupati","${imagePath}",${featured},${popular},true,"Piece","${var1 || 'Standard'}",${index}`
    );

    index++;
  }

  // Save normalized products.csv
  const csvOutPath = path.resolve(process.cwd(), 'data/products.csv');
  fs.writeFileSync(csvOutPath, csvNormalizedLines.join('\n'));

  // Save src/data/products.ts
  const tsContent = `// Auto-generated product catalog from New Pashupati Suppliers CSV
import { Product } from '../types';

export const PRODUCTS: Product[] = ${JSON.stringify(productsList, null, 2)};
`;

  const tsOutPath = path.resolve(process.cwd(), 'src/data/products.ts');
  fs.writeFileSync(tsOutPath, tsContent);

  console.log('\n==================================================');
  console.log(`Successfully imported ${productsList.length} products from CSV!`);
  console.log(`Saved CSV dataset: data/products.csv`);
  console.log(`Saved TypeScript dataset: src/data/products.ts`);
  console.log('==================================================');
}

runImport().catch((err) => {
  console.error('Import failed:', err);
  process.exit(1);
});
