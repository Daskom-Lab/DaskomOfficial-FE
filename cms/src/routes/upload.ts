import { Hono } from 'hono';
import { Env } from '../types';
import { authMiddleware } from '../middleware/auth';

const app = new Hono<{ Bindings: Env }>();

/**
 * POST /  — Upload an image to R2
 * Body: multipart/form-data  { file: File, folder?: string }
 */
app.post('/', authMiddleware, async (c) => {
  const formData = await c.req.formData();
  const file = formData.get('file') as File | null;
  const folder = (formData.get('folder') as string) || 'general';

  if (!file) {
    return c.json({ error: 'No file provided. Send a "file" field.' }, 400);
  }

  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
  if (!allowed.includes(file.type)) {
    return c.json({ error: `Invalid file type "${file.type}". Allowed: ${allowed.join(', ')}` }, 400);
  }

  const ext = file.name.split('.').pop() || 'bin';
  const key = `${folder}/${crypto.randomUUID()}.${ext}`;

  await c.env.CMS_R2.put(key, file.stream(), {
    httpMetadata: { contentType: file.type },
    customMetadata: {
      originalName: file.name,
      uploadedAt: new Date().toISOString(),
    },
  });

  return c.json({ key, url: `/api/images/${key}`, contentType: file.type, size: file.size }, 201);
});

/**
 * GET /  — List uploaded images (with optional prefix filter)
 */
app.get('/', authMiddleware, async (c) => {
  const prefix = c.req.query('prefix') || '';
  const limit = parseInt(c.req.query('limit') || '100', 10);
  const cursor = c.req.query('cursor') || undefined;

  const listed = await c.env.CMS_R2.list({ prefix, limit, cursor });

  const files = listed.objects.map((obj) => ({
    key: obj.key,
    size: obj.size,
    uploaded: obj.uploaded.toISOString(),
    url: `/api/images/${obj.key}`,
  }));

  return c.json({
    files,
    truncated: listed.truncated,
    cursor: listed.truncated ? listed.cursor : undefined,
  });
});

/**
 * DELETE /  — Delete an image from R2
 * Query: ?key=folder/filename.ext
 */
app.delete('/', authMiddleware, async (c) => {
  const key = c.req.query('key');
  if (!key) {
    return c.json({ error: 'Provide a "key" query parameter.' }, 400);
  }

  const obj = await c.env.CMS_R2.head(key);
  if (!obj) {
    return c.json({ error: 'Image not found in R2.' }, 404);
  }

  await c.env.CMS_R2.delete(key);
  return c.json({ success: true, deletedKey: key });
});

export default app;
