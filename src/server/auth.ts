import { Context, Next } from 'hono';
import { SignJWT, jwtVerify } from 'jose';

// PBKDF2 Password Hashing with Web Crypto API (100% Edge & Cloudflare Workers compatible)
const ITERATIONS = 100000;
const KEY_LEN = 32; // 256 bits

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const encoder = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    passwordKey,
    KEY_LEN * 8
  );

  const saltHex = Array.from(salt).map((b) => b.toString(16).padStart(2, '0')).join('');
  const hashHex = Array.from(new Uint8Array(derivedBits))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return `${saltHex}:${hashHex}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (!storedHash || !storedHash.includes(':')) {
    return false;
  }

  const [saltHex, expectedHashHex] = storedHash.split(':');
  if (!saltHex || !expectedHashHex) return false;

  const salt = new Uint8Array(
    saltHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );

  const encoder = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    passwordKey,
    KEY_LEN * 8
  );

  const actualHashHex = Array.from(new Uint8Array(derivedBits))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return actualHashHex === expectedHashHex;
}

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
  name: string;
}

export type AppEnv = {
  Bindings: {
    DB?: any;
    AUTH_SECRET?: string;
    MONGODB_URI?: string;
    CLOUDINARY_CLOUD_NAME?: string;
    CLOUDINARY_API_KEY?: string;
    CLOUDINARY_API_SECRET?: string;
    ASSETS?: any;
  };
  Variables: { user: JWTPayload };
};

export function getAuthSecret(env?: any): string {
  return env?.AUTH_SECRET || process.env.AUTH_SECRET || 'new-pashupati-suppliers-secret-key-2026';
}

export async function createJWT(payload: JWTPayload, secret?: string): Promise<string> {
  const effectiveSecret = secret || getAuthSecret();
  const secretKey = new TextEncoder().encode(effectiveSecret);
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);
}

export async function verifyJWT(token: string, secret?: string): Promise<JWTPayload | null> {
  try {
    const effectiveSecret = secret || getAuthSecret();
    const secretKey = new TextEncoder().encode(effectiveSecret);
    const { payload } = await jwtVerify(token, secretKey);
    return {
      id: payload.id as string,
      email: payload.email as string,
      role: payload.role as string,
      name: payload.name as string,
    };
  } catch (err: any) {
    console.error('JWT Verification Failed:', err?.message || err);
    return null;
  }
}

// Hono Authentication Middleware for Protected Routes
export async function requireAuth(c: Context<AppEnv>, next: Next) {
  const authHeader = c.req.header('Authorization');
  let token: string | undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else {
    // Check cookie fallback
    const cookie = c.req.header('Cookie');
    if (cookie) {
      const match = cookie.match(/auth_token=([^;]+)/);
      if (match) token = match[1];
    }
  }

  if (!token) {
    return c.json({ error: 'Unauthorized: Missing authentication token' }, 401);
  }

  const secret = getAuthSecret(c.env);
  const user = await verifyJWT(token, secret);

  if (!user) {
    return c.json({ error: 'Unauthorized: Invalid or expired token' }, 401);
  }

  c.set('user', user);
  await next();
}
