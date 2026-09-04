import { Hono } from 'hono';
import { requireAuth, AppEnv } from '../auth';
import { Storage } from '../storage';
import { connectToDatabase } from '../config/db';

export const productRoutes = new Hono<AppEnv>();

// GET all products (Public & Admin)
productRoutes.get('/', async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);

  const category = c.req.query('category');
  const search = c.req.query('search');
  const status = c.req.query('status'); // 'all', 'published', 'draft'
  const featured = c.req.query('featured');

  const filter: any = {};
  if (status) filter.status = status;
  else filter.status = 'published'; // Default public only

  if (category) filter.category = category;
  if (featured === 'true' || featured === '1') filter.featured = true;
  if (search) filter.search = search;

  const products = await Storage.getProducts(filter);

  const formattedProducts = products.map((p: any) => ({
    id: p.slug || (p._id || p.id).toString(),
    _id: (p._id || p.id).toString(),
    name: p.name,
    slug: p.slug,
    category: p.category,
    categoryId: p.categoryId || p.category,
    description: p.description,
    shortDescription: p.shortDescription || p.description,
    image: p.featuredImage || p.image,
    featuredImage: p.featuredImage || p.image,
    images: p.images || [],
    featured: Boolean(p.featured),
    status: p.status || 'published',
    seoTitle: p.seoTitle || p.name,
    seoDescription: p.seoDescription || p.description,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    publishedAt: p.publishedAt,
  }));

  return c.json({ products: formattedProducts });
});

// GET single product by ID or Slug (Public)
productRoutes.get('/:idOrSlug', async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);
  const idOrSlug = c.req.param('idOrSlug');

  const p = await Storage.findProduct(idOrSlug);
  if (!p) {
    return c.json({ error: 'Product not found' }, 404);
  }

  return c.json({
    product: {
      id: p.slug || (p._id || p.id).toString(),
      _id: (p._id || p.id).toString(),
      name: p.name,
      slug: p.slug,
      category: p.category,
      categoryId: p.categoryId || p.category,
      description: p.description,
      shortDescription: p.shortDescription || p.description,
      image: p.featuredImage || p.image,
      featuredImage: p.featuredImage || p.image,
      images: p.images || [],
      featured: Boolean(p.featured),
      status: p.status || 'published',
      seoTitle: p.seoTitle || p.name,
      seoDescription: p.seoDescription || p.description,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      publishedAt: p.publishedAt,
    },
  });
});

// POST Create Product (Protected)
productRoutes.post('/', requireAuth, async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);

  const body = await c.req.json();
  const {
    name,
    slug,
    category,
    categoryId,
    description,
    shortDescription,
    image,
    featuredImage,
    featured,
    status,
    seoTitle,
    seoDescription,
    images,
  } = body;

  const finalImage = featuredImage || image;
  if (!name || !finalImage || !description) {
    return c.json({ error: 'Product name, image, and description are required' }, 400);
  }

  const baseSlug = (slug || name)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  let finalSlug = baseSlug;
  const existing = await Storage.findProduct(finalSlug);
  if (existing) {
    finalSlug = `${baseSlug}-${Date.now().toString(36)}`;
  }

  const effectiveCategory = category || categoryId || 'general';

  const product = await Storage.createProduct({
    name: name.trim(),
    slug: finalSlug,
    category: effectiveCategory,
    categoryId: categoryId || effectiveCategory,
    description: description.trim(),
    shortDescription: shortDescription || description.slice(0, 160),
    featuredImage: finalImage,
    image: finalImage,
    images: Array.isArray(images) ? images : [],
    featured: Boolean(featured),
    status: status === 'draft' ? 'draft' : 'published',
    seoTitle: seoTitle || name,
    seoDescription: seoDescription || shortDescription || description.slice(0, 160),
    publishedAt: new Date(),
  });

  return c.json(
    {
      id: product.slug,
      _id: (product._id || product.id).toString(),
      slug: product.slug,
      message: 'Product created successfully',
    },
    201
  );
});

// PUT Update Product (Protected)
productRoutes.put('/:id', requireAuth, async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);
  const id = c.req.param('id');
  if (!id) return c.json({ error: 'Missing product ID' }, 400);

  const p = await Storage.findProduct(id);
  if (!p) {
    return c.json({ error: 'Product not found' }, 404);
  }

  const body = await c.req.json();
  const {
    name,
    slug,
    category,
    categoryId,
    description,
    shortDescription,
    image,
    featuredImage,
    featured,
    status,
    seoTitle,
    seoDescription,
    images,
  } = body;

  const updateData: any = {};
  if (slug && slug !== p.slug) {
    const finalSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const duplicate = await Storage.findProduct(finalSlug);
    if (duplicate && (duplicate._id || duplicate.id) !== (p._id || p.id)) {
      return c.json({ error: 'A product with this slug already exists' }, 400);
    }
    updateData.slug = finalSlug;
  }

  if (name !== undefined) updateData.name = name.trim();
  if (category !== undefined) updateData.category = category;
  if (categoryId !== undefined) updateData.categoryId = categoryId;
  if (description !== undefined) updateData.description = description.trim();
  if (shortDescription !== undefined) updateData.shortDescription = shortDescription;
  if (featuredImage || image) {
    updateData.featuredImage = featuredImage || image;
    updateData.image = featuredImage || image;
  }
  if (featured !== undefined) updateData.featured = Boolean(featured);
  if (status !== undefined) updateData.status = status;
  if (seoTitle !== undefined) updateData.seoTitle = seoTitle;
  if (seoDescription !== undefined) updateData.seoDescription = seoDescription;
  if (Array.isArray(images)) updateData.images = images;

  await Storage.updateProduct(id, updateData);

  return c.json({ message: 'Product updated successfully' });
});

// DELETE Product (Protected)
productRoutes.delete('/:id', requireAuth, async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);
  const id = c.req.param('id');
  if (!id) return c.json({ error: 'Missing product ID' }, 400);

  const p = await Storage.findProduct(id);
  if (!p) {
    return c.json({ error: 'Product not found' }, 404);
  }

  await Storage.deleteProduct(id);
  return c.json({ message: 'Product deleted successfully' });
});
