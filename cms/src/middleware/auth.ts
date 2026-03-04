import { Context, Next } from 'hono';
import { Env } from '../types';
import { verifyToken } from '../routes/auth';

/**
 * Middleware that validates a Bearer JWT token from the Authorization header.
 */
export async function authMiddleware(
  c: Context<{ Bindings: Env }>,
  next: Next,
) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized. Provide a valid Bearer token.' }, 401);
  }

  const token = authHeader.slice(7);
  const payload = await verifyToken(token, c.env.JWT_SECRET);

  if (!payload) {
    return c.json({ error: 'Invalid or expired token.' }, 401);
  }

  await next();
}
