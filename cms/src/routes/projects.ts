import { Hono } from 'hono';
import { Env, Project } from '../types';
import { authMiddleware } from '../middleware/auth';

const app = new Hono<{ Bindings: Env }>();

/* ── Public ── */

app.get('/', async (c) => {
  const { results } = await c.env.CMS_DB.prepare(
    'SELECT * FROM projects ORDER BY display_order ASC',
  ).all<Project>();
  return c.json(results ?? []);
});

app.get('/:id', async (c) => {
  const row = await c.env.CMS_DB.prepare('SELECT * FROM projects WHERE id = ?')
    .bind(c.req.param('id')).first<Project>();
  if (!row) return c.json({ error: 'Project not found' }, 404);
  return c.json(row);
});

/* ── Admin ── */

app.post('/', authMiddleware, async (c) => {
  const body = await c.req.json<Partial<Project>>();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await c.env.CMS_DB.prepare(
    `INSERT INTO projects (id, year, title, description, image_key, alt, display_order, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(id, body.year ?? '', body.title ?? '', body.description ?? '',
    body.image_key ?? '', body.alt ?? '', body.display_order ?? 0, now, now).run();

  const row = await c.env.CMS_DB.prepare('SELECT * FROM projects WHERE id = ?').bind(id).first<Project>();
  return c.json(row, 201);
});

app.put('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json<Partial<Project>>();
  const now = new Date().toISOString();

  const existing = await c.env.CMS_DB.prepare('SELECT * FROM projects WHERE id = ?').bind(id).first<Project>();
  if (!existing) return c.json({ error: 'Project not found' }, 404);

  await c.env.CMS_DB.prepare(
    `UPDATE projects SET year = ?, title = ?, description = ?, image_key = ?, alt = ?, display_order = ?, updated_at = ? WHERE id = ?`,
  ).bind(
    body.year ?? existing.year,
    body.title ?? existing.title,
    body.description ?? existing.description,
    body.image_key ?? existing.image_key,
    body.alt ?? existing.alt,
    body.display_order ?? existing.display_order,
    now, id,
  ).run();

  const row = await c.env.CMS_DB.prepare('SELECT * FROM projects WHERE id = ?').bind(id).first<Project>();
  return c.json(row);
});

app.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const existing = await c.env.CMS_DB.prepare('SELECT id FROM projects WHERE id = ?').bind(id).first();
  if (!existing) return c.json({ error: 'Project not found' }, 404);

  await c.env.CMS_DB.prepare('DELETE FROM projects WHERE id = ?').bind(id).run();
  return c.json({ success: true });
});

export default app;
