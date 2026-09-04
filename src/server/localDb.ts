import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';

// Local In-Memory & Fallback Database for Dev/Local Environment
class LocalD1Database {
  private users: any[] = [];
  private categories: any[] = [];
  private products: any[] = [];
  private productImages: any[] = [];
  private blogs: any[] = [];
  private media: any[] = [];
  private initialized = false;

  constructor() {
    this.initDefaults();
  }

  private initDefaults() {
    if (this.initialized) return;

    // Load initial categories
    this.categories = CATEGORIES.map((c, i) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description || '',
      image: c.image || '',
      icon_name: c.iconName || 'Layers',
      sort_order: i,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    // Load initial products
    this.products = PRODUCTS.map((p) => {
      const slug = p.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      return {
        id: p.id,
        name: p.name,
        slug: slug,
        category_id: p.category,
        description: p.description || '',
        short_description: p.description || '',
        image: p.image,
        featured: p.featured ? 1 : 0,
        status: 'published',
        seo_title: p.name,
        seo_description: p.description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: new Date().toISOString(),
      };
    });

    // Default admin for easy dev testing
    // password: 'admin' (PBKDF2 hash)
    this.users = [];

    this.initialized = true;
  }

  async exec(_sql: string) {
    this.initDefaults();
    return { success: true };
  }

  prepare(sql: string) {
    const db = this;
    let boundParams: any[] = [];

    return {
      bind(...params: any[]) {
        boundParams = params;
        return this;
      },

      async first(col?: string) {
        const res = await this.all();
        const row = res.results?.[0] || null;
        if (col && row) return row[col];
        return row;
      },

      async all() {
        db.initDefaults();
        const normalizedSql = sql.trim().toUpperCase();

        // 1. Admin users queries
        if (normalizedSql.includes('FROM ADMIN_USERS')) {
          if (normalizedSql.includes('COUNT(*)')) {
            return { results: [{ count: db.users.length }] };
          }
          if (normalizedSql.includes('WHERE EMAIL =')) {
            const email = boundParams[0]?.toLowerCase();
            const user = db.users.find((u) => u.email?.toLowerCase() === email);
            return { results: user ? [user] : [] };
          }
          if (normalizedSql.includes('WHERE ID =')) {
            const id = boundParams[0];
            const user = db.users.find((u) => u.id === id);
            return { results: user ? [user] : [] };
          }
          return { results: db.users };
        }

        // 2. Categories queries
        if (normalizedSql.includes('FROM CATEGORIES')) {
          if (normalizedSql.includes('COUNT(*)')) {
            return { results: [{ c: db.categories.length, count: db.categories.length }] };
          }
          if (normalizedSql.includes('WHERE ID =') || normalizedSql.includes('WHERE C.ID =') || normalizedSql.includes('WHERE SLUG =')) {
            const val = boundParams[0];
            const cat = db.categories.find((c) => c.id === val || c.slug === val);
            if (cat) {
              const productCount = db.products.filter((p) => p.category_id === cat.id).length;
              return { results: [{ ...cat, iconName: cat.icon_name, productCount }] };
            }
            return { results: [] };
          }
          const results = db.categories.map((cat) => ({
            ...cat,
            iconName: cat.icon_name,
            productCount: db.products.filter((p) => p.category_id === cat.id).length,
          }));
          return { results };
        }

        // 3. Products queries
        if (normalizedSql.includes('FROM PRODUCTS')) {
          if (normalizedSql.includes('COUNT(*)')) {
            if (normalizedSql.includes('STATUS = "PUBLISHED"')) {
              return { results: [{ c: db.products.filter((p) => p.status === 'published').length }] };
            }
            if (normalizedSql.includes('STATUS = "DRAFT"')) {
              return { results: [{ c: db.products.filter((p) => p.status === 'draft').length }] };
            }
            if (normalizedSql.includes('FEATURED = 1')) {
              return { results: [{ c: db.products.filter((p) => p.featured === 1).length }] };
            }
            if (normalizedSql.includes('WHERE CATEGORY_ID =')) {
              const catId = boundParams[0];
              return { results: [{ count: db.products.filter((p) => p.category_id === catId).length }] };
            }
            return { results: [{ c: db.products.length, count: db.products.length }] };
          }

          if (normalizedSql.includes('WHERE P.ID =') || normalizedSql.includes('WHERE ID =') || normalizedSql.includes('WHERE P.SLUG =') || normalizedSql.includes('WHERE SLUG =')) {
            const val = boundParams[0];
            const p = db.products.find((item) => item.id === val || item.slug === val);
            if (p) {
              const cat = db.categories.find((c) => c.id === p.category_id);
              return {
                results: [
                  {
                    ...p,
                    category: cat?.slug || p.category_id,
                    categoryName: cat?.name || p.category_id,
                    shortDescription: p.short_description,
                    seoTitle: p.seo_title,
                    seoDescription: p.seo_description,
                    publishedAt: p.published_at,
                    createdAt: p.created_at,
                    updatedAt: p.updated_at,
                  },
                ],
              };
            }
            return { results: [] };
          }

          // List products with category joins and filters
          let list = [...db.products];

          // Filter by status if specified in query/params
          if (boundParams.includes('published')) {
            list = list.filter((p) => p.status === 'published');
          } else if (boundParams.includes('draft')) {
            list = list.filter((p) => p.status === 'draft');
          }

          const results = list.map((p) => {
            const cat = db.categories.find((c) => c.id === p.category_id);
            return {
              ...p,
              category: cat?.slug || p.category_id,
              categoryName: cat?.name || p.category_id,
              shortDescription: p.short_description,
              seoTitle: p.seo_title,
              seoDescription: p.seo_description,
              publishedAt: p.published_at,
              createdAt: p.created_at,
              updatedAt: p.updated_at,
            };
          });

          return { results };
        }

        // 4. Product images
        if (normalizedSql.includes('FROM PRODUCT_IMAGES')) {
          const prodId = boundParams[0];
          const imgs = db.productImages.filter((img) => img.product_id === prodId);
          return { results: imgs };
        }

        // 5. Blogs queries
        if (normalizedSql.includes('FROM BLOGS')) {
          if (normalizedSql.includes('COUNT(*)')) {
            if (normalizedSql.includes('STATUS = "PUBLISHED"')) {
              return { results: [{ c: db.blogs.filter((b) => b.status === 'published').length }] };
            }
            return { results: [{ c: db.blogs.length, count: db.blogs.length }] };
          }

          if (normalizedSql.includes('WHERE B.ID =') || normalizedSql.includes('WHERE ID =') || normalizedSql.includes('WHERE B.SLUG =') || normalizedSql.includes('WHERE SLUG =')) {
            const val = boundParams[0];
            const blog = db.blogs.find((b) => b.id === val || b.slug === val);
            if (blog) {
              const cat = db.categories.find((c) => c.id === blog.category_id);
              return {
                results: [
                  {
                    ...blog,
                    featuredImage: blog.featured_image,
                    categoryId: blog.category_id,
                    categoryName: cat?.name || '',
                    categorySlug: cat?.slug || '',
                    authorName: blog.author_name,
                    seoTitle: blog.seo_title,
                    seoDescription: blog.seo_description,
                    publishedAt: blog.published_at,
                    createdAt: blog.created_at,
                    updatedAt: blog.updated_at,
                  },
                ],
              };
            }
            return { results: [] };
          }

          let list = [...db.blogs];
          if (boundParams.includes('published')) {
            list = list.filter((b) => b.status === 'published');
          }

          const results = list.map((blog) => {
            const cat = db.categories.find((c) => c.id === blog.category_id);
            return {
              ...blog,
              featuredImage: blog.featured_image,
              categoryId: blog.category_id,
              categoryName: cat?.name || '',
              categorySlug: cat?.slug || '',
              authorName: blog.author_name,
              seoTitle: blog.seo_title,
              seoDescription: blog.seo_description,
              publishedAt: blog.published_at,
              createdAt: blog.created_at,
              updatedAt: blog.updated_at,
            };
          });

          return { results };
        }

        // 6. Media queries
        if (normalizedSql.includes('FROM MEDIA')) {
          if (normalizedSql.includes('COUNT(*)')) {
            return { results: [{ c: db.media.length, count: db.media.length }] };
          }
          if (normalizedSql.includes('WHERE ID =')) {
            const id = boundParams[0];
            const item = db.media.find((m) => m.id === id);
            return { results: item ? [item] : [] };
          }
          return { results: db.media };
        }

        return { results: [] };
      },

      async run() {
        db.initDefaults();
        const normalizedSql = sql.trim().toUpperCase();

        // 1. Admin Users Insert / Update
        if (normalizedSql.startsWith('INSERT INTO ADMIN_USERS')) {
          const [id, name, email, password_hash, role] = boundParams;
          db.users.push({
            id,
            name,
            email,
            password_hash,
            role,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
          return { success: true };
        }
        if (normalizedSql.startsWith('UPDATE ADMIN_USERS')) {
          const [password_hash, id] = boundParams;
          const user = db.users.find((u) => u.id === id);
          if (user) {
            user.password_hash = password_hash;
            user.updated_at = new Date().toISOString();
          }
          return { success: true };
        }

        // 2. Categories Insert / Update / Delete
        if (normalizedSql.startsWith('INSERT INTO CATEGORIES')) {
          const [id, name, slug, description, image, icon_name, sort_order] = boundParams;
          db.categories.push({
            id,
            name,
            slug,
            description,
            image,
            icon_name,
            sort_order,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
          return { success: true };
        }
        if (normalizedSql.startsWith('UPDATE CATEGORIES')) {
          const [name, slug, description, image, icon_name, sort_order, id] = boundParams;
          const cat = db.categories.find((c) => c.id === id);
          if (cat) {
            Object.assign(cat, {
              name,
              slug,
              description,
              image,
              icon_name,
              sort_order,
              updated_at: new Date().toISOString(),
            });
          }
          return { success: true };
        }
        if (normalizedSql.startsWith('DELETE FROM CATEGORIES')) {
          const id = boundParams[0];
          db.categories = db.categories.filter((c) => c.id !== id);
          return { success: true };
        }

        // 3. Products Insert / Update / Delete
        if (normalizedSql.startsWith('INSERT INTO PRODUCTS')) {
          const [
            id,
            name,
            slug,
            category_id,
            description,
            short_description,
            image,
            featured,
            status,
            seo_title,
            seo_description,
          ] = boundParams;
          db.products.unshift({
            id,
            name,
            slug,
            category_id,
            description,
            short_description,
            image,
            featured,
            status,
            seo_title,
            seo_description,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            published_at: new Date().toISOString(),
          });
          return { success: true };
        }
        if (normalizedSql.startsWith('UPDATE PRODUCTS')) {
          const [
            name,
            slug,
            category_id,
            description,
            short_description,
            image,
            featured,
            status,
            seo_title,
            seo_description,
            id,
          ] = boundParams;
          const p = db.products.find((item) => item.id === id);
          if (p) {
            Object.assign(p, {
              name,
              slug,
              category_id,
              description,
              short_description,
              image,
              featured,
              status,
              seo_title,
              seo_description,
              updated_at: new Date().toISOString(),
            });
          }
          return { success: true };
        }
        if (normalizedSql.startsWith('DELETE FROM PRODUCTS')) {
          const id = boundParams[0];
          db.products = db.products.filter((p) => p.id !== id);
          return { success: true };
        }

        // 4. Product Images
        if (normalizedSql.startsWith('INSERT INTO PRODUCT_IMAGES')) {
          const [id, product_id, image_url, alt_text, sort_order] = boundParams;
          db.productImages.push({
            id,
            product_id,
            image_url,
            alt_text,
            sort_order,
            created_at: new Date().toISOString(),
          });
          return { success: true };
        }
        if (normalizedSql.startsWith('DELETE FROM PRODUCT_IMAGES')) {
          const prodId = boundParams[0];
          db.productImages = db.productImages.filter((img) => img.product_id !== prodId);
          return { success: true };
        }

        // 5. Blogs Insert / Update / Delete
        if (normalizedSql.startsWith('INSERT INTO BLOGS')) {
          const [
            id,
            title,
            slug,
            excerpt,
            content,
            featured_image,
            category_id,
            author_name,
            status,
            seo_title,
            seo_description,
          ] = boundParams;
          db.blogs.unshift({
            id,
            title,
            slug,
            excerpt,
            content,
            featured_image,
            category_id,
            author_name,
            status,
            seo_title,
            seo_description,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            published_at: new Date().toISOString(),
          });
          return { success: true };
        }
        if (normalizedSql.startsWith('UPDATE BLOGS')) {
          const [
            title,
            slug,
            excerpt,
            content,
            featured_image,
            categoryId,
            author_name,
            status,
            seo_title,
            seo_description,
            id,
          ] = boundParams;
          const blog = db.blogs.find((b) => b.id === id);
          if (blog) {
            Object.assign(blog, {
              title,
              slug,
              excerpt,
              content,
              featured_image,
              category_id: categoryId,
              author_name,
              status,
              seo_title,
              seo_description,
              updated_at: new Date().toISOString(),
            });
          }
          return { success: true };
        }
        if (normalizedSql.startsWith('DELETE FROM BLOGS')) {
          const id = boundParams[0];
          db.blogs = db.blogs.filter((b) => b.id !== id);
          return { success: true };
        }

        // 6. Media Insert / Delete
        if (normalizedSql.startsWith('INSERT INTO MEDIA')) {
          const [id, file_name, url, alt_text, file_type, file_size] = boundParams;
          db.media.unshift({
            id,
            file_name,
            url,
            alt_text,
            file_type,
            file_size,
            created_at: new Date().toISOString(),
          });
          return { success: true };
        }
        if (normalizedSql.startsWith('DELETE FROM MEDIA')) {
          const id = boundParams[0];
          db.media = db.media.filter((m) => m.id !== id);
          return { success: true };
        }

        return { success: true };
      },
    };
  }
}

export const localD1 = new LocalD1Database();
