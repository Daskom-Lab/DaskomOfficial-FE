'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import {
  apiFetch,
  uploadImage,
  loginAdmin,
  getImageUrl,
  type Division,
  type Project,
  type GalleryItem,
  type EventItem,
  type AboutContent,
  type RecruitmentContent,
} from '@/lib/api';

/* ═══════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════ */

function imgUrl(key: string) {
  return getImageUrl(key);
}

/* ═══════════════════════════════════════════════════════
   Generic CRUD Manager
   ═══════════════════════════════════════════════════════ */

interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'number' | 'color' | 'textarea';
  placeholder?: string;
}

function ContentManager({
  token,
  title,
  apiPath,
  imageFolder,
  fields,
}: {
  token: string;
  title: string;
  apiPath: string;
  imageFolder: string;
  fields: FieldDef[];
}) {
  const emptyForm = (): Record<string, string | number> => {
    const f: Record<string, string | number> = {};
    fields.forEach((fd) => {
      f[fd.key] = fd.type === 'number' ? 0 : '';
    });
    return f;
  };

  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<Record<string, string | number>>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await apiFetch<any[]>(apiPath);
      setItems(data);
    } catch {
      setStatus('Failed to load data.');
    }
  }, [apiPath]);

  useEffect(() => { load(); }, [load]);

  const resetForm = () => {
    setForm(emptyForm());
    setEditId(null);
    setImageFile(null);
    setImagePreview('');
    setStatus('');
    setShowForm(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setImageFile(f);
      setImagePreview(URL.createObjectURL(f));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus('');
    try {
      let image_key = editId ? items.find((i) => i.id === editId)?.image_key || '' : '';

      if (imageFile) {
        const result = await uploadImage(imageFile, imageFolder, token);
        image_key = result.key;
      }

      if (!image_key && !editId) {
        setStatus('Please upload an image first.');
        setSaving(false);
        return;
      }

      const body = { ...form, image_key };

      if (editId) {
        await apiFetch(`${apiPath}/${editId}`, token, {
          method: 'PUT',
          body: JSON.stringify(body),
        });
        setStatus('Updated successfully!');
      } else {
        await apiFetch(apiPath, token, {
          method: 'POST',
          body: JSON.stringify(body),
        });
        setStatus('Created successfully!');
      }

      resetForm();
      await load();
    } catch (e: unknown) {
      setStatus('Error: ' + (e instanceof Error ? e.message : String(e)));
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete this ${title.toLowerCase()}?`)) return;
    try {
      await apiFetch(`${apiPath}/${id}`, token, { method: 'DELETE' });
      await load();
      setStatus('Deleted.');
    } catch (e: unknown) {
      setStatus('Delete failed: ' + (e instanceof Error ? e.message : String(e)));
    }
  };

  const startEdit = (item: any) => {
    const f: Record<string, string | number> = {};
    fields.forEach((fd) => {
      f[fd.key] = item[fd.key] ?? (fd.type === 'number' ? 0 : '');
    });
    setForm(f);
    setEditId(item.id);
    setImagePreview(imgUrl(item.image_key));
    setImageFile(null);
    setShowForm(true);
  };

  const displayFields = fields.filter((f) => f.type !== 'textarea').slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-darkGreen to-lightGreen bg-clip-text text-transparent">
            Manage {title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{items.length} item{items.length !== 1 ? 's' : ''}</p>
        </div>
        {!showForm && (
          <Button
            className="bg-darkGreen text-white font-semibold px-6"
            onPress={() => { resetForm(); setShowForm(true); }}
          >
            + Add New
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-gradient-to-r from-gray-100 to-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-darkGreen">
              {editId ? `Edit ${title}` : `New ${title}`}
            </h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((f) => {
              if (f.type === 'color') {
                return (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={String(form[f.key] || '#000000')}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-12 h-10 rounded-lg cursor-pointer border border-gray-300"
                      />
                      <span className="text-sm text-gray-500 font-mono">{String(form[f.key] || '#000000')}</span>
                    </div>
                  </div>
                );
              }
              if (f.type === 'textarea') {
                return (
                  <div key={f.key} className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                    <textarea
                      value={String(form[f.key] || '')}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-darkGreen focus:border-transparent"
                    />
                  </div>
                );
              }
              return (
                <Input
                  key={f.key}
                  label={f.label}
                  placeholder={f.placeholder}
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={String(form[f.key] ?? '')}
                  onValueChange={(v) =>
                    setForm({
                      ...form,
                      [f.key]: f.type === 'number' ? parseInt(v) || 0 : v,
                    })
                  }
                />
              );
            })}
          </div>

          {/* Image upload */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-darkGreen file:text-white hover:file:bg-lightGreen file:cursor-pointer file:transition-colors"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-3 h-36 object-cover rounded-lg border mx-auto" />
            )}
          </div>

          <div className="flex items-center gap-3 mt-5">
            <Button
              isLoading={saving}
              onPress={handleSave}
              className="bg-darkGreen text-white font-semibold px-8"
            >
              {editId ? 'Update' : 'Create'}
            </Button>
            <Button variant="flat" onPress={resetForm} className="font-medium">
              Cancel
            </Button>
            {status && (
              <span className={`text-sm font-medium ml-2 ${status.startsWith('Error') ? 'text-red-500' : 'text-darkGreen'}`}>
                {status}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Items grid */}
      {items.length === 0 ? (
        <div className="bg-gradient-to-r from-gray-100 to-white p-12 rounded-lg shadow-lg text-center">
          <p className="text-gray-400 font-medium">No items yet</p>
          <p className="text-gray-400 text-sm mt-1">Click &quot;+ Add New&quot; to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-r from-gray-100 to-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              {item.image_key && (
                <img
                  src={imgUrl(item.image_key)}
                  alt={item.name || item.event_name || item.alt || 'image'}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 space-y-1">
                {displayFields.map((f) => (
                  <p key={f.key} className="text-sm">
                    <span className="font-semibold text-gray-600">{f.label}: </span>
                    {f.type === 'color' ? (
                      <span
                        className="inline-block w-4 h-4 rounded-full align-middle ml-1 border border-gray-300"
                        style={{ backgroundColor: String(item[f.key]) }}
                      />
                    ) : (
                      <span className="text-gray-700">{String(item[f.key])}</span>
                    )}
                  </p>
                ))}
                <div className="flex gap-2 pt-3">
                  <Button size="sm" variant="flat" onPress={() => startEdit(item)} className="font-medium">
                    Edit
                  </Button>
                  <Button size="sm" variant="flat" color="danger" onPress={() => handleDelete(item.id)} className="font-medium">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   About Section (single object — no list)
   ═══════════════════════════════════════════════════════ */

function AboutSection({ token }: { token: string }) {
  const [form, setForm] = useState<Partial<AboutContent>>({});
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [homeFile, setHomeFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState('');
  const [logoPreview, setLogoPreview] = useState('');
  const [homePreview, setHomePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    apiFetch<AboutContent>('/api/about')
      .then((data) => {
        setForm(data);
        if (data.hero_image_key) setHeroPreview(imgUrl(data.hero_image_key));
        if (data.logo_image_key) setLogoPreview(imgUrl(data.logo_image_key));
        if (data.home_image_key) setHomePreview(imgUrl(data.home_image_key));
      })
      .catch(() => setStatus('Could not load about content.'));
  }, [token]);

  const handleSave = async () => {
    setSaving(true);
    setStatus('');
    try {
      const body = { ...form };

      if (heroFile) {
        const r = await uploadImage(heroFile, 'about', token);
        body.hero_image_key = r.key;
      }
      if (logoFile) {
        const r = await uploadImage(logoFile, 'about', token);
        body.logo_image_key = r.key;
      }
      if (homeFile) {
        const r = await uploadImage(homeFile, 'about', token);
        body.home_image_key = r.key;
      }

      const updated = await apiFetch<AboutContent>('/api/about', token, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
      setForm(updated);
      setStatus('About page updated!');
    } catch (e: unknown) {
      setStatus('Error: ' + (e instanceof Error ? e.message : String(e)));
    }
    setSaving(false);
  };

  const set = (key: keyof AboutContent, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-darkGreen to-lightGreen bg-clip-text text-transparent">
        About Page Content
      </h2>

      <div className="bg-gradient-to-r from-gray-100 to-white p-6 rounded-lg shadow-lg space-y-4">
        <Input label="Title" value={form.title || ''} onValueChange={(v) => set('title', v)} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={form.description || ''}
            onChange={(e) => set('description', e.target.value)}
            rows={5}
            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-darkGreen focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location Description</label>
          <textarea
            value={form.location_description || ''}
            onChange={(e) => set('location_description', e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-darkGreen focus:border-transparent"
          />
        </div>

        <Input
          label="Google Maps Embed URL"
          value={form.map_embed_url || ''}
          onValueChange={(v) => set('map_embed_url', v)}
        />

        {/* Homepage Photo (PhotoProfile) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Homepage Photo (Main Banner)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) { setHomeFile(f); setHomePreview(URL.createObjectURL(f)); }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-darkGreen file:text-white hover:file:bg-lightGreen file:cursor-pointer file:transition-colors"
          />
          {homePreview && <img src={homePreview} alt="Home photo preview" className="mt-3 h-32 object-cover rounded-lg border" />}
        </div>

        {/* Hero image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) { setHeroFile(f); setHeroPreview(URL.createObjectURL(f)); }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-darkGreen file:text-white hover:file:bg-lightGreen file:cursor-pointer file:transition-colors"
          />
          {heroPreview && <img src={heroPreview} alt="Hero preview" className="mt-3 h-32 object-cover rounded-lg border" />}
        </div>

        {/* Logo image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) { setLogoFile(f); setLogoPreview(URL.createObjectURL(f)); }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-darkGreen file:text-white hover:file:bg-lightGreen file:cursor-pointer file:transition-colors"
          />
          {logoPreview && <img src={logoPreview} alt="Logo preview" className="mt-3 h-20 object-contain rounded-lg border" />}
        </div>

        <Button
          isLoading={saving}
          onPress={handleSave}
          className="bg-darkGreen text-white font-semibold"
        >
          Save About Content
        </Button>
        {status && <p className={`text-sm font-medium ${status.startsWith('Error') ? 'text-red-500' : 'text-darkGreen'}`}>{status}</p>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Recruitment Section
   ═══════════════════════════════════════════════════════ */

function RecruitmentSection({ token }: { token: string }) {
  const [generalReqs, setGeneralReqs] = useState<string[]>([]);
  const [specificReqs, setSpecificReqs] = useState<string[]>([]);
  const [applyUrl, setApplyUrl] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    apiFetch<RecruitmentContent>('/api/recruitment')
      .then((data) => {
        try { setGeneralReqs(JSON.parse(data.general_requirements)); } catch { setGeneralReqs([]); }
        try { setSpecificReqs(JSON.parse(data.specific_requirements)); } catch { setSpecificReqs([]); }
        setApplyUrl(data.apply_url || '');
        setIsOpen(!!data.is_open);
      })
      .catch(() => setStatus('Could not load recruitment content.'));
  }, [token]);

  const handleSave = async () => {
    setSaving(true);
    setStatus('');
    try {
      const body = {
        general_requirements: JSON.stringify(generalReqs),
        specific_requirements: JSON.stringify(specificReqs),
        apply_url: applyUrl,
        is_open: isOpen ? 1 : 0,
      };
      const updated = await apiFetch<RecruitmentContent>('/api/recruitment', token, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
      try { setGeneralReqs(JSON.parse(updated.general_requirements)); } catch {}
      try { setSpecificReqs(JSON.parse(updated.specific_requirements)); } catch {}
      setApplyUrl(updated.apply_url || '');
      setIsOpen(!!updated.is_open);
      setStatus('Recruitment content updated!');
    } catch (e: unknown) {
      setStatus('Error: ' + (e instanceof Error ? e.message : String(e)));
    }
    setSaving(false);
  };

  const updateItem = (list: string[], setList: (v: string[]) => void, index: number, value: string) => {
    const copy = [...list];
    copy[index] = value;
    setList(copy);
  };

  const removeItem = (list: string[], setList: (v: string[]) => void, index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  const addItem = (list: string[], setList: (v: string[]) => void) => {
    setList([...list, '']);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-darkGreen to-lightGreen bg-clip-text text-transparent">
        Recruitment Content
      </h2>

      <div className="bg-gradient-to-r from-gray-100 to-white p-6 rounded-lg shadow-lg space-y-6">
        {/* Apply URL */}
        <Input label="Apply Form URL" value={applyUrl} onValueChange={setApplyUrl} placeholder="https://forms.gle/..." />

        {/* Is Open toggle */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Recruitment Open:</label>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isOpen ? 'bg-darkGreen' : 'bg-gray-300'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isOpen ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className="text-sm text-gray-600">{isOpen ? 'Open' : 'Closed'}</span>
        </div>

        {/* General Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Persyaratan Umum (General Requirements)</label>
          <div className="space-y-2">
            {generalReqs.map((item, i) => (
              <div key={i} className="flex gap-2">
                <textarea
                  value={item}
                  onChange={(e) => updateItem(generalReqs, setGeneralReqs, i, e.target.value)}
                  rows={2}
                  className="flex-1 rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-darkGreen focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => removeItem(generalReqs, setGeneralReqs, i)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium px-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addItem(generalReqs, setGeneralReqs)}
            className="mt-2 text-sm text-darkGreen hover:text-lightGreen font-semibold"
          >
            + Add requirement
          </button>
        </div>

        {/* Specific Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Persyaratan Khusus (Specific Requirements)</label>
          <div className="space-y-2">
            {specificReqs.map((item, i) => (
              <div key={i} className="flex gap-2">
                <textarea
                  value={item}
                  onChange={(e) => updateItem(specificReqs, setSpecificReqs, i, e.target.value)}
                  rows={2}
                  className="flex-1 rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-darkGreen focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => removeItem(specificReqs, setSpecificReqs, i)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium px-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addItem(specificReqs, setSpecificReqs)}
            className="mt-2 text-sm text-darkGreen hover:text-lightGreen font-semibold"
          >
            + Add requirement
          </button>
        </div>

        <Button
          isLoading={saving}
          onPress={handleSave}
          className="bg-darkGreen text-white font-semibold"
        >
          Save Recruitment Content
        </Button>
        {status && <p className={`text-sm font-medium ${status.startsWith('Error') ? 'text-red-500' : 'text-darkGreen'}`}>{status}</p>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Seed Section
   ═══════════════════════════════════════════════════════ */

function SeedSection({ token }: { token: string }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSeed = async () => {
    if (!confirm('This will overwrite all CMS data with the original hardcoded content. Continue?')) return;
    setLoading(true);
    try {
      await apiFetch('/api/seed', token, { method: 'POST' });
      setMsg('All data seeded successfully! Switch tabs to see the data.');
    } catch (e: unknown) {
      setMsg('Seed failed: ' + (e instanceof Error ? e.message : String(e)));
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-darkGreen to-lightGreen bg-clip-text text-transparent">
        Seed Initial Data
      </h2>

      <div className="bg-gradient-to-r from-gray-100 to-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-600 leading-relaxed">
          Populate the CMS with the original hardcoded content from the website.
          This is useful for the initial setup or resetting to defaults.
        </p>
        <p className="text-amber-600 text-sm font-semibold mt-3">
          Warning: this will overwrite all existing CMS data.
        </p>
        <Button
          color="warning"
          isLoading={loading}
          onPress={handleSeed}
          className="mt-4 font-semibold"
        >
          Seed All Data
        </Button>
        {msg && <p className={`mt-3 text-sm font-medium ${msg.includes('failed') ? 'text-red-500' : 'text-darkGreen'}`}>{msg}</p>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Field Configurations
   ═══════════════════════════════════════════════════════ */

const divisionFields: FieldDef[] = [
  { key: 'name', label: 'Short Name', type: 'text', placeholder: 'e.g. CORE' },
  { key: 'full_name', label: 'Full Name', type: 'text', placeholder: 'e.g. Core Division' },
  { key: 'color', label: 'Division Color', type: 'color' },
  { key: 'display_order', label: 'Display Order', type: 'number' },
];

const projectFields: FieldDef[] = [
  { key: 'year', label: 'Year', type: 'text', placeholder: '2025' },
  { key: 'title', label: 'Theme Title', type: 'text', placeholder: 'The Luminescent Journey' },
  { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe the DLOR theme...' },
  { key: 'alt', label: 'Image Alt Text', type: 'text', placeholder: '2025 Theme' },
  { key: 'display_order', label: 'Display Order', type: 'number' },
];

const galleryFields: FieldDef[] = [
  { key: 'alt', label: 'Alt / Caption', type: 'text', placeholder: 'Gallery photo description' },
  { key: 'display_order', label: 'Display Order', type: 'number' },
];

const eventFields: FieldDef[] = [
  { key: 'event_name', label: 'Event Name', type: 'text', placeholder: 'Wisuda Asisten' },
  { key: 'display_order', label: 'Display Order', type: 'number' },
];

/* ═══════════════════════════════════════════════════════
   Tab Config
   ═══════════════════════════════════════════════════════ */

const TABS = [
  { key: 'divisions', label: 'Divisions' },
  { key: 'projects', label: 'Projects' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'events', label: 'Events' },
  { key: 'about', label: 'About' },
  { key: 'recruitment', label: 'Recruitment' },
  { key: 'seed', label: 'Seed Data' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

/* ═══════════════════════════════════════════════════════
   Main Admin Page
   ═══════════════════════════════════════════════════════ */

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('divisions');

  /* Restore session */
  useEffect(() => {
    const saved = sessionStorage.getItem('cms_token');
    if (saved) {
      setToken(saved);
      setIsAuth(true);
    }
  }, []);

  const login = async () => {
    if (!username.trim() || !password.trim()) return;
    setLoginLoading(true);
    setLoginError('');
    try {
      const result = await loginAdmin(username, password);
      sessionStorage.setItem('cms_token', result.token);
      setToken(result.token);
      setIsAuth(true);
    } catch (e: unknown) {
      setLoginError(e instanceof Error ? e.message : 'Login failed');
    }
    setLoginLoading(false);
  };

  const logout = () => {
    sessionStorage.removeItem('cms_token');
    setToken('');
    setIsAuth(false);
    setUsername('');
    setPassword('');
  };

  /* ── Login screen ── */
  if (!isAuth) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md border rounded-xl p-8 shadow-lg bg-white space-y-6">
          {/* Actual Daskom logo */}
          <div className="flex justify-center">
            <img src="/daskom icon.svg" alt="Daskom" className="w-16 h-16" />
          </div>
          <h1 className="text-2xl font-bold text-darkGreen text-center">Daskom CMS</h1>
          <p className="text-sm text-gray-500 text-center">Sign in to manage content</p>

          <Input
            label="Username"
            placeholder="Enter your username"
            value={username}
            onValueChange={setUsername}
            onKeyDown={(e) => e.key === 'Enter' && login()}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onValueChange={setPassword}
            onKeyDown={(e) => e.key === 'Enter' && login()}
          />

          {loginError && (
            <p className="text-red-500 text-sm font-medium text-center">{loginError}</p>
          )}

          <Button
            isLoading={loginLoading}
            className="w-full bg-gradient-to-r from-darkGreen to-lightGreen text-white font-semibold text-md"
            onPress={login}
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  /* ── Dashboard ── */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <img src="/daskom icon.svg" alt="Daskom" className="w-10 h-10" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-darkGreen to-lightGreen bg-clip-text text-transparent">
            Daskom CMS
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="text-sm text-darkGreen hover:text-lightGreen font-semibold transition"
          >
            View Site
          </a>
          <Button size="sm" variant="flat" color="danger" onPress={logout} className="font-semibold">
            Logout
          </Button>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <Button
            key={tab.key}
            size="sm"
            variant={activeTab === tab.key ? 'solid' : 'flat'}
            className={
              activeTab === tab.key
                ? 'bg-darkGreen text-white font-semibold'
                : 'font-medium'
            }
            onPress={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Active panel */}
      <div className="min-h-[400px]">
        {activeTab === 'divisions' && (
          <ContentManager token={token} title="Divisions" apiPath="/api/divisions" imageFolder="divisions" fields={divisionFields} />
        )}
        {activeTab === 'projects' && (
          <ContentManager token={token} title="Projects" apiPath="/api/projects" imageFolder="projects" fields={projectFields} />
        )}
        {activeTab === 'gallery' && (
          <ContentManager token={token} title="Gallery" apiPath="/api/gallery" imageFolder="gallery" fields={galleryFields} />
        )}
        {activeTab === 'events' && (
          <ContentManager token={token} title="Events" apiPath="/api/events" imageFolder="events" fields={eventFields} />
        )}
        {activeTab === 'about' && <AboutSection token={token} />}
        {activeTab === 'recruitment' && <RecruitmentSection token={token} />}
        {activeTab === 'seed' && <SeedSection token={token} />}
      </div>
    </div>
  );
}
