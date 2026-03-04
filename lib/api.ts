/**
 * CMS API client — shared by public components and admin panel.
 * Reads the API base URL from NEXT_PUBLIC_CMS_API_URL (env var)
 * or falls back to localhost:8787 during development.
 */

const CMS_API_URL =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_CMS_API_URL) || 'http://localhost:8787';

/* ──────────────── Types (mirrors CMS D1 column names) ──────────────── */

export interface Division {
  id: string;
  name: string;
  full_name: string;
  color: string;
  image_key: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  year: string;
  title: string;
  description: string;
  image_key: string;
  alt: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  image_key: string;
  alt: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface EventItem {
  id: string;
  event_name: string;
  image_key: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface AboutContent {
  id: number;
  title: string;
  description: string;
  hero_image_key: string;
  logo_image_key: string;
  home_image_key: string;
  location_description: string;
  map_embed_url: string;
  updated_at: string;
}

export interface RecruitmentContent {
  id: number;
  general_requirements: string; // JSON array of strings
  specific_requirements: string; // JSON array of strings
  apply_url: string;
  is_open: number;
  updated_at: string;
}

/* ──────────────── Helpers ──────────────── */

/**
 * Resolves an image_key to a full URL.
 */
export function getImageUrl(imageKey: string): string {
  if (!imageKey) return '';
  if (imageKey.startsWith('http://') || imageKey.startsWith('https://')) return imageKey;
  if (imageKey.startsWith('/')) return imageKey; // local /public path
  return `${CMS_API_URL}/api/images/${imageKey}`;
}

/** Generic JSON fetch with optional Bearer token auth. */
export async function apiFetch<T = unknown>(
  path: string,
  token?: string,
  opts: RequestInit = {},
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${CMS_API_URL}${path}`, { ...opts, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

/** Upload an image file to R2 via the CMS worker. */
export async function uploadImage(
  file: File,
  folder: string,
  token: string,
): Promise<{ key: string; url: string }> {
  const form = new FormData();
  form.append('file', file);
  form.append('folder', folder);

  const res = await fetch(`${CMS_API_URL}/api/upload`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: form,
  });

  if (!res.ok) throw new Error('Image upload failed');
  return res.json();
}

/** Login with username & password, returns JWT token. */
export async function loginAdmin(
  username: string,
  password: string,
): Promise<{ token: string; expiresIn: number }> {
  const res = await fetch(`${CMS_API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: 'Login failed' }));
    throw new Error((data as any).error || 'Login failed');
  }
  return res.json();
}

/* ──────────────── Public fetchers (used by frontend components) ──────────────── */

export async function getDivisions(): Promise<Division[]> {
  return apiFetch<Division[]>('/api/divisions');
}

export async function getProjects(): Promise<Project[]> {
  return apiFetch<Project[]>('/api/projects');
}

export async function getGallery(): Promise<GalleryItem[]> {
  return apiFetch<GalleryItem[]>('/api/gallery');
}

export async function getEvents(): Promise<EventItem[]> {
  return apiFetch<EventItem[]>('/api/events');
}

export async function getAboutContent(): Promise<AboutContent> {
  return apiFetch<AboutContent>('/api/about');
}

export async function getRecruitmentContent(): Promise<RecruitmentContent> {
  return apiFetch<RecruitmentContent>('/api/recruitment');
}
