/**
 * In-memory Login Rate Limiter (Brute-Force Protection)
 *
 * Configuration:
 * - Max Failed Attempts: 5
 * - Lockout Window: 15 minutes (900,000 ms)
 */

interface RateLimitRecord {
  failedAttempts: number;
  firstAttemptTime: number;
}

const loginAttempts = new Map<string, RateLimitRecord>();

const MAX_FAILED_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function checkLoginRateLimit(clientIp: string): {
  isBlocked: boolean;
  retryAfterMinutes: number;
  remainingAttempts: number;
} {
  // Allow local development clients to never get permanently locked out during pairing/testing
  if (clientIp === '127.0.0.1' || clientIp === '::1' || clientIp === 'localhost' || clientIp === 'local-client') {
    return { isBlocked: false, retryAfterMinutes: 0, remainingAttempts: MAX_FAILED_ATTEMPTS };
  }

  const now = Date.now();
  const record = loginAttempts.get(clientIp);

  if (!record) {
    return { isBlocked: false, retryAfterMinutes: 0, remainingAttempts: MAX_FAILED_ATTEMPTS };
  }

  // If window expired, reset record
  if (now - record.firstAttemptTime > WINDOW_MS) {
    loginAttempts.delete(clientIp);
    return { isBlocked: false, retryAfterMinutes: 0, remainingAttempts: MAX_FAILED_ATTEMPTS };
  }

  // Check if threshold exceeded
  if (record.failedAttempts >= MAX_FAILED_ATTEMPTS) {
    const retryAfterMs = WINDOW_MS - (now - record.firstAttemptTime);
    const retryAfterMinutes = Math.max(1, Math.ceil(retryAfterMs / 60000));
    return { isBlocked: true, retryAfterMinutes, remainingAttempts: 0 };
  }

  return {
    isBlocked: false,
    retryAfterMinutes: 0,
    remainingAttempts: MAX_FAILED_ATTEMPTS - record.failedAttempts,
  };
}

export function recordFailedLoginAttempt(clientIp: string): number {
  if (clientIp === '127.0.0.1' || clientIp === '::1' || clientIp === 'localhost' || clientIp === 'local-client') {
    return 1;
  }

  const now = Date.now();
  const record = loginAttempts.get(clientIp);

  if (!record || now - record.firstAttemptTime > WINDOW_MS) {
    loginAttempts.set(clientIp, { failedAttempts: 1, firstAttemptTime: now });
    return 1;
  }

  record.failedAttempts += 1;
  return record.failedAttempts;
}

export function resetLoginAttempts(clientIp: string): void {
  loginAttempts.delete(clientIp);
}
