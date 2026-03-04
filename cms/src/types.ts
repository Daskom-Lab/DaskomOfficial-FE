/* ─── Cloudflare bindings ─── */
export interface Env {
  CMS_DB: D1Database;
  CMS_R2: R2Bucket;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;
  JWT_SECRET: string;
}

/* ─── Data models (match D1 column names) ─── */

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
  is_open: number; // 0 or 1
  updated_at: string;
}
