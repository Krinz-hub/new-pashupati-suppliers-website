import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { CATEGORIES } from '../data/categories.js';
import { PRODUCTS } from '../data/products.js';

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());

// In-memory inquiries store
const inquiriesStore: any[] = [];

// GET /api/health
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'New Pashupati Suppliers REST API',
    database: 'local-dataset',
    totalProducts: PRODUCTS.length,
    time: new Date().toISOString(),
  });
});

// GET /api/categories
app.get('/api/categories', (_req: Request, res: Response) => {
  const countMap = new Map<string, number>();
  PRODUCTS.forEach((p) => {
    const cat = p.category.toLowerCase();
    countMap.set(cat, (countMap.get(cat) || 0) + 1);
  });

  const categoriesWithCount = CATEGORIES.map((cat) => ({
    ...cat,
    productCount: countMap.get(cat.slug) || cat.productCount || 0,
  }));

  return res.json({ success: true, data: categoriesWithCount });
});

// GET /api/categories/:slug
app.get('/api/categories/:slug', (req: Request, res: Response) => {
  const slug = (req.params.slug as string).toLowerCase();
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    return res.status(404).json({ success: false, error: 'Category not found' });
  }
  return res.json({ success: true, data: category });
});

// GET /api/products
app.get('/api/products', (req: Request, res: Response) => {
  const { category, subcategory, search, featured, popular, page = '1', limit = '24' } = req.query;

  const pageNum = parseInt(page as string, 10) || 1;
  const limitNum = parseInt(limit as string, 10) || 24;

  let filtered = [...PRODUCTS];

  if (category) {
    filtered = filtered.filter((p) => p.category.toLowerCase() === (category as string).toLowerCase());
  }

  if (subcategory) {
    const sub = (subcategory as string).toLowerCase();
    filtered = filtered.filter((p) => (p as any).subcategory?.toLowerCase().includes(sub));
  }

  if (featured === 'true') {
    filtered = filtered.filter((p) => p.featured);
  }

  if (popular === 'true') {
    filtered = filtered.filter((p) => p.popular || p.featured);
  }

  if (search) {
    const s = (search as string).toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s)
    );
  }

  const total = filtered.length;
  const paginated = filtered.slice((pageNum - 1) * limitNum, pageNum * limitNum);

  return res.json({
    success: true,
    data: paginated,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
    },
  });
});

// GET /api/products/:slug
app.get('/api/products/:slug', (req: Request, res: Response) => {
  const slug = (req.params.slug as string).toLowerCase();
  const product = PRODUCTS.find(
    (p) => p.id.toLowerCase() === slug || p.slug?.toLowerCase() === slug || p.name.toLowerCase().replace(/[\s]+/g, '-').includes(slug)
  );

  if (product) {
    return res.json({ success: true, data: product });
  }

  return res.status(404).json({ success: false, error: 'Product not found' });
});

// POST /api/inquiries
app.post('/api/inquiries', (req: Request, res: Response) => {
  const { name, phone, email, business, productName, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name, phone number, and message are required fields.',
    });
  }

  const inquiryDoc = {
    id: `inq-${Date.now()}`,
    name,
    phone,
    email,
    business,
    productName,
    message,
    createdAt: new Date().toISOString(),
  };

  inquiriesStore.push(inquiryDoc);

  return res.status(201).json({
    success: true,
    message: 'Thank you for your inquiry! Our supply team in Hetauda will respond shortly.',
    data: inquiryDoc,
  });
});
