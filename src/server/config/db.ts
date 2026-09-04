import mongoose from 'mongoose';

interface ConnectionCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: ConnectionCache | undefined;
}

const g = globalThis as unknown as { mongooseCache?: ConnectionCache };
const cached: ConnectionCache = g.mongooseCache || { conn: null, promise: null };
if (!g.mongooseCache) {
  g.mongooseCache = cached;
}

export async function connectToDatabase(uri?: string): Promise<typeof mongoose | null> {
  const mongoUri = uri || process.env.MONGODB_URI;

  if (!mongoUri) {
    return null;
  }

  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(mongoUri, opts).then((m) => {
      console.log('✅ Connected to MongoDB Atlas successfully.');
      return m;
    }).catch((err) => {
      console.error('❌ Failed to connect to MongoDB Atlas:', err.message);
      cached.promise = null;
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    return null;
  }
}

export function isDbConnected(): boolean {
  return Boolean(cached.conn && cached.conn.connection.readyState === 1);
}
