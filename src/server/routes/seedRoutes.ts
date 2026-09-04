import { Hono } from 'hono';
import { requireAuth, AppEnv } from '../auth';
import { Storage } from '../storage';
import { connectToDatabase } from '../config/db';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';

export const seedRoutes = new Hono<AppEnv>();

// Seed database with hardcoded initial data if empty or missing records
seedRoutes.post('/seed', async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);

  let insertedCategories = 0;
  let insertedProducts = 0;

  // 1. Seed Categories
  for (let i = 0; i < CATEGORIES.length; i++) {
    const cat = CATEGORIES[i];
    const existing = await Storage.findCategory(cat.slug);

    if (!existing) {
      await Storage.createCategory({
        name: cat.name,
        slug: cat.slug,
        description: cat.description || '',
        image: cat.image || `/assets/categories/${cat.slug}.jpg`,
        iconName: cat.iconName || 'Layers',
        type: 'product',
        sortOrder: i,
      });
      insertedCategories++;
    }
  }

  // 2. Seed Products
  for (const prod of PRODUCTS) {
    const slug = prod.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const existing = await Storage.findProduct(slug);

    if (!existing) {
      await Storage.createProduct({
        name: prod.name,
        slug: slug,
        category: prod.category,
        categoryId: prod.category,
        description: prod.description,
        shortDescription: prod.description,
        featuredImage: prod.image,
        image: prod.image,
        images: [{ url: prod.image, altText: prod.name, sortOrder: 0 }],
        featured: Boolean(prod.featured),
        status: 'published',
        seoTitle: prod.name,
        seoDescription: prod.description,
        publishedAt: new Date(),
      });
      insertedProducts++;
    }
  }

  return c.json({
    message: 'Database seeded successfully',
    insertedCategories,
    insertedProducts,
  });
});

// Admin stats overview
seedRoutes.get('/stats', requireAuth, async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);
  const statsData = await Storage.getStats();
  return c.json(statsData);
});
