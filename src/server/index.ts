import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { v2 as cloudinary } from 'cloudinary';
import { authRoutes } from './routes/authRoutes';
import { categoryRoutes } from './routes/categoryRoutes';
import { productRoutes } from './routes/productRoutes';
import { blogRoutes } from './routes/blogRoutes';
import { mediaRoutes } from './routes/mediaRoutes';
import { seedRoutes } from './routes/seedRoutes';
import { AppEnv } from './auth';
import { connectToDatabase, isDbConnected } from './config/db';

const app = new Hono<AppEnv>();

// 1. Global Security Headers Middleware
app.use('*', async (c, next) => {
  await next();
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  c.header('X-XSS-Protection', '1; mode=block');
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
});

// 2. Enable CORS
app.use('*', cors());

// Basic Health check
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    database: 'MongoDB (Mongoose)',
    storage: 'Cloudinary',
    isDbConnected: isDbConnected(),
    time: new Date().toISOString(),
  });
});

// Deep Diagnostics for MongoDB and Cloudinary
app.get('/api/health/diagnostics', async (c) => {
  const mongoUri = c.env?.MONGODB_URI || process.env.MONGODB_URI;
  const cloudName = c.env?.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = c.env?.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY;
  const apiSecret = c.env?.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET;

  const results: {
    timestamp: string;
    mongodb: {
      configured: boolean;
      status: 'connected' | 'error' | 'not_configured';
      databaseName?: string;
      latencyMs?: number;
      collections?: string[];
      error?: string;
    };
    cloudinary: {
      configured: boolean;
      status: 'connected' | 'error' | 'not_configured';
      cloudName?: string;
      apiPing?: boolean;
      uploadVerified?: boolean;
      error?: string;
    };
  } = {
    timestamp: new Date().toISOString(),
    mongodb: {
      configured: Boolean(
        mongoUri &&
        !mongoUri.includes('username:password') &&
        !mongoUri.includes('<db_password>')
      ),
      status: 'not_configured',
    },
    cloudinary: {
      configured: Boolean(
        cloudName &&
        apiKey &&
        apiSecret &&
        !cloudName.includes('your-cloud') &&
        !apiKey.includes('your-api')
      ),
      status: 'not_configured',
    },
  };

  // 1. Test MongoDB Connection
  if (results.mongodb.configured && mongoUri) {
    const startTime = Date.now();
    try {
      const conn = await connectToDatabase(mongoUri);
      if (conn && conn.connection.readyState === 1 && conn.connection.db) {
        await conn.connection.db.admin().ping();
        const latencyMs = Date.now() - startTime;
        const collections = await conn.connection.db.listCollections().toArray();

        results.mongodb.status = 'connected';
        results.mongodb.databaseName = conn.connection.db.databaseName;
        results.mongodb.latencyMs = latencyMs;
        results.mongodb.collections = collections.map((col) => col.name);
      } else {
        results.mongodb.status = 'error';
        results.mongodb.error = 'Mongoose readyState is not 1 (connected)';
      }
    } catch (err: any) {
      results.mongodb.status = 'error';
      results.mongodb.error = err.message || String(err);
    }
  } else {
    results.mongodb.error = 'MONGODB_URI is missing or contains template placeholders in .env';
  }

  // 2. Test Cloudinary Connection & Permissions
  if (results.cloudinary.configured && cloudName && apiKey && apiSecret) {
    try {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
      });

      // Ping Cloudinary API
      const pingRes = await cloudinary.api.ping();
      results.cloudinary.apiPing = pingRes.status === 'ok';
      results.cloudinary.cloudName = cloudName;

      // Test a 1x1 pixel upload & deletion to verify full read/write permissions
      const testPixel =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      const uploadRes = await cloudinary.uploader.upload(testPixel, {
        folder: 'test_diagnostics',
        public_id: `diag_test_${Date.now()}`,
      });

      if (uploadRes && uploadRes.public_id) {
        results.cloudinary.uploadVerified = true;
        // Clean up test image
        await cloudinary.uploader.destroy(uploadRes.public_id);
      }

      results.cloudinary.status = 'connected';
    } catch (err: any) {
      results.cloudinary.status = 'error';
      results.cloudinary.error = err.message || String(err);
    }
  } else {
    results.cloudinary.error = 'Cloudinary credentials missing or contain template placeholders in .env';
  }

  const allHealthy =
    results.mongodb.status === 'connected' && results.cloudinary.status === 'connected';

  return c.json(
    {
      allHealthy,
      diagnostics: results,
    },
    200
  );
});

// Middleware to ensure environment and DB connection
app.use('/api/*', async (c, next) => {
  if (!c.env) {
    (c as any).env = {};
  }
  if (!c.env.AUTH_SECRET) {
    c.env.AUTH_SECRET = process.env.AUTH_SECRET || 'new-pashupati-suppliers-secret-key-2026';
  }
  if (!c.env.MONGODB_URI) {
    c.env.MONGODB_URI = process.env.MONGODB_URI;
  }

  // Attempt database connection if URI is present
  if (c.env.MONGODB_URI) {
    await connectToDatabase(c.env.MONGODB_URI);
  }

  await next();
});

// Mount modular API routes
app.route('/api/auth', authRoutes);
app.route('/api/categories', categoryRoutes);
app.route('/api/products', productRoutes);
app.route('/api/blogs', blogRoutes);
app.route('/api/media', mediaRoutes);
app.route('/api/admin', seedRoutes);

// Fallback for unhandled /api requests
app.all('/api/*', (c) => {
  return c.json({ error: 'API route not found' }, 404);
});

// Export default for Cloudflare Workers & Vite dev server
export default {
  async fetch(request: Request, env: AppEnv['Bindings'], ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // If it's an API request, handle with Hono
    if (url.pathname.startsWith('/api')) {
      return app.fetch(request, env, ctx);
    }

    // Otherwise, let Cloudflare Worker Static Assets handle the SPA
    if (env && env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return app.fetch(request, env, ctx);
  },
};

export { app };
