import { Hono } from 'hono';
import { hashPassword, verifyPassword, createJWT, requireAuth, getAuthSecret, AppEnv } from '../auth';
import { Storage } from '../storage';
import { connectToDatabase } from '../config/db';
import {
  checkLoginRateLimit,
  recordFailedLoginAttempt,
  resetLoginAttempts,
} from '../utils/rateLimiter';

export const authRoutes = new Hono<AppEnv>();

// Helper to get client IP
function getClientIp(c: any): string {
  const cfIp = c.req.header('cf-connecting-ip');
  if (cfIp) return cfIp;

  const forwarded = c.req.header('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();

  return '127.0.0.1';
}

// Check if setup is needed
authRoutes.get('/setup-status', async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);

  try {
    const count = await Storage.countUsers();
    return c.json({ isSetup: count > 0 });
  } catch (err: any) {
    console.error('Error checking setup status:', err);
    return c.json({ isSetup: false });
  }
});

// Initial setup: Create first admin if no users exist
authRoutes.post('/setup', async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);

  const { name, email, password } = await c.req.json();

  if (!email || !password || !name) {
    return c.json({ error: 'Name, email, and password are required' }, 400);
  }

  if (password.length < 6) {
    return c.json({ error: 'Password must be at least 6 characters long' }, 400);
  }

  const count = await Storage.countUsers();
  if (count > 0) {
    return c.json({ error: 'Admin setup is already completed. Please login.' }, 403);
  }

  const passwordHash = await hashPassword(password);
  const user = await Storage.createUser({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: passwordHash,
    role: 'admin',
  });

  const secret = getAuthSecret(c.env);
  const token = await createJWT(
    {
      id: (user._id || user.id).toString(),
      email: user.email,
      role: user.role,
      name: user.name,
    },
    secret
  );

  return c.json({
    message: 'Admin account created successfully',
    user: {
      id: (user._id || user.id).toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

// Login with Rate Limiting (5 failed attempts / 15 minutes)
authRoutes.post('/login', async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);

  const clientIp = getClientIp(c);

  // Check rate limit before processing login
  const rateLimitStatus = checkLoginRateLimit(clientIp);
  if (rateLimitStatus.isBlocked) {
    return c.json(
      {
        error: `Too many failed login attempts. Please wait ${rateLimitStatus.retryAfterMinutes} minute(s) before trying again.`,
      },
      429
    );
  }

  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ error: 'Email and password are required' }, 400);
  }

  const user = await Storage.findUserByEmail(email.trim());
  if (!user) {
    recordFailedLoginAttempt(clientIp);
    return c.json({ error: 'Invalid email or password' }, 401);
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    recordFailedLoginAttempt(clientIp);
    return c.json({ error: 'Invalid email or password' }, 401);
  }

  // Reset failed login counter on successful authentication
  resetLoginAttempts(clientIp);

  const secret = getAuthSecret(c.env);
  const token = await createJWT(
    {
      id: (user._id || user.id).toString(),
      email: user.email,
      role: user.role,
      name: user.name,
    },
    secret
  );

  return c.json({
    user: {
      id: (user._id || user.id).toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

// Get current logged-in user
authRoutes.get('/me', requireAuth, async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);
  const jwtUser = c.get('user');

  const dbUser = await Storage.findUserById(jwtUser.id);
  if (!dbUser) {
    return c.json({ error: 'User not found' }, 404);
  }

  return c.json({
    user: {
      id: (dbUser._id || dbUser.id).toString(),
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role,
      createdAt: dbUser.createdAt,
      updatedAt: dbUser.updatedAt,
    },
  });
});

// Change password
authRoutes.put('/password', requireAuth, async (c) => {
  await connectToDatabase(c.env?.MONGODB_URI);
  const jwtUser = c.get('user');

  const { currentPassword, newPassword } = await c.req.json();

  if (!currentPassword || !newPassword) {
    return c.json({ error: 'Current password and new password are required' }, 400);
  }

  if (newPassword.length < 6) {
    return c.json({ error: 'New password must be at least 6 characters long' }, 400);
  }

  const dbUser = await Storage.findUserById(jwtUser.id);
  if (!dbUser) {
    return c.json({ error: 'User not found' }, 404);
  }

  const isValid = await verifyPassword(currentPassword, dbUser.password);
  if (!isValid) {
    return c.json({ error: 'Incorrect current password' }, 400);
  }

  const newHash = await hashPassword(newPassword);
  dbUser.password = newHash;
  if (typeof dbUser.save === 'function') {
    await dbUser.save();
  }

  return c.json({ message: 'Password updated successfully' });
});
