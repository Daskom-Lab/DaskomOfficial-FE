import { Hono } from 'hono';
import { Env, EventItem } from '../types';
import { authMiddleware } from '../middleware/auth';

const app = new Hono<{ Bindings: Env }>();

/* ── Public ── */

app.get('/', async (c) => {
  const { results } = await c.env.CMS_DB.prepare(
    'SELECT * FROM events ORDER BY display_order ASC',
  ).all<EventItem>();
  return c.json(results ?? []);
});

app.get('/:id', async (c) => {
  const row = await c.env.CMS_DB.prepare('SELECT * FROM events WHERE id = ?')
    .bind(c.req.param('id')).first<EventItem>();
  if (!row) return c.json({ error: 'Event not found' }, 404);
  return c.json(row);
});

/* ── Admin ── */

app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json<Partial<EventItem>>();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await c.env.CMS_DB.prepare(
    `INSERT INTO events (id, event_name, image_key, display_order, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).bind(id, body.event_name ?? '', body.image_key ?? '', body.display_order ?? 0, now, now).run();

  const row = await c.env.CMS_DB.prepare('SELECT * FROM events WHERE id = ?').bind(id).first<EventItem>();
  return c.json(row, 201);
});

app.put('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json<Partial<EventItem>>();
  const now = new Date().toISOString();

  const existing = await c.env.CMS_DB.prepare('SELECT * FROM events WHERE id = ?').bind(id).first<EventItem>();
  if (!existing) return c.json({ error: 'Event not found' }, 404);

  await c.env.CMS_DB.prepare(
    `UPDATE events SET event_name = ?, image_key = ?, display_order = ?, updated_at = ? WHERE id = ?`,
  ).bind(
    body.event_name ?? existing.event_name,
    body.image_key ?? existing.image_key,
    body.display_order ?? existing.display_order,
    now, id,
  ).run();

  const row = await c.env.CMS_DB.prepare('SELECT * FROM events WHERE id = ?').bind(id).first<EventItem>();
  return c.json(row);
});

app.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const existing = await c.env.CMS_DB.prepare('SELECT id FROM events WHERE id = ?').bind(id).first();
  if (!existing) return c.json({ error: 'Event not found' }, 404);

  await c.env.CMS_DB.prepare('DELETE FROM events WHERE id = ?').bind(id).run();
  return c.json({ success: true });
});

export default app;
