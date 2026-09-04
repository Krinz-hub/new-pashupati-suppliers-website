import { Hono } from 'hono';
import { requireAuth, AppEnv } from '../auth';
import { Storage } from '../storage';
import { connectToDatabase } from '../config/db';

export const categoryRoutes = new Hono<AppEnv>();

// GET all categories (Public)
categoryRoutes.get('/', async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);

  const categories = await Storage.getCategories();

  // Attach dynamic product counts
  const categoriesWithCounts = await Promise.all(
    categories.map(async (cat: any) => {
      const productCount = await Storage.countProductsInCategory(cat.slug || cat.id);
      return {
        id: cat.slug || (cat._id || cat.id).toString(),
        _id: (cat._id || cat.id).toString(),
        name: cat.name,
        slug: cat.slug,
        description: cat.description || '',
        image: cat.image || '',
        iconName: cat.iconName || 'Layers',
        type: cat.type || 'product',
        sortOrder: cat.sortOrder || 0,
        productCount,
        createdAt: cat.createdAt,
        updatedAt: cat.updatedAt,
      };
    })
  );

  return c.json({ categories: categoriesWithCounts });
});

// GET single category by ID or Slug (Public)
categoryRoutes.get('/:idOrSlug', async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);
  const idOrSlug = c.req.param('idOrSlug');

  const cat = await Storage.findCategory(idOrSlug);
  if (!cat) {
    return c.json({ error: 'Category not found' }, 404);
  }

  const productCount = await Storage.countProductsInCategory(cat.slug || cat.id);

  return c.json({
    category: {
      id: cat.slug || (cat._id || cat.id).toString(),
      _id: (cat._id || cat.id).toString(),
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image || '',
      iconName: cat.iconName || 'Layers',
      type: cat.type || 'product',
      sortOrder: cat.sortOrder || 0,
      productCount,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    },
  });
});

// POST Create Category (Protected)
categoryRoutes.post('/', requireAuth, async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);

  const { name, slug, description, image, iconName, type, sortOrder } = await c.req.json();

  if (!name) {
    return c.json({ error: 'Category name is required' }, 400);
  }

  const generatedSlug = (slug || name)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const existing = await Storage.findCategory(generatedSlug);
  if (existing) {
    return c.json({ error: 'A category with this slug already exists' }, 400);
  }

  const category = await Storage.createCategory({
    name: name.trim(),
    slug: generatedSlug,
    description: description || '',
    image: image || `/assets/categories/${generatedSlug}.jpg`,
    iconName: iconName || 'Layers',
    type: type || 'product',
    sortOrder: sortOrder || 0,
  });

  return c.json(
    {
      category: {
        id: category.slug,
        _id: (category._id || category.id).toString(),
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: category.image,
        iconName: category.iconName,
        type: category.type,
      },
      message: 'Category created successfully',
    },
    201
  );
});

// PUT Update Category (Protected)
categoryRoutes.put('/:id', requireAuth, async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);
  const id = c.req.param('id');
  if (!id) return c.json({ error: 'Missing category ID' }, 400);

  const cat = await Storage.findCategory(id);
  if (!cat) {
    return c.json({ error: 'Category not found' }, 404);
  }

  const { name, slug, description, image, iconName, type, sortOrder } = await c.req.json();

  const updateData: any = {};
  if (slug && slug !== cat.slug) {
    const updatedSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const duplicate = await Storage.findCategory(updatedSlug);
    if (duplicate && (duplicate._id || duplicate.id) !== (cat._id || cat.id)) {
      return c.json({ error: 'A category with this slug already exists' }, 400);
    }
    updateData.slug = updatedSlug;
  }

  if (name !== undefined) updateData.name = name.trim();
  if (description !== undefined) updateData.description = description;
  if (image !== undefined) updateData.image = image;
  if (iconName !== undefined) updateData.iconName = iconName;
  if (type !== undefined) updateData.type = type;
  if (sortOrder !== undefined) updateData.sortOrder = sortOrder;

  const updatedCat = await Storage.updateCategory(id, updateData);

  return c.json({ category: updatedCat, message: 'Category updated successfully' });
});

// DELETE Category (Protected)
categoryRoutes.delete('/:id', requireAuth, async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);
  const id = c.req.param('id');
  if (!id) return c.json({ error: 'Missing category ID' }, 400);

  const cat = await Storage.findCategory(id);
  if (!cat) {
    return c.json({ error: 'Category not found' }, 404);
  }

  // Safety check: Ensure no products are assigned to this category
  const productCount = await Storage.countProductsInCategory(cat.slug || cat.id);
  if (productCount > 0) {
    return c.json(
      {
        error: `Cannot delete category: ${productCount} product(s) are still assigned to it. Please reassign or delete the products first.`,
      },
      400
    );
  }

  await Storage.deleteCategory(id);
  return c.json({ message: 'Category deleted successfully' });
});
