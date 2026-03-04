import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Env } from './types';

import authRoute from './routes/auth';
import divisionsRoute from './routes/divisions';
import projectsRoute from './routes/projects';
import galleryRoute from './routes/gallery';
import eventsRoute from './routes/events';
import aboutRoute from './routes/about';
import recruitmentRoute from './routes/recruitment';
import uploadRoute from './routes/upload';
import { authMiddleware } from './middleware/auth';
import { seedData } from './seed';

const app = new Hono<{ Bindings: Env }>();

/* ─── CORS ─── */
app.use(
  '/*',
  cors({
    origin: (origin) => {
      const allowed = [
        'https://daskomlab.com',
        'https://www.daskomlab.com',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
      ];
      if (!origin) return '*';
      if (allowed.includes(origin)) return origin;
      if (origin.endsWith('.daskomlab.com')) return origin;
      if (origin.endsWith('.daskomlab.pages.dev')) return origin;
      return 'https://daskomlab.com';
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length'],
    credentials: true,
    maxAge: 86400,
  }),
);

/* ─── Health check ─── */
app.get('/', (c) => c.json({ status: 'ok', service: 'Daskom CMS API', version: '2.0.0' }));

/* ─── Serve images from R2 (public, no auth) ─── */
app.get('/api/images/*', async (c) => {
  const key = c.req.path.replace('/api/images/', '');
  if (!key) return c.json({ error: 'No image key provided' }, 400);

  const object = await c.env.CMS_R2.get(key);
  if (!object) return c.notFound();

  const headers = new Headers();
  headers.set('Content-Type', object.httpMetadata?.contentType || 'application/octet-stream');
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('ETag', object.httpEtag);

  return new Response(object.body, { headers });
});

/* ─── API routes ─── */
app.route('/api/auth', authRoute);
app.route('/api/upload', uploadRoute);
app.route('/api/divisions', divisionsRoute);
app.route('/api/projects', projectsRoute);
app.route('/api/gallery', galleryRoute);
app.route('/api/events', eventsRoute);
app.route('/api/about', aboutRoute);
app.route('/api/recruitment', recruitmentRoute);

/* ─── Seed endpoint (admin) ─── */
app.post('/api/seed', authMiddleware, async (c) => {
  try {
    await seedData(c.env);
    return c.json({ success: true, message: 'All content seeded successfully.' });
  } catch (err) {
    return c.json({ error: 'Seed failed', details: String(err) }, 500);
  }
});

export default app;
