import { Env } from './types';

/**
 * Seeds D1 with the current hardcoded website content.
 * Run once after initial deployment to migrate existing data into the CMS.
 */
export async function seedData(env: Env): Promise<void> {
  const now = new Date().toISOString();

  /* ── Divisions ── */
  const divisions = [
    { name: 'CORE', full_name: 'Core Division', color: '#B0689A', image_key: '/images/divisi/CORE.webp', display_order: 1 },
    { name: 'ATC', full_name: 'Assignment and Task Committee', color: '#4D7E5F', image_key: '/images/divisi/ATC.webp', display_order: 2 },
    { name: 'CMD', full_name: 'Creative Media Development', color: '#618B98', image_key: '/images/divisi/CMD.webp', display_order: 3 },
    { name: 'DDC', full_name: 'Daskom Dev Community', color: '#4F61D9', image_key: '/images/divisi/DDC.webp', display_order: 4 },
    { name: 'HRD', full_name: 'Human Resource Development', color: '#6965AC', image_key: '/images/divisi/HRD.webp', display_order: 5 },
    { name: 'MLC', full_name: 'Maintenance and Logistic Committee', color: '#A49A67', image_key: '/images/divisi/MLC.webp', display_order: 6 },
    { name: 'RDC', full_name: 'Rules and Discipline Committee', color: '#AC6565', image_key: '/images/divisi/RDC.webp', display_order: 7 },
  ];

  await env.CMS_DB.prepare('DELETE FROM divisions').run();
  for (const d of divisions) {
    await env.CMS_DB.prepare(
      `INSERT INTO divisions (id, name, full_name, color, image_key, display_order, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(crypto.randomUUID(), d.name, d.full_name, d.color, d.image_key, d.display_order, now, now).run();
  }

  /* ── Projects (DLOR) ── */
  const projects = [
    { year: '2025', title: 'The Luminescent Journey', description: "The journey continues with the Crystal Cavern. From the dungeon's depths, Daskom Laboratory adventurers now navigate a cavern where each crystal holds knowledge waiting to be uncovered.", image_key: '/images/dlor/DLOR2025.webp', alt: '2025 Crystal Cavern Theme', display_order: 1 },
    { year: '2024', title: 'Venture The Deep Within', description: "The journey continues with the 'Dungeon Theme'. After exploring space, the adventurers of Daskom Laboratory now enter a dungeon full of mysteries and challenges.", image_key: '/images/dlor/DLOR2024.webp', alt: '2024 Adventure Theme', display_order: 2 },
    { year: '2023', title: 'Explore the Milky Way', description: "The journey continues with the 'Space Theme'. After passing through the jungle, the adventurers of Daskom Laboratory now venture into space, facing new challenges that test their imagination and ability to think ahead.", image_key: '/images/dlor/DLOR2023.webp', alt: '2023 Retro Arcade Theme', display_order: 3 },
    { year: '2022', title: 'Wander Through the Wild', description: "The journey continues with the Jungle Theme. After leaving the comfort of the 'Vintamin Sea Theme,' Daskom Laboratory's adventurers must navigate through a challenging jungle.", image_key: '/images/dlor/DLOR2022.webp', alt: '2022 Tech Innovations', display_order: 4 },
    { year: '2021', title: 'Traverse from Sea to Soil', description: "The first story begins with the 'Vintamin Sea Theme,' where Daskom Laboratory invites adventurers to step out of their comfort zones, explore new ideas, and collaborate to move on to the next stage in their journey of innovation.", image_key: '/images/dlor/DLOR2021.webp', alt: '2021 Future Technologies', display_order: 5 },
  ];

  await env.CMS_DB.prepare('DELETE FROM projects').run();
  for (const p of projects) {
    await env.CMS_DB.prepare(
      `INSERT INTO projects (id, year, title, description, image_key, alt, display_order, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(crypto.randomUUID(), p.year, p.title, p.description, p.image_key, p.alt, p.display_order, now, now).run();
  }

  /* ── Events ── */
  const events = [
    { event_name: 'Wisuda Asisten', image_key: '/images/event/wisuda.webp', display_order: 1 },
    { event_name: 'Syukuran', image_key: '/images/event/syukuran.webp', display_order: 2 },
    { event_name: 'Building Team', image_key: '/images/event/building.webp', display_order: 3 },
    { event_name: 'Foto Bersama Asisten', image_key: '/images/event/fotoasisten.webp', display_order: 4 },
    { event_name: 'Malam Keakraban', image_key: '/images/event/makrab.webp', display_order: 5 },
    { event_name: 'Bakti Sosial', image_key: '/images/event/baksos.webp', display_order: 6 },
    { event_name: 'Farewell Party', image_key: '/images/event/firewallParty.webp', display_order: 7 },
  ];

  await env.CMS_DB.prepare('DELETE FROM events').run();
  for (const e of events) {
    await env.CMS_DB.prepare(
      `INSERT INTO events (id, event_name, image_key, display_order, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    ).bind(crypto.randomUUID(), e.event_name, e.image_key, e.display_order, now, now).run();
  }

  /* ── Gallery ── */
  const gallery = [
    { image_key: '/images/gallery/galery2.webp', alt: 'Gallery photo 1', display_order: 1 },
    { image_key: '/images/gallery/galery3.webp', alt: 'Gallery photo 2', display_order: 2 },
    { image_key: '/images/gallery/galery4.webp', alt: 'Gallery photo 3', display_order: 3 },
    { image_key: '/images/gallery/galery6.webp', alt: 'Gallery photo 4', display_order: 4 },
    { image_key: '/images/gallery/galery5.webp', alt: 'Gallery photo 5', display_order: 5 },
    { image_key: '/images/gallery/galery7.webp', alt: 'Gallery photo 6', display_order: 6 },
  ];

  await env.CMS_DB.prepare('DELETE FROM gallery').run();
  for (const g of gallery) {
    await env.CMS_DB.prepare(
      `INSERT INTO gallery (id, image_key, alt, display_order, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    ).bind(crypto.randomUUID(), g.image_key, g.alt, g.display_order, now, now).run();
  }

  /* ── Recruitment ── */
  const generalReqs = JSON.stringify([
    'Bertaqwa kepada Tuhan YME.',
    'Mahasiswa program studi S1 Teknik Telekomunikasi, S1 Teknik Biomedis, dan S1 Teknik Sistem Energi Angkatan 2024.',
    'Indeks Prestasi (IP) Semester 1 ≥ 3.00 di bawah itu akan dipertimbangkan.',
  ]);
  const specificReqs = JSON.stringify([
    'CV ATS (Dapat menggunakan template yang sudah disediakan, namun diperbolehkan apabila menggunakan template CV yang disediakan asal tetap menggunakan format ATS)',
    'Biodata (Sesuai dengan format).',
    'Transkrip Nilai (KHS) Semester 1.',
    'Foto Formal Full Body Ukuran 4R Berwarna (Format JPG/JPEG, mengenakan pakaian yang sopan, dengan latar belakang bebas polos).',
    'Visi, Misi, Motivasi Mengikuti Rekrutmen, dan Ide Inovasi untuk Laboratorium Dasar Komputer.',
    'Surat Lamaran yang Ditujukan kepada Koordinator Asisten dan Pembina Laboratorium.',
    'Mengisi Formulir Pendaftaran Calon Asisten Laboratorium Dasar Komputer 2025/2026.',
  ]);

  await env.CMS_DB.prepare(
    `UPDATE recruitment SET general_requirements = ?, specific_requirements = ?, apply_url = ?, is_open = ?, updated_at = ? WHERE id = 1`,
  ).bind(generalReqs, specificReqs, 'https://forms.gle/EXaBkcZdwEi2bTVy9', 1, now).run();

  /* ── About ── */
  await env.CMS_DB.prepare(
    `UPDATE about SET title = ?, description = ?, hero_image_key = ?, logo_image_key = ?, location_description = ?, map_embed_url = ?, updated_at = ? WHERE id = 1`,
  ).bind(
    'Daskom Laboratory',
    "Telkom University's Computer Basics Lab (Laboratorium Daskom) is a leading C programming lab within the Faculty of Electrical Engineering's Computer Engineering Department. We empower students with essential coding skills, specialize in C algorithms. Additionally, we conduct research in website and mobile app development, fostering innovation and technological advancement.",
    '/images/background/aboutProfile.png',
    '/daskomLogo.svg',
    'Our practical labs are located in rooms 10.02 & 10.04, and our research activities are conducted in room 10.01 (Telkom University Landmark Tower).',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.526448621544!2d107.630540!3d-6.973230!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9c28f51a3e3%3A0x2619e8eb2d6b33cf!2sTelkom%20University%20Landmark%20Tower!5e0!3m2!1sen!2sid!4v1691406391164!5m2!1sen!2sid',
    now,
  ).run();
}
