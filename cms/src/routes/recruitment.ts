import { Hono } from 'hono';
import { Env, RecruitmentContent } from '../types';
import { authMiddleware } from '../middleware/auth';

const app = new Hono<{ Bindings: Env }>();

/* ── Public ── */

app.get('/', async (c) => {
  const row = await c.env.CMS_DB.prepare('SELECT * FROM recruitment WHERE id = 1').first<RecruitmentContent>();
  if (!row) return c.json({ error: 'Recruitment content not configured' }, 404);
  return c.json(row);
});

/* ── Admin ── */

app.put('/', authMiddleware, async (c) => {
  const body = await c.req.json<Partial<RecruitmentContent>>();
  const now = new Date().toISOString();

  const existing = await c.env.CMS_DB.prepare('SELECT * FROM recruitment WHERE id = 1').first<RecruitmentContent>();

  await c.env.CMS_DB.prepare(
    `UPDATE recruitment SET general_requirements = ?, specific_requirements = ?, apply_url = ?, is_open = ?, updated_at = ? WHERE id = 1`,
  ).bind(
    body.general_requirements ?? existing?.general_requirements ?? '[]',
    body.specific_requirements ?? existing?.specific_requirements ?? '[]',
    body.apply_url ?? existing?.apply_url ?? '',
    body.is_open ?? existing?.is_open ?? 1,
    now,
  ).run();

  const row = await c.env.CMS_DB.prepare('SELECT * FROM recruitment WHERE id = 1').first<RecruitmentContent>();
  return c.json(row);
});

export default app;
