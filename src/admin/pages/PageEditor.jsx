import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import AdminLayout from '../AdminLayout'
import { adminApi } from '../lib/api'

function slugToPath(slug) {
  return slug === '/' ? '' : slug.replace(/^\//, '')
}

// ── Section schemas ─────────────────────────────────────────────────────────
// Each page slug maps to an array of editable sections.
// Each section has a key, label, and array of fields.
// This drives the visual editor UI without touching raw JSON.

const SECTION_SCHEMAS = {
  '/': [
    {
      key: 'hero', label: 'Hero Section', icon: 'fa-star',
      fields: [
        { key: 'badge',       label: 'Badge Text',    type: 'text' },
        { key: 'title',       label: 'Main Heading',  type: 'text' },
        { key: 'description', label: 'Description',   type: 'textarea' },
        { key: 'cta_text',    label: 'Button Text',   type: 'text' },
        { key: 'cta_link',    label: 'Button Link',   type: 'text' },
        { key: 'image',       label: 'Hero Image URL',type: 'image' },
      ],
    },
    {
      key: 'about', label: 'About Snippet', icon: 'fa-info-circle',
      fields: [
        { key: 'badge',       label: 'Badge Text',    type: 'text' },
        { key: 'title',       label: 'Section Title', type: 'text' },
        { key: 'description', label: 'Description',   type: 'textarea' },
        { key: 'image',       label: 'Image URL',     type: 'image' },
      ],
    },
    {
      key: 'stats', label: 'Stats Bar', icon: 'fa-chart-bar',
      fields: [{ key: '__array', label: 'Stats (number + label)', type: 'array',
        itemFields: [
          { key: 'number', label: 'Number', type: 'text' },
          { key: 'label',  label: 'Label',  type: 'text' },
        ],
      }],
    },
    {
      key: 'why_choose', label: 'Why Choose Us', icon: 'fa-thumbs-up',
      fields: [
        { key: 'badge',  label: 'Badge',  type: 'text' },
        { key: 'title',  label: 'Title',  type: 'text' },
        { key: 'items',  label: 'Feature Cards', type: 'array',
          itemFields: [
            { key: 'icon',        label: 'FA Icon class', type: 'text' },
            { key: 'title',       label: 'Title',         type: 'text' },
            { key: 'description', label: 'Description',   type: 'textarea' },
          ],
        },
      ],
    },
    {
      key: 'gallery_badge',       label: 'Gallery Badge',       icon: 'fa-images',
      fields: [{ key: 'gallery_badge', label: 'Badge',  type: 'text' }, { key: 'gallery_title', label: 'Title', type: 'text' }],
    },
  ],
  '/about': [
    {
      key: 'header', label: 'Page Header', icon: 'fa-heading',
      fields: [
        { key: 'title',      label: 'Page Title',    type: 'text' },
        { key: 'breadcrumb', label: 'Breadcrumb',    type: 'text' },
      ],
    },
    {
      key: 'story', label: 'Our Story', icon: 'fa-book-open',
      fields: [
        { key: 'badge',       label: 'Badge',       type: 'text' },
        { key: 'title',       label: 'Title',       type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'image',       label: 'Image URL',   type: 'image' },
      ],
    },
    {
      key: 'values', label: 'Our Values', icon: 'fa-heart',
      fields: [
        { key: 'badge',  label: 'Badge',  type: 'text' },
        { key: 'title',  label: 'Title',  type: 'text' },
        { key: 'items',  label: 'Value Cards', type: 'array',
          itemFields: [
            { key: 'icon',        label: 'FA Icon',      type: 'text' },
            { key: 'title',       label: 'Title',        type: 'text' },
            { key: 'description', label: 'Description',  type: 'textarea' },
          ],
        },
      ],
    },
  ],
  '/menu': [
    {
      key: 'header', label: 'Page Header', icon: 'fa-heading',
      fields: [
        { key: 'title',      label: 'Page Title',    type: 'text' },
        { key: 'breadcrumb', label: 'Breadcrumb',    type: 'text' },
      ],
    },
    {
      key: '__root', label: 'Section Title', icon: 'fa-align-left',
      fields: [
        { key: 'badge',       label: 'Badge',         type: 'text' },
        { key: 'title',       label: 'Title',         type: 'text' },
        { key: 'description', label: 'Description',   type: 'textarea' },
      ],
    },
  ],
  '/contact': [
    {
      key: 'header', label: 'Page Header', icon: 'fa-heading',
      fields: [
        { key: 'title', label: 'Page Title', type: 'text' },
        { key: 'breadcrumb', label: 'Breadcrumb', type: 'text' },
      ],
    },
    {
      key: '__root', label: 'Contact Details', icon: 'fa-map-marker-alt',
      fields: [
        { key: 'badge',             label: 'Badge',           type: 'text' },
        { key: 'title',             label: 'Section Title',   type: 'text' },
        { key: 'address',           label: 'Address',         type: 'text' },
        { key: 'phone',             label: 'Phone',           type: 'text' },
        { key: 'email',             label: 'Email',           type: 'text' },
        { key: 'hours',             label: 'Opening Hours',   type: 'text' },
        { key: 'map_embed',         label: 'Google Maps Embed HTML', type: 'textarea' },
        { key: 'form_title',        label: 'Form Title',      type: 'text' },
        { key: 'form_description',  label: 'Form Description',type: 'textarea' },
      ],
    },
  ],
  '/services': [
    {
      key: 'header', label: 'Page Header', icon: 'fa-heading',
      fields: [
        { key: 'title', label: 'Page Title', type: 'text' },
        { key: 'breadcrumb', label: 'Breadcrumb', type: 'text' },
      ],
    },
    {
      key: '__root', label: 'Services', icon: 'fa-concierge-bell',
      fields: [
        { key: 'badge',  label: 'Badge',  type: 'text' },
        { key: 'title',  label: 'Title',  type: 'text' },
        { key: 'items',  label: 'Service Cards', type: 'array',
          itemFields: [
            { key: 'icon',        label: 'FA Icon',      type: 'text' },
            { key: 'title',       label: 'Title',        type: 'text' },
            { key: 'description', label: 'Description',  type: 'textarea' },
            { key: 'image',       label: 'Image URL',    type: 'image' },
          ],
        },
      ],
    },
  ],
  '/order': [
    {
      key: 'header', label: 'Page Header', icon: 'fa-heading',
      fields: [
        { key: 'title', label: 'Page Title', type: 'text' },
        { key: 'breadcrumb', label: 'Breadcrumb', type: 'text' },
      ],
    },
    {
      key: '__root', label: 'Section Header', icon: 'fa-align-left',
      fields: [
        { key: 'badge',       label: 'Badge',       type: 'text' },
        { key: 'title',       label: 'Title',       type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
  ],
}

// Generic fallback schema for pages without specific schema
const DEFAULT_SCHEMA = [
  {
    key: 'header', label: 'Page Header', icon: 'fa-heading',
    fields: [
      { key: 'title', label: 'Page Title', type: 'text' },
      { key: 'breadcrumb', label: 'Breadcrumb', type: 'text' },
    ],
  },
  {
    key: '__root', label: 'Page Content', icon: 'fa-align-left',
    fields: [
      { key: 'badge',       label: 'Badge',       type: 'text' },
      { key: 'title',       label: 'Title',       type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
]

// ── Field renderers ──────────────────────────────────────────────────────────
function FieldInput({ field, value, onChange }) {
  const style = {
    width: '100%', padding: '9px 12px', borderRadius: 8, fontSize: 14,
    background: 'var(--admin-input-bg)', border: '1px solid var(--admin-border)',
    color: 'inherit', outline: 'none', boxSizing: 'border-box',
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        rows={4}
        style={{ ...style, resize: 'vertical', lineHeight: 1.6 }}
      />
    )
  }

  if (field.type === 'image') {
    return (
      <div>
        <input
          type="text"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          placeholder="/images/example.jpg or https://..."
          style={style}
        />
        {value && (
          <img
            src={value}
            alt="preview"
            onError={e => { e.target.style.display = 'none' }}
            style={{ marginTop: 8, maxHeight: 80, borderRadius: 8, objectFit: 'cover' }}
          />
        )}
      </div>
    )
  }

  return (
    <input
      type="text"
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      style={style}
    />
  )
}

function ArrayField({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : []
  const itemFields = field.itemFields || []

  function updateItem(idx, key, val) {
    const next = items.map((item, i) => i === idx ? { ...item, [key]: val } : item)
    onChange(next)
  }
  function addItem() { onChange([...items, {}]) }
  function removeItem(idx) { onChange(items.filter((_, i) => i !== idx)) }
  function moveUp(idx) {
    if (idx === 0) return
    const next = [...items]
    ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
    onChange(next)
  }
  function moveDown(idx) {
    if (idx === items.length - 1) return
    const next = [...items]
    ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
    onChange(next)
  }

  return (
    <div>
      {items.map((item, idx) => (
        <div key={idx} style={{
          background: 'var(--admin-bg)', border: '1px solid var(--admin-border)',
          borderRadius: 10, padding: 16, marginBottom: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 700, opacity: 0.5 }}>Item #{idx + 1}</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => moveUp(idx)} style={btnSm}>↑</button>
              <button onClick={() => moveDown(idx)} style={btnSm}>↓</button>
              <button onClick={() => removeItem(idx)} style={{ ...btnSm, color: '#ef4444' }}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
          {itemFields.map(f => (
            <div key={f.key} style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, fontWeight: 600, opacity: 0.65, display: 'block', marginBottom: 4 }}>
                {f.label}
              </label>
              <FieldInput field={f} value={item[f.key]} onChange={val => updateItem(idx, f.key, val)} />
            </div>
          ))}
        </div>
      ))}
      <button onClick={addItem} style={{
        background: 'rgba(212,168,67,0.12)', color: '#d4a843',
        border: '1.5px dashed #d4a843', borderRadius: 8,
        padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', width: '100%',
      }}>
        <i className="fas fa-plus" style={{ marginRight: 6 }}></i>Add Item
      </button>
    </div>
  )
}

const btnSm = {
  background: 'var(--admin-input-bg)', border: '1px solid var(--admin-border)',
  borderRadius: 6, padding: '4px 8px', fontSize: 12, cursor: 'pointer', color: 'inherit',
}

// ── SeoEditor ────────────────────────────────────────────────────────────────
function SeoEditor({ seo, onChange }) {
  function set(key, val) { onChange({ ...seo, [key]: val }) }

  const inputStyle = {
    width: '100%', padding: '9px 12px', borderRadius: 8, fontSize: 14,
    background: 'var(--admin-input-bg)', border: '1px solid var(--admin-border)',
    color: 'inherit', outline: 'none', boxSizing: 'border-box',
  }

  const label = (text, hint) => (
    <label style={{ fontSize: 12, fontWeight: 600, opacity: 0.65, display: 'block', marginBottom: 4 }}>
      {text} {hint && <span style={{ fontWeight: 400, opacity: 0.7 }}>— {hint}</span>}
    </label>
  )

  const field = (key, lbl, hint, type = 'text') => (
    <div style={{ marginBottom: 18 }}>
      {label(lbl, hint)}
      {type === 'textarea' ? (
        <textarea
          rows={3}
          value={seo[key] || ''}
          onChange={e => set(key, e.target.value)}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
        />
      ) : (
        <input
          type="text"
          value={seo[key] || ''}
          onChange={e => set(key, e.target.value)}
          style={inputStyle}
        />
      )}
      {type === 'text' && key === 'title' && (
        <div style={{ fontSize: 11, marginTop: 4, opacity: 0.5 }}>
          {(seo.title || '').length}/60 chars (ideal: &lt;60)
        </div>
      )}
      {type === 'textarea' && key === 'meta_description' && (
        <div style={{ fontSize: 11, marginTop: 4, opacity: 0.5 }}>
          {(seo.meta_description || '').length}/160 chars (ideal: 120–160)
        </div>
      )}
    </div>
  )

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
        <div style={{ gridColumn: '1 / -1' }}>
          {field('title', 'SEO Title', 'shown in browser tab and Google results')}
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          {field('meta_description', 'Meta Description', 'shown in Google snippet', 'textarea')}
        </div>
        {field('meta_keywords', 'Meta Keywords', 'comma-separated')}
        {field('canonical_url', 'Canonical URL', 'leave blank for auto')}
        {field('og_title', 'OG Title', 'for Facebook/WhatsApp sharing')}
        {field('og_description', 'OG Description', 'for social sharing', 'textarea')}
      </div>
      <div style={{ marginBottom: 18 }}>
        {label('OG Image', 'shown when page is shared on social')}
        <input
          type="text"
          value={seo.og_image || ''}
          onChange={e => set('og_image', e.target.value)}
          placeholder="/images/og-home.jpg or https://..."
          style={inputStyle}
        />
        {seo.og_image && (
          <img
            src={seo.og_image}
            alt="OG preview"
            onError={e => { e.target.style.display = 'none' }}
            style={{ marginTop: 8, maxHeight: 80, borderRadius: 8, objectFit: 'cover' }}
          />
        )}
      </div>

      <div style={{ marginBottom: 18 }}>
        {label('Custom Head HTML', 'injected inside <head> — for extra meta, tracking pixels, etc.')}
        <textarea
          rows={5}
          value={seo.custom_head || ''}
          onChange={e => set('custom_head', e.target.value)}
          placeholder={'<meta name="..." content="..." />\n<script>...</script>'}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6, fontFamily: 'monospace', fontSize: 13 }}
        />
      </div>

      <div style={{ marginBottom: 18 }}>
        {label('JSON-LD Schema', 'structured data for Google (paste full JSON-LD object)')}
        <textarea
          rows={8}
          value={seo.schema ? JSON.stringify(seo.schema, null, 2) : ''}
          onChange={e => {
            try { set('schema', JSON.parse(e.target.value)) }
            catch { /* let user finish typing */ }
          }}
          placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "Restaurant",\n  ...\n}'}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6, fontFamily: 'monospace', fontSize: 12 }}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14 }}>
          <input
            type="checkbox"
            checked={!!seo.no_index}
            onChange={e => set('no_index', e.target.checked)}
            style={{ width: 16, height: 16 }}
          />
          <span>No-Index this page <span style={{ opacity: 0.5, fontSize: 12 }}>(hide from search engines)</span></span>
        </label>
      </div>
    </div>
  )
}

// ── SiteContentEditor ────────────────────────────────────────────────────────
function SiteContentEditor() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    adminApi.get('/admin/site-content').then(({ data }) => {
      setRows(data || [])
      setLoading(false)
    })
  }, [])

  function update(id, val) {
    setRows(rows.map(r => r.id === id ? { ...r, content_value: val } : r))
  }

  async function save() {
    setSaving(true)
    await adminApi.put('/admin/site-content', {
      items: rows.map(r => ({ content_key: r.content_key, content_value: r.content_value })),
    })
    // Clear server cache
    try { await fetch('/api/admin/clear-cache', { method: 'POST' }) } catch {}
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const sections = [...new Set(rows.map(r => r.section))]

  if (loading) return <div style={{ padding: 20, opacity: 0.5 }}>Loading…</div>

  return (
    <div>
      {sections.map(section => (
        <div key={section} style={{ marginBottom: 32 }}>
          <h6 style={{ textTransform: 'capitalize', opacity: 0.7, marginBottom: 12, borderBottom: '1px solid var(--admin-border)', paddingBottom: 8 }}>
            {section}
          </h6>
          {rows.filter(r => r.section === section).map(row => (
            <div key={row.id} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, opacity: 0.65, display: 'block', marginBottom: 4 }}>
                {row.label || row.content_key}
                <span style={{ fontFamily: 'monospace', fontSize: 10, marginLeft: 8, opacity: 0.4 }}>{row.content_key}</span>
              </label>
              {row.content_type === 'html' || (row.content_value || '').length > 80 ? (
                <textarea
                  rows={3}
                  value={row.content_value || ''}
                  onChange={e => update(row.id, e.target.value)}
                  style={{
                    width: '100%', padding: '9px 12px', borderRadius: 8, fontSize: 13,
                    background: 'var(--admin-input-bg)', border: '1px solid var(--admin-border)',
                    color: 'inherit', resize: 'vertical', lineHeight: 1.6,
                    fontFamily: row.content_type === 'html' ? 'monospace' : 'inherit',
                    boxSizing: 'border-box',
                  }}
                />
              ) : (
                <input
                  type="text"
                  value={row.content_value || ''}
                  onChange={e => update(row.id, e.target.value)}
                  style={{
                    width: '100%', padding: '9px 12px', borderRadius: 8, fontSize: 14,
                    background: 'var(--admin-input-bg)', border: '1px solid var(--admin-border)',
                    color: 'inherit', boxSizing: 'border-box',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={save}
        disabled={saving}
        style={{
          background: '#d4a843', color: '#111', border: 'none', borderRadius: 10,
          padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer',
        }}
      >
        {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Site Settings'}
      </button>
    </div>
  )
}

// ── Main PageEditor ──────────────────────────────────────────────────────────
export default function PageEditor() {
  const { pageKey } = useParams()
  const navigate = useNavigate()
  const slug = pageKey === 'home' ? '/' : ('/' + pageKey.replace(/_/g, '/'))

  const [page, setPage] = useState(null)
  const [content, setContent] = useState({})
  const [seo, setSeo] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('content')
  const [expandedSection, setExpandedSection] = useState(null)

  useEffect(() => {
    adminApi.get(`/admin/page-content/${slugToPath(slug)}`).then(({ data }) => {
      if (data) {
        setPage(data)
        setContent(data.content || {})
        setSeo(data.seo || {})
      }
      setLoading(false)
    })
  }, [slug])

  const schema = SECTION_SCHEMAS[slug] || DEFAULT_SCHEMA

  function getFieldValue(sectionKey, fieldKey) {
    if (sectionKey === '__root') return content[fieldKey]
    return content[sectionKey]?.[fieldKey]
  }

  function setFieldValue(sectionKey, fieldKey, val) {
    if (fieldKey === '__array') {
      setContent(c => ({
        ...c,
        [sectionKey]: val,
      }))
    } else if (sectionKey === '__root') {
      setContent(c => ({ ...c, [fieldKey]: val }))
    } else {
      setContent(c => ({
        ...c,
        [sectionKey]: { ...(c[sectionKey] || {}), [fieldKey]: val },
      }))
    }
  }

  async function save() {
    setSaving(true)
    await adminApi.put('/admin/page-content', {
      slug, page_title: page?.page_title || slug, content, seo, is_published: page?.is_published ?? true,
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) return (
    <AdminLayout title="Page Editor">
      <div style={{ padding: 40, textAlign: 'center', opacity: 0.5 }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: 24 }}></i>
        <p style={{ marginTop: 8 }}>Loading page…</p>
      </div>
    </AdminLayout>
  )

  const tabStyle = (active) => ({
    padding: '10px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer',
    border: 'none', borderBottom: active ? '2px solid #d4a843' : '2px solid transparent',
    background: 'none', color: active ? '#d4a843' : 'inherit', opacity: active ? 1 : 0.6,
    transition: 'all 0.2s',
  })

  return (
    <AdminLayout title={`Edit: ${page?.page_title || slug}`}>
      <div style={{ maxWidth: 820 }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, opacity: 0.6 }}>
          <Link to="/admin/pages" style={{ color: 'inherit', textDecoration: 'none' }}>
            <i className="fas fa-th-large" style={{ marginRight: 4 }}></i>Pages
          </Link>
          <span>/</span>
          <span>{page?.page_title || slug}</span>
          <a href={slug} target="_blank" rel="noreferrer" style={{ marginLeft: 'auto', color: '#d4a843', fontSize: 12 }}>
            <i className="fas fa-external-link-alt" style={{ marginRight: 4 }}></i>Preview
          </a>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--admin-border)', marginBottom: 28 }}>
          <button style={tabStyle(activeTab === 'content')} onClick={() => setActiveTab('content')}>
            <i className="fas fa-align-left" style={{ marginRight: 6 }}></i>Content
          </button>
          <button style={tabStyle(activeTab === 'seo')} onClick={() => setActiveTab('seo')}>
            <i className="fas fa-search" style={{ marginRight: 6 }}></i>SEO & Head
          </button>
          {slug === '/' && (
            <button style={tabStyle(activeTab === 'site')} onClick={() => setActiveTab('site')}>
              <i className="fas fa-globe" style={{ marginRight: 6 }}></i>Site Settings
            </button>
          )}
          <button style={tabStyle(activeTab === 'json')} onClick={() => setActiveTab('json')}>
            <i className="fas fa-code" style={{ marginRight: 6 }}></i>Raw JSON
          </button>
        </div>

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div>
            {schema.map((section) => {
              const isExpanded = expandedSection === section.key || expandedSection === null
              return (
                <div key={section.key} style={{
                  background: 'var(--admin-card-bg)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: 12, marginBottom: 16, overflow: 'hidden',
                }}>
                  <button
                    onClick={() => setExpandedSection(expandedSection === section.key ? null : section.key)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                      padding: '16px 20px', background: 'none', border: 'none',
                      cursor: 'pointer', color: 'inherit', textAlign: 'left',
                    }}
                  >
                    <i className={`fas ${section.icon}`} style={{ color: '#d4a843', width: 20 }}></i>
                    <span style={{ fontWeight: 700, flex: 1 }}>{section.label}</span>
                    <i className={`fas fa-chevron-${expandedSection === section.key ? 'up' : 'down'}`} style={{ fontSize: 12, opacity: 0.5 }}></i>
                  </button>

                  {expandedSection === section.key && (
                    <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--admin-border)' }}>
                      <div style={{ height: 16 }} />
                      {section.fields.map(field => {
                        const val = getFieldValue(section.key, field.key)
                        if (field.type === 'array') {
                          return (
                            <div key={field.key} style={{ marginBottom: 18 }}>
                              <label style={{ fontSize: 12, fontWeight: 600, opacity: 0.65, display: 'block', marginBottom: 8 }}>
                                {field.label}
                              </label>
                              <ArrayField
                                field={field}
                                value={field.key === '__array'
                                  ? (section.key === '__root' ? content[section.key] : content[section.key])
                                  : (section.key === '__root' ? content[field.key] : content[section.key]?.[field.key])}
                                onChange={v => setFieldValue(section.key, field.key, v)}
                              />
                            </div>
                          )
                        }
                        return (
                          <div key={field.key} style={{ marginBottom: 16 }}>
                            <label style={{ fontSize: 12, fontWeight: 600, opacity: 0.65, display: 'block', marginBottom: 4 }}>
                              {field.label}
                            </label>
                            <FieldInput
                              field={field}
                              value={val}
                              onChange={v => setFieldValue(section.key, field.key, v)}
                            />
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div style={{ background: 'var(--admin-card-bg)', border: '1px solid var(--admin-border)', borderRadius: 12, padding: 24 }}>
            <SeoEditor seo={seo} onChange={setSeo} />
          </div>
        )}

        {/* Site Settings Tab (home page only) */}
        {activeTab === 'site' && (
          <div style={{ background: 'var(--admin-card-bg)', border: '1px solid var(--admin-border)', borderRadius: 12, padding: 24 }}>
            <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 20 }}>
              These values are used site-wide: header, footer, contact info, social links, Google Analytics, etc.
            </p>
            <SiteContentEditor />
          </div>
        )}

        {/* Raw JSON Tab */}
        {activeTab === 'json' && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Content JSON</label>
              <textarea
                rows={20}
                value={JSON.stringify(content, null, 2)}
                onChange={e => { try { setContent(JSON.parse(e.target.value)) } catch {} }}
                style={{
                  width: '100%', padding: 14, borderRadius: 10, fontSize: 12,
                  background: 'var(--admin-input-bg)', border: '1px solid var(--admin-border)',
                  color: 'inherit', fontFamily: 'monospace', lineHeight: 1.6,
                  resize: 'vertical', boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
        )}

        {/* Save bar */}
        <div style={{
          position: 'sticky', bottom: 0, background: 'var(--admin-bg)',
          borderTop: '1px solid var(--admin-border)', padding: '16px 0',
          display: 'flex', alignItems: 'center', gap: 12, marginTop: 24,
          zIndex: 10,
        }}>
          <button
            onClick={save}
            disabled={saving}
            style={{
              background: '#d4a843', color: '#111', border: 'none', borderRadius: 10,
              padding: '12px 32px', fontWeight: 700, fontSize: 15, cursor: saving ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            {saving
              ? <><i className="fas fa-spinner fa-spin"></i> Saving…</>
              : saved
              ? <><i className="fas fa-check"></i> Saved!</>
              : <><i className="fas fa-save"></i> Save Changes</>}
          </button>
          <Link to="/admin/pages" style={{ color: 'inherit', opacity: 0.5, fontSize: 14, textDecoration: 'none' }}>
            Cancel
          </Link>
          {saved && (
            <span style={{ fontSize: 13, color: '#16a34a', marginLeft: 'auto' }}>
              <i className="fas fa-check-circle" style={{ marginRight: 4 }}></i>
              Changes saved. Reload the site to see updates.
            </span>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
