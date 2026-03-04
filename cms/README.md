# Daskom CMS — Cloudflare Worker API

Content Management System for the Daskom Laboratory website.  
Built with **Hono.js** on **Cloudflare Workers**, using **KV** for metadata and **R2** for image storage.

## Prerequisites

- Node.js ≥ 18
- A Cloudflare account with Workers, KV, and R2 enabled
- `wrangler` CLI (installed as a dev dependency)

## Quick Start

```bash
# 1. Install dependencies
cd cms
npm install

# 2. Create Cloudflare resources
npx wrangler kv namespace create CMS_KV
npx wrangler r2 bucket create daskom-images

# 3. Copy the namespace ID from step 2 into wrangler.toml
#    Replace YOUR_KV_NAMESPACE_ID with the actual ID

# 4. Set a secure API key in wrangler.toml
#    Replace "change-me-to-a-secure-random-string" with a real secret

# 5. Run locally
npm run dev
# → API available at http://localhost:8787

# 6. Seed initial data (uses current hardcoded content)
curl -X POST http://localhost:8787/api/seed \
  -H "X-API-Key: YOUR_API_KEY"

# 7. Deploy to Cloudflare
npm run deploy
```

## API Endpoints

### Public (no auth)

| Method | Path                  | Description              |
| ------ | --------------------- | ------------------------ |
| GET    | `/`                   | Health check             |
| GET    | `/api/images/*`       | Serve image from R2      |
| GET    | `/api/divisions`      | List all divisions       |
| GET    | `/api/divisions/:id`  | Get single division      |
| GET    | `/api/projects`       | List all projects        |
| GET    | `/api/projects/:id`   | Get single project       |
| GET    | `/api/gallery`        | List gallery items       |
| GET    | `/api/gallery/:id`    | Get single gallery item  |
| GET    | `/api/events`         | List all events          |
| GET    | `/api/events/:id`     | Get single event         |
| GET    | `/api/about`          | Get about page content   |

### Admin (requires `X-API-Key` header)

| Method | Path                  | Description              |
| ------ | --------------------- | ------------------------ |
| POST   | `/api/upload`         | Upload image to R2       |
| GET    | `/api/upload`         | List R2 images           |
| DELETE | `/api/upload?key=...` | Delete image from R2     |
| POST   | `/api/divisions`      | Create division          |
| PUT    | `/api/divisions/:id`  | Update division          |
| DELETE | `/api/divisions/:id`  | Delete division          |
| POST   | `/api/projects`       | Create project           |
| PUT    | `/api/projects/:id`   | Update project           |
| DELETE | `/api/projects/:id`   | Delete project           |
| POST   | `/api/gallery`        | Create gallery item      |
| PUT    | `/api/gallery/:id`    | Update gallery item      |
| DELETE | `/api/gallery/:id`    | Delete gallery item      |
| POST   | `/api/events`         | Create event             |
| PUT    | `/api/events/:id`     | Update event             |
| DELETE | `/api/events/:id`     | Delete event             |
| PUT    | `/api/about`          | Update about content     |
| POST   | `/api/seed`           | Seed initial data        |

## Image Upload Flow

1. Upload image: `POST /api/upload` (multipart form: `file` + `folder`)
2. Response: `{ "key": "divisions/uuid.webp", "url": "/api/images/divisions/uuid.webp" }`
3. Use the returned `key` when creating/updating content items
4. Images served publicly at `GET /api/images/{key}`
