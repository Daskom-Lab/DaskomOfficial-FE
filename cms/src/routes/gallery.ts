import { Hono } from 'hono';
import { Env, GalleryItem } from '../types';
import { authMiddleware } from '../middleware/auth';

const app = new Hono<{ Bindings: Env }>();

/* ── Public ── */

app.get('/', async (c) => {
  const { results } = await c.env.CMS_DB.prepare(
    'SELECT * FROM gallery ORDER BY display_order ASC',
  ).all<GalleryItem>();
  return c.json(results ?? []);
});

app.get('/:id', async (c) => {
  const row = await c.env.CMS_DB.prepare('SELECT * FROM gallery WHERE id = ?')
    .bind(c.req.param('id')).first<GalleryItem>();
  if (!row) return c.json({ error: 'Gallery item not found' }, 404);
  return c.json(row);
});

/* ── Admin ── */

app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json<Partial<GalleryItem>>();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await c.env.CMS_DB.prepare(
    `INSERT INTO gallery (id, image_key, alt, display_order, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).bind(id, body.image_key ?? '', body.alt ?? '', body.display_order ?? 0, now, now).run();

  const row = await c.env.CMS_DB.prepare('SELECT * FROM gallery WHERE id = ?').bind(id).first<GalleryItem>();
  return c.json(row, 201);
});

app.put('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json<Partial<GalleryItem>>();
  const now = new Date().toISOString();

  const existing = await c.env.CMS_DB.prepare('SELECT * FROM gallery WHERE id = ?').bind(id).first<GalleryItem>();
  if (!existing) return c.json({ error: 'Gallery item not found' }, 404);

  await c.env.CMS_DB.prepare(
    `UPDATE gallery SET image_key = ?, alt = ?, display_order = ?, updated_at = ? WHERE id = ?`,
  ).bind(
    body.image_key ?? existing.image_key,
    body.alt ?? existing.alt,
    body.display_order ?? existing.display_order,
    now, id,
  ).run();

  const row = await c.env.CMS_DB.prepare('SELECT * FROM gallery WHERE id = ?').bind(id).first<GalleryItem>();
  return c.json(row);
});

app.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const existing = await c.env.CMS_DB.prepare('SELECT id FROM gallery WHERE id = ?').bind(id).first();
  if (!existing) return c.json({ error: 'Gallery item not found' }, 404);

  await c.env.CMS_DB.prepare('DELETE FROM gallery WHERE id = ?').bind(id).run();
  return c.json({ success: true });
});

export default app;
