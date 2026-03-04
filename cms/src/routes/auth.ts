import { Hono } from 'hono';
import { Env } from '../types';

const app = new Hono<{ Bindings: Env }>();

/* ─── Helper: sign a JWT-like token with HMAC-SHA256 ─── */

async function signToken(payload: object, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const body = btoa(JSON.stringify(payload))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const data = `${header}.${body}`;

  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${data}.${sigB64}`;
}

/* ─── POST /login ─── */
app.post('/login', async (c) => {
  const { username, password } = await c.req.json<{ username: string; password: string }>();

  if (!username || !password) {
    return c.json({ error: 'Username and password are required.' }, 400);
  }

  if (username !== c.env.ADMIN_USERNAME || password !== c.env.ADMIN_PASSWORD) {
    return c.json({ error: 'Invalid credentials.' }, 401);
  }

  const now = Math.floor(Date.now() / 1000);
  const token = await signToken(
    { sub: username, iat: now, exp: now + 86400 }, // 24 h
    c.env.JWT_SECRET,
  );

  return c.json({ token, expiresIn: 86400 });
});

/* ─── GET /me — verify current session ─── */
app.get('/me', async (c) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Not authenticated' }, 401);
  }

  const token = authHeader.slice(7);
  const valid = await verifyToken(token, c.env.JWT_SECRET);
  if (!valid) return c.json({ error: 'Invalid or expired token' }, 401);

  return c.json({ username: valid.sub });
});

/* ─── Token verification (exported for middleware) ─── */
export async function verifyToken(
  token: string,
  secret: string,
): Promise<{ sub: string; iat: number; exp: number } | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const enc = new TextEncoder();
    const data = `${parts[0]}.${parts[1]}`;

    const key = await crypto.subtle.importKey(
      'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'],
    );

    // Decode signature
    const sigStr = parts[2].replace(/-/g, '+').replace(/_/g, '/');
    const sigPadded = sigStr + '='.repeat((4 - (sigStr.length % 4)) % 4);
    const sigBytes = Uint8Array.from(atob(sigPadded), (ch) => ch.charCodeAt(0));

    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(data));
    if (!valid) return null;

    // Decode payload
    const payloadStr = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const payloadPadded = payloadStr + '='.repeat((4 - (payloadStr.length % 4)) % 4);
    const payload = JSON.parse(atob(payloadPadded));

    // Check expiry
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}

export default app;
