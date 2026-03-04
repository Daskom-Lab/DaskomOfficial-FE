import { Hono } from 'hono';
import { Env, Division } from '../types';
import { authMiddleware } from '../middleware/auth';

const app = new Hono<{ Bindings: Env }>();

/* ── Public ── */

app.get('/', async (c) => {
  const { results } = await c.env.CMS_DB.prepare(
    'SELECT * FROM divisions ORDER BY display_order ASC',
  ).all<Division>();
  return c.json(results ?? []);
});

app.get('/:id', async (c) => {
  const row = await c.env.CMS_DB.prepare('SELECT * FROM divisions WHERE id = ?')
    .bind(c.req.param('id')).first<Division>();
  if (!row) return c.json({ error: 'Division not found' }, 404);
  return c.json(row);
});

/* ── Admin ── */

app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json<Partial<Division>>();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await c.env.CMS_DB.prepare(
    `INSERT INTO divisions (id, name, full_name, color, image_key, display_order, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(id, body.name ?? '', body.full_name ?? '', body.color ?? '#000000',
    body.image_key ?? '', body.display_order ?? 0, now, now).run();

  const row = await c.env.CMS_DB.prepare('SELECT * FROM divisions WHERE id = ?').bind(id).first<Division>();
  return c.json(row, 201);
});

app.put('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json<Partial<Division>>();
  const now = new Date().toISOString();

  const existing = await c.env.CMS_DB.prepare('SELECT * FROM divisions WHERE id = ?').bind(id).first<Division>();
  if (!existing) return c.json({ error: 'Division not found' }, 404);

  await c.env.CMS_DB.prepare(
    `UPDATE divisions SET name = ?, full_name = ?, color = ?, image_key = ?, display_order = ?, updated_at = ? WHERE id = ?`,
  ).bind(
    body.name ?? existing.name,
    body.full_name ?? existing.full_name,
    body.color ?? existing.color,
    body.image_key ?? existing.image_key,
    body.display_order ?? existing.display_order,
    now, id,
  ).run();

  const row = await c.env.CMS_DB.prepare('SELECT * FROM divisions WHERE id = ?').bind(id).first<Division>();
  return c.json(row);
});

app.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const existing = await c.env.CMS_DB.prepare('SELECT id FROM divisions WHERE id = ?').bind(id).first();
  if (!existing) return c.json({ error: 'Division not found' }, 404);

  await c.env.CMS_DB.prepare('DELETE FROM divisions WHERE id = ?').bind(id).run();
  return c.json({ success: true });
});

export default app;
