import React, { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout'
import { supabase } from '../../lib/supabase'

const EMPTY_SEO = {
  page_slug: '', page_name: '', title: '', meta_description: '',
  meta_keywords: '', og_title: '', og_description: '', og_image: '', no_index: false
}

export default function SeoManager() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null or seo row object
  const [form, setForm] = useState(EMPTY_SEO)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => { fetchPages() }, [])

  async function fetchPages() {
    setLoading(true)
    const { data } = await supabase.from('seo_pages').select('*').order('page_slug')
    setPages(data || [])
    setLoading(false)
  }

  function openEdit(page) {
    setForm({ ...EMPTY_SEO, ...page })
    setEditing(page)
  }

  function openNew() {
    setForm(EMPTY_SEO)
    setEditing('new')
  }

  function closeModal() {
    setEditing(null)
    setForm(EMPTY_SEO)
  }

  function setField(key, value) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)

    let error
    if (editing === 'new') {
      ({ error } = await supabase.from('seo_pages').insert([form]))
    } else {
      ({ error } = await supabase.from('seo_pages').update(form).eq('id', editing.id))
    }

    setSaving(false)
    if (error) {
      alert('Error: ' + error.message)
    } else {
      setToast('SEO settings saved successfully!')
      setTimeout(() => setToast(''), 3000)
      closeModal()
      fetchPages()
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this SEO page configuration?')) return
    await supabase.from('seo_pages').delete().eq('id', id)
    fetchPages()
  }

  // Google SERP preview
  const previewTitle = (form.title || 'Page Title') + ' | Golden Spoon Restaurrant'
  const previewDesc = form.meta_description || 'Page description will appear here in Google search results.'
  const previewUrl = 'goldenspoon.in' + (form.page_slug || '/')

  return (
    <AdminLayout title="SEO Manager">
      {toast && <div className="alert-admin success"><i className="fas fa-check-circle" style={{marginRight: 8}}></i>{toast}</div>}

      <div className="admin-card">
        <div className="admin-card-header">
          <h6><i className="fas fa-search" style={{marginRight: 8, color: 'var(--admin-accent)'}}></i>Page SEO Settings</h6>
          <button className="btn-admin" onClick={openNew}>
            <i className="fas fa-plus"></i> Add Page
          </button>
        </div>

        <div style={{overflowX: 'auto'}}>
          {loading ? (
            <div className="admin-loading"><i className="fas fa-spinner fa-spin"></i> Loading…</div>
          ) : pages.length === 0 ? (
            <div className="admin-empty">
              <i className="fas fa-search"></i>
              <p>No SEO pages configured yet. Run the schema.sql to seed defaults.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr><th>Page</th><th>Slug</th><th>Title</th><th>Description</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {pages.map(p => (
                  <tr key={p.id}>
                    <td style={{fontWeight: 500}}>{p.page_name}</td>
                    <td><code style={{fontSize: 12, background: '#f3f4f6', padding: '2px 6px', borderRadius: 4}}>{p.page_slug}</code></td>
                    <td style={{maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      {p.title || <span style={{color: 'var(--admin-text-muted)'}}>Not set</span>}
                    </td>
                    <td style={{maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      {p.meta_description || <span style={{color: 'var(--admin-text-muted)'}}>Not set</span>}
                    </td>
                    <td>
                      <div style={{display: 'flex', gap: 6}}>
                        <button className="btn-edit-sm" onClick={() => openEdit(p)}><i className="fas fa-edit"></i> Edit</button>
                        <button className="btn-danger-sm" onClick={() => handleDelete(p.id)}><i className="fas fa-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="admin-modal" style={{maxWidth: 700}}>
            <div className="admin-modal-header">
              <h5>{editing === 'new' ? 'Add SEO Page' : `Edit SEO: ${editing.page_name}`}</h5>
              <button className="btn-close-modal" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="admin-form-group">
                      <label>Page Name</label>
                      <input value={form.page_name} onChange={e => setField('page_name', e.target.value)} placeholder="e.g. Home" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="admin-form-group">
                      <label>Page Slug</label>
                      <input value={form.page_slug} onChange={e => setField('page_slug', e.target.value)} placeholder="e.g. / or /menu" required />
                      <div className="admin-form-hint">Use / for homepage, /menu for menu page, etc.</div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="admin-form-group">
                      <label>SEO Title <span style={{fontWeight:400, color:'var(--admin-text-muted)'}}>(50–60 chars recommended)</span></label>
                      <input value={form.title} onChange={e => setField('title', e.target.value)} placeholder="Golden Spoon Restaurrant | Best Indian Food in Noida" maxLength={70} />
                      <div className="admin-form-hint">{form.title?.length || 0} / 70 characters</div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="admin-form-group">
                      <label>Meta Description <span style={{fontWeight:400, color:'var(--admin-text-muted)'}}>(150–160 chars recommended)</span></label>
                      <textarea value={form.meta_description} onChange={e => setField('meta_description', e.target.value)} placeholder="Describe this page for search engines…" maxLength={170} rows={3} />
                      <div className="admin-form-hint">{form.meta_description?.length || 0} / 170 characters</div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="admin-form-group">
                      <label>Meta Keywords <span style={{fontWeight:400, color:'var(--admin-text-muted)'}}>(optional, comma-separated)</span></label>
                      <input value={form.meta_keywords} onChange={e => setField('meta_keywords', e.target.value)} placeholder="Indian restaurant Noida, Golden Spoon, tandoor" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="admin-form-group">
                      <label>OG Title (Social Share)</label>
                      <input value={form.og_title} onChange={e => setField('og_title', e.target.value)} placeholder="Same as SEO title if blank" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="admin-form-group">
                      <label>OG Image URL</label>
                      <input value={form.og_image} onChange={e => setField('og_image', e.target.value)} placeholder="/images/og-home.jpg" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="admin-form-group">
                      <label>OG Description (Social Share)</label>
                      <textarea value={form.og_description} onChange={e => setField('og_description', e.target.value)} placeholder="Description for social media previews…" rows={2} />
                    </div>
                  </div>
                  <div className="col-12">
                    <label style={{display:'flex', alignItems:'center', gap: 8, cursor:'pointer', fontSize: 14}}>
                      <input type="checkbox" checked={form.no_index} onChange={e => setField('no_index', e.target.checked)} />
                      <span>No-index this page (hide from Google)</span>
                    </label>
                  </div>
                </div>

                {/* SERP Preview */}
                <div style={{marginTop: 20}}>
                  <div style={{fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--admin-text-muted)'}}>
                    <i className="fab fa-google" style={{marginRight: 6}}></i>Google Search Preview
                  </div>
                  <div className="admin-seo-preview">
                    <div className="seo-title">{previewTitle.slice(0, 70)}</div>
                    <div className="seo-url">{previewUrl}</div>
                    <div className="seo-desc">{previewDesc.slice(0, 160)}</div>
                  </div>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="btn-admin-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-admin" disabled={saving}>
                  {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving…</> : <><i className="fas fa-save"></i> Save SEO</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
