import { Hono } from 'hono';
import { Env, AboutContent } from '../types';
import { authMiddleware } from '../middleware/auth';

const app = new Hono<{ Bindings: Env }>();

/* ── Public ── */

app.get('/', async (c) => {
  const row = await c.env.CMS_DB.prepare('SELECT * FROM about WHERE id = 1').first<AboutContent>();
  if (!row || !row.title) return c.json({ error: 'About content not configured' }, 404);
  return c.json(row);
});

/* ── Admin ── */

app.put('/', authMiddleware, async (c) => {
  const body = await c.req.json<Partial<AboutContent>>();
  const now = new Date().toISOString();

  const existing = await c.env.CMS_DB.prepare('SELECT * FROM about WHERE id = 1').first<AboutContent>();

  await c.env.CMS_DB.prepare(
    `UPDATE about SET title = ?, description = ?, hero_image_key = ?, logo_image_key = ?, home_image_key = ?, location_description = ?, map_embed_url = ?, updated_at = ? WHERE id = 1`,
  ).bind(
    body.title ?? existing?.title ?? '',
    body.description ?? existing?.description ?? '',
    body.hero_image_key ?? existing?.hero_image_key ?? '',
    body.logo_image_key ?? existing?.logo_image_key ?? '',
    body.home_image_key ?? existing?.home_image_key ?? '',
    body.location_description ?? existing?.location_description ?? '',
    body.map_embed_url ?? existing?.map_embed_url ?? '',
    now,
  ).run();

  const row = await c.env.CMS_DB.prepare('SELECT * FROM about WHERE id = 1').first<AboutContent>();
  return c.json(row);
});

export default app;
