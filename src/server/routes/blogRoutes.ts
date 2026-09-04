import { Hono } from 'hono';
import { requireAuth, AppEnv } from '../auth';
import { Storage } from '../storage';
import { connectToDatabase } from '../config/db';

export const blogRoutes = new Hono<AppEnv>();

// GET all blogs (Public & Admin)
blogRoutes.get('/', async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);

  const status = c.req.query('status'); // 'all', 'published', 'draft'
  const category = c.req.query('category');
  const search = c.req.query('search');

  const filter: any = {};
  if (status) filter.status = status;
  else filter.status = 'published'; // Default public only

  if (category) filter.category = category;
  if (search) filter.search = search;

  const blogs = await Storage.getBlogs(filter);

  const formattedBlogs = blogs.map((b: any) => ({
    id: b.slug || (b._id || b.id).toString(),
    _id: (b._id || b.id).toString(),
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt,
    content: b.content,
    featuredImage: b.featuredImage,
    category: b.category,
    categoryId: b.categoryId || b.category,
    categoryName: b.category || '',
    author: b.author,
    authorName: b.author,
    status: b.status,
    seoTitle: b.seoTitle || b.title,
    seoDescription: b.seoDescription || b.excerpt,
    publishedAt: b.publishedAt,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
  }));

  return c.json({ blogs: formattedBlogs });
});

// GET single blog post by ID or Slug (Public)
blogRoutes.get('/:idOrSlug', async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);
  const idOrSlug = c.req.param('idOrSlug');

  const b = await Storage.findBlog(idOrSlug);
  if (!b) {
    return c.json({ error: 'Blog post not found' }, 404);
  }

  return c.json({
    blog: {
      id: b.slug || (b._id || b.id).toString(),
      _id: (b._id || b.id).toString(),
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.content,
      featuredImage: b.featuredImage,
      category: b.category,
      categoryId: b.categoryId || b.category,
      categoryName: b.category || '',
      author: b.author,
      authorName: b.author,
      status: b.status,
      seoTitle: b.seoTitle || b.title,
      seoDescription: b.seoDescription || b.excerpt,
      publishedAt: b.publishedAt,
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
    },
  });
});

// POST Create Blog Post (Protected)
blogRoutes.post('/', requireAuth, async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);

  const {
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    category,
    categoryId,
    author,
    authorName,
    status,
    seoTitle,
    seoDescription,
  } = await c.req.json();

  if (!title || !content) {
    return c.json({ error: 'Title and content are required' }, 400);
  }

  const baseSlug = (slug || title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  let finalSlug = baseSlug;
  const existing = await Storage.findBlog(finalSlug);
  if (existing) {
    finalSlug = `${baseSlug}-${Date.now().toString(36)}`;
  }

  const effectiveCategory = category || categoryId || '';

  const blog = await Storage.createBlog({
    title: title.trim(),
    slug: finalSlug,
    excerpt: excerpt || content.slice(0, 160),
    content,
    featuredImage: featuredImage || '',
    category: effectiveCategory,
    categoryId: categoryId || effectiveCategory,
    author: authorName || author || 'New Pashupati Team',
    status: status === 'draft' ? 'draft' : 'published',
    seoTitle: seoTitle || title,
    seoDescription: seoDescription || excerpt || content.slice(0, 160),
    publishedAt: new Date(),
  });

  return c.json(
    {
      id: blog.slug,
      _id: (blog._id || blog.id).toString(),
      slug: blog.slug,
      message: 'Blog post created successfully',
    },
    201
  );
});

// PUT Update Blog Post (Protected)
blogRoutes.put('/:id', requireAuth, async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);
  const id = c.req.param('id');
  if (!id) return c.json({ error: 'Missing blog ID' }, 400);

  const b = await Storage.findBlog(id);
  if (!b) {
    return c.json({ error: 'Blog post not found' }, 404);
  }

  const {
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    category,
    categoryId,
    author,
    authorName,
    status,
    seoTitle,
    seoDescription,
  } = await c.req.json();

  const updateData: any = {};
  if (slug && slug !== b.slug) {
    const finalSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const duplicate = await Storage.findBlog(finalSlug);
    if (duplicate && (duplicate._id || duplicate.id) !== (b._id || b.id)) {
      return c.json({ error: 'A blog post with this slug already exists' }, 400);
    }
    updateData.slug = finalSlug;
  }

  if (title !== undefined) updateData.title = title.trim();
  if (excerpt !== undefined) updateData.excerpt = excerpt;
  if (content !== undefined) updateData.content = content;
  if (featuredImage !== undefined) updateData.featuredImage = featuredImage;
  if (category !== undefined) updateData.category = category;
  if (categoryId !== undefined) updateData.categoryId = categoryId;
  if (authorName || author) updateData.author = authorName || author;
  if (status !== undefined) updateData.status = status;
  if (seoTitle !== undefined) updateData.seoTitle = seoTitle;
  if (seoDescription !== undefined) updateData.seoDescription = seoDescription;

  await Storage.updateBlog(id, updateData);

  return c.json({ message: 'Blog post updated successfully' });
});

// DELETE Blog Post (Protected)
blogRoutes.delete('/:id', requireAuth, async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);
  const id = c.req.param('id');
  if (!id) return c.json({ error: 'Missing blog ID' }, 400);

  const b = await Storage.findBlog(id);
  if (!b) {
    return c.json({ error: 'Blog post not found' }, 404);
  }

  await Storage.deleteBlog(id);
  return c.json({ message: 'Blog post deleted successfully' });
});
