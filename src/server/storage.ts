import { isDbConnected } from './config/db';
import { User } from './models/User';
import { Product } from './models/Product';
import { Blog } from './models/Blog';
import { Category } from './models/Category';
import { Media } from './models/Media';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';

// Security utility: Escape regex special characters to prevent NoSQL regex injection & ReDoS
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Pre-hashed password for default admin: 'password123' (PBKDF2 100k iterations with SHA-256)
const DEFAULT_ADMIN_HASH =
  '75ca193358102bb4928aaff23bcb965d:c9c8abd5c7f9ae0fcbf565d47ca985255125498d6033259ee874d0f2ebacc76d';

// Global cache attached to globalThis so Vite dev server reloads do NOT wipe CMS state
const g = globalThis as any;
if (!g.__pashupati_memory_store) {
  g.__pashupati_memory_store = {
    users: [
      {
        id: 'admin_master_1',
        _id: 'admin_master_1',
        name: 'System Admin',
        email: 'admin@pashupatisuppliers.com',
        password: DEFAULT_ADMIN_HASH,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    categories: CATEGORIES.map((c, i) => ({
      id: c.slug,
      _id: `cat_${c.slug}`,
      name: c.name,
      slug: c.slug,
      description: c.description || '',
      image: c.image || `/assets/categories/${c.slug}.jpg`,
      iconName: c.iconName || 'Layers',
      type: 'product',
      sortOrder: i,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    products: PRODUCTS.map((p) => {
      const slug = p.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      return {
        id: slug,
        _id: `prod_${slug}`,
        name: p.name,
        slug: slug,
        category: p.category,
        categoryId: p.category,
        description: p.description,
        shortDescription: p.description,
        featuredImage: p.image,
        image: p.image,
        images: [{ url: p.image, altText: p.name, sortOrder: 0 }],
        featured: Boolean(p.featured),
        status: 'published',
        seoTitle: p.name,
        seoDescription: p.description,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }),
    blogs: [],
    media: [],
  };
}

const memory = g.__pashupati_memory_store;

export const Storage = {
  // Users
  async countUsers(): Promise<number> {
    if (isDbConnected()) {
      return User.countDocuments();
    }
    return memory.users.length;
  },

  async createUser(data: any): Promise<any> {
    if (isDbConnected()) {
      return User.create(data);
    }
    const user = {
      _id: `user_${Date.now().toString(36)}`,
      id: `user_${Date.now().toString(36)}`,
      name: data.name,
      email: data.email.toLowerCase(),
      password: data.password,
      role: data.role || 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memory.users.push(user);
    return user;
  },

  async findUserByEmail(email: string): Promise<any> {
    if (isDbConnected()) {
      return User.findOne({ email: email.toLowerCase() });
    }
    return memory.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async findUserById(id: string): Promise<any> {
    if (isDbConnected()) {
      return User.findById(id);
    }
    return memory.users.find((u: any) => u.id === id || u._id === id) || null;
  },

  // Categories
  async getCategories(): Promise<any[]> {
    if (isDbConnected()) {
      const cats = await Category.find().sort({ sortOrder: 1, name: 1 }).lean();
      return cats;
    }
    return [...memory.categories].sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0));
  },

  async findCategory(idOrSlug: string): Promise<any> {
    if (isDbConnected()) {
      return Category.findOne({
        $or: [{ slug: idOrSlug }, { _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null }],
      }).lean();
    }
    return (
      memory.categories.find(
        (c: any) => c.slug === idOrSlug || c.id === idOrSlug || c._id === idOrSlug
      ) || null
    );
  },

  async createCategory(data: any): Promise<any> {
    if (isDbConnected()) {
      return Category.create(data);
    }
    const cat = {
      _id: `cat_${Date.now().toString(36)}`,
      id: data.slug,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memory.categories.push(cat);
    return cat;
  },

  async updateCategory(id: string, data: any): Promise<any> {
    if (isDbConnected()) {
      const cat = await Category.findOne({
        $or: [{ slug: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
      if (!cat) return null;
      Object.assign(cat, data);
      await cat.save();
      return cat;
    }
    const idx = memory.categories.findIndex(
      (c: any) => c.slug === id || c.id === id || c._id === id
    );
    if (idx === -1) return null;
    memory.categories[idx] = { ...memory.categories[idx], ...data, updatedAt: new Date() };
    return memory.categories[idx];
  },

  async deleteCategory(id: string): Promise<boolean> {
    if (isDbConnected()) {
      const res = await Category.deleteOne({
        $or: [{ slug: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
      return res.deletedCount > 0;
    }
    const idx = memory.categories.findIndex(
      (c: any) => c.slug === id || c.id === id || c._id === id
    );
    if (idx === -1) return false;
    memory.categories.splice(idx, 1);
    return true;
  },

  // Products with sanitization and pagination support
  async getProducts(filter: any = {}): Promise<any[]> {
    const page = Math.max(1, parseInt(filter.page) || 1);
    const limit = Math.min(1000, Math.max(1, parseInt(filter.limit) || 1000));
    const skip = (page - 1) * limit;

    if (isDbConnected()) {
      const query: any = {};
      if (filter.status && filter.status !== 'all') query.status = filter.status;
      if (filter.category && filter.category !== 'all') {
        query.$or = [{ category: filter.category }, { categoryId: filter.category }];
      }
      if (filter.featured) query.featured = true;
      if (filter.search && typeof filter.search === 'string') {
        const safeSearch = escapeRegExp(filter.search.trim());
        query.$or = [
          ...(query.$or || []),
          { name: { $regex: safeSearch, $options: 'i' } },
          { description: { $regex: safeSearch, $options: 'i' } },
          { category: { $regex: safeSearch, $options: 'i' } },
        ];
      }
      return Product.find(query)
        .sort({ featured: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
    }

    let list = [...memory.products];
    if (filter.status && filter.status !== 'all') {
      list = list.filter((p: any) => p.status === filter.status);
    }
    if (filter.category && filter.category !== 'all') {
      list = list.filter(
        (p: any) => p.category === filter.category || p.categoryId === filter.category
      );
    }
    if (filter.featured) {
      list = list.filter((p: any) => p.featured);
    }
    if (filter.search && typeof filter.search === 'string') {
      const s = filter.search.toLowerCase().trim();
      list = list.filter(
        (p: any) =>
          p.name.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          (p.category && p.category.toLowerCase().includes(s))
      );
    }
    return list.sort((a: any, b: any) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)).slice(skip, skip + limit);
  },

  async findProduct(idOrSlug: string): Promise<any> {
    if (isDbConnected()) {
      return Product.findOne({
        $or: [{ slug: idOrSlug }, { _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null }],
      }).lean();
    }
    return (
      memory.products.find(
        (p: any) => p.slug === idOrSlug || p.id === idOrSlug || p._id === idOrSlug
      ) || null
    );
  },

  async createProduct(data: any): Promise<any> {
    if (isDbConnected()) {
      return Product.create(data);
    }
    const prod = {
      _id: `prod_${Date.now().toString(36)}`,
      id: data.slug,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memory.products.unshift(prod);
    return prod;
  },

  async updateProduct(id: string, data: any): Promise<any> {
    if (isDbConnected()) {
      const p = await Product.findOne({
        $or: [{ slug: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
      if (!p) return null;
      Object.assign(p, data);
      await p.save();
      return p;
    }
    const idx = memory.products.findIndex(
      (p: any) => p.slug === id || p.id === id || p._id === id
    );
    if (idx === -1) return null;
    memory.products[idx] = { ...memory.products[idx], ...data, updatedAt: new Date() };
    return memory.products[idx];
  },

  async deleteProduct(id: string): Promise<boolean> {
    if (isDbConnected()) {
      const res = await Product.deleteOne({
        $or: [{ slug: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
      return res.deletedCount > 0;
    }
    const idx = memory.products.findIndex(
      (p: any) => p.slug === id || p.id === id || p._id === id
    );
    if (idx === -1) return false;
    memory.products.splice(idx, 1);
    return true;
  },

  async countProductsInCategory(catSlugOrId: string): Promise<number> {
    if (isDbConnected()) {
      return Product.countDocuments({
        $or: [{ category: catSlugOrId }, { categoryId: catSlugOrId }],
      });
    }
    return memory.products.filter(
      (p: any) => p.category === catSlugOrId || p.categoryId === catSlugOrId
    ).length;
  },

  // Blogs with sanitization and pagination
  async getBlogs(filter: any = {}): Promise<any[]> {
    const page = Math.max(1, parseInt(filter.page) || 1);
    const limit = Math.min(1000, Math.max(1, parseInt(filter.limit) || 1000));
    const skip = (page - 1) * limit;

    if (isDbConnected()) {
      const query: any = {};
      if (filter.status && filter.status !== 'all') query.status = filter.status;
      if (filter.category && filter.category !== 'all') {
        query.$or = [{ category: filter.category }, { categoryId: filter.category }];
      }
      if (filter.search && typeof filter.search === 'string') {
        const safeSearch = escapeRegExp(filter.search.trim());
        query.$or = [
          ...(query.$or || []),
          { title: { $regex: safeSearch, $options: 'i' } },
          { excerpt: { $regex: safeSearch, $options: 'i' } },
          { content: { $regex: safeSearch, $options: 'i' } },
        ];
      }
      return Blog.find(query)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
    }

    let list = [...memory.blogs];
    if (filter.status && filter.status !== 'all') {
      list = list.filter((b: any) => b.status === filter.status);
    }
    if (filter.category && filter.category !== 'all') {
      list = list.filter(
        (b: any) => b.category === filter.category || b.categoryId === filter.category
      );
    }
    if (filter.search && typeof filter.search === 'string') {
      const s = filter.search.toLowerCase().trim();
      list = list.filter(
        (b: any) =>
          b.title.toLowerCase().includes(s) ||
          (b.excerpt && b.excerpt.toLowerCase().includes(s)) ||
          (b.content && b.content.toLowerCase().includes(s))
      );
    }
    return list.slice(skip, skip + limit);
  },

  async findBlog(idOrSlug: string): Promise<any> {
    if (isDbConnected()) {
      return Blog.findOne({
        $or: [{ slug: idOrSlug }, { _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null }],
      }).lean();
    }
    return (
      memory.blogs.find(
        (b: any) => b.slug === idOrSlug || b.id === idOrSlug || b._id === idOrSlug
      ) || null
    );
  },

  async createBlog(data: any): Promise<any> {
    if (isDbConnected()) {
      return Blog.create(data);
    }
    const blog = {
      _id: `blog_${Date.now().toString(36)}`,
      id: data.slug,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memory.blogs.unshift(blog);
    return blog;
  },

  async updateBlog(id: string, data: any): Promise<any> {
    if (isDbConnected()) {
      const b = await Blog.findOne({
        $or: [{ slug: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
      if (!b) return null;
      Object.assign(b, data);
      await b.save();
      return b;
    }
    const idx = memory.blogs.findIndex((b: any) => b.slug === id || b.id === id || b._id === id);
    if (idx === -1) return null;
    memory.blogs[idx] = { ...memory.blogs[idx], ...data, updatedAt: new Date() };
    return memory.blogs[idx];
  },

  async deleteBlog(id: string): Promise<boolean> {
    if (isDbConnected()) {
      const res = await Blog.deleteOne({
        $or: [{ slug: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
      return res.deletedCount > 0;
    }
    const idx = memory.blogs.findIndex((b: any) => b.slug === id || b.id === id || b._id === id);
    if (idx === -1) return false;
    memory.blogs.splice(idx, 1);
    return true;
  },

  // Media
  async getMedia(): Promise<any[]> {
    if (isDbConnected()) {
      return Media.find().sort({ createdAt: -1 }).lean();
    }
    return [...memory.media];
  },

  async createMedia(data: any): Promise<any> {
    if (isDbConnected()) {
      return Media.create(data);
    }
    const item = {
      _id: `media_${Date.now().toString(36)}`,
      id: `media_${Date.now().toString(36)}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memory.media.unshift(item);
    return item;
  },

  async findMediaById(id: string): Promise<any> {
    if (isDbConnected()) {
      return Media.findById(id);
    }
    return memory.media.find((m: any) => m.id === id || m._id === id) || null;
  },

  async deleteMedia(id: string): Promise<boolean> {
    if (isDbConnected()) {
      const res = await Media.deleteOne({ _id: id });
      return res.deletedCount > 0;
    }
    const idx = memory.media.findIndex((m: any) => m.id === id || m._id === id);
    if (idx === -1) return false;
    memory.media.splice(idx, 1);
    return true;
  },

  // Stats
  async getStats(): Promise<any> {
    const [products, categories, blogs, media] = await Promise.all([
      this.getProducts({ status: 'all', limit: 1000 }),
      this.getCategories(),
      this.getBlogs({ status: 'all', limit: 1000 }),
      this.getMedia(),
    ]);

    return {
      stats: {
        totalProducts: products.length,
        publishedProducts: products.filter((p: any) => p.status === 'published').length,
        draftProducts: products.filter((p: any) => p.status === 'draft').length,
        featuredProducts: products.filter((p: any) => p.featured).length,
        totalCategories: categories.length,
        totalBlogs: blogs.length,
        publishedBlogs: blogs.filter((b: any) => b.status === 'published').length,
        totalMedia: media.length,
      },
      recentProducts: products.slice(0, 5),
      recentBlogs: blogs.slice(0, 5),
    };
  },
};
