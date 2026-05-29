import React, { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout'
import { supabase } from '../../lib/supabase'

const EMPTY_POST = {
  title: '', slug: '', content: '', excerpt: '', featured_image: '',
  author: 'Golden Spoon', category: '', seo_title: '', seo_description: '',
  seo_keywords: '', og_image: '', is_published: false
}

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-')
}

export default function BlogManager() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list') // 'list' | 'edit'
  const [form, setForm] = useState(EMPTY_POST)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [activeTab, setActiveTab] = useState('content')

  useEffect(() => { fetchPosts() }, [])

  async function fetchPosts() {
    setLoading(true)
    const { data } = await supabase.from('blog_posts').select('id,title,slug,is_published,author,created_at,excerpt').order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  function setField(k, v) { setForm(f => ({ ...f, [k]: v })) }

  function openNew() {
    setForm(EMPTY_POST)
    setEditingId(null)
    setActiveTab('content')
    setView('edit')
  }

  async function openEdit(id) {
    const { data } = await supabase.from('blog_posts').select('*').eq('id', id).single()
    if (data) { setForm(data); setEditingId(id) }
    setActiveTab('content')
    setView('edit')
  }

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  async function handleSave(publish = null) {
    setSaving(true)
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      is_published: publish !== null ? publish : form.is_published,
      published_at: (publish === true && !form.published_at) ? new Date().toISOString() : form.published_at,
    }

    const { error } = editingId
      ? await supabase.from('blog_posts').update(payload).eq('id', editingId)
      : await supabase.from('blog_posts').insert([payload])

    setSaving(false)
    if (error) return alert(error.message)
    showToast('Post saved!')
    fetchPosts()
    setView('list')
  }

  async function deletePost(id) {
    if (!confirm('Delete this blog post? This cannot be undone.')) return
    await supabase.from('blog_posts').delete().eq('id', id)
    fetchPosts()
  }

  async function togglePublish(id, current) {
    await supabase.from('blog_posts').update({
      is_published: !current,
      published_at: !current ? new Date().toISOString() : null
    }).eq('id', id)
    fetchPosts()
  }

  const formatDate = d => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

  if (view === 'edit') {
    return (
      <AdminLayout title={editingId ? 'Edit Post' : 'New Blog Post'}>
        {toast && <div className="alert-admin success"><i className="fas fa-check-circle" style={{marginRight:8}}></i>{toast}</div>}

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <button className="btn-admin-outline" onClick={() => setView('list')}>
            <i className="fas fa-arrow-left"></i> Back to Posts
          </button>
          <div style={{display:'flex',gap:10}}>
            <button className="btn-admin-outline" onClick={() => handleSave(false)} disabled={saving}>
              <i className="fas fa-save"></i> Save Draft
            </button>
            <button className="btn-admin" onClick={() => handleSave(true)} disabled={saving}>
              {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving…</> : <><i className="fas fa-globe"></i> Publish</>}
            </button>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-lg-8">
            <div className="admin-card admin-card-body" style={{marginBottom:16}}>
              <div className="admin-form-group">
                <label style={{fontSize:11,textTransform:'uppercase',letterSpacing:'0.08em',fontWeight:700,color:'var(--admin-text-muted)'}}>Title</label>
                <input
                  value={form.title}
                  onChange={e => { setField('title', e.target.value); if (!editingId) setField('slug', slugify(e.target.value)) }}
                  placeholder="Post title…"
                  style={{fontSize:22,fontWeight:700,border:'none',borderBottom:'2px solid var(--admin-border)',borderRadius:0,padding:'4px 0'}}
                />
              </div>
            </div>

            <div className="admin-card">
              <div className="tabs-admin" style={{padding:'0 20px',marginBottom:0}}>
                {['content','excerpt','seo'].map(t => (
                  <button key={t} className={`tab-admin ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)} style={{textTransform:'capitalize'}}>
                    {t === 'seo' ? 'SEO' : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              <div className="admin-card-body">
                {activeTab === 'content' && (
                  <div className="admin-form-group" style={{margin:0}}>
                    <textarea
                      value={form.content}
                      onChange={e => setField('content', e.target.value)}
                      placeholder="Write your blog post content here… (Markdown or HTML supported)"
                      style={{minHeight: 420, fontFamily: 'monospace', fontSize: 14, lineHeight: 1.6}}
                    />
                  </div>
                )}
                {activeTab === 'excerpt' && (
                  <div className="admin-form-group" style={{margin:0}}>
                    <label>Excerpt (shown in blog listing)</label>
                    <textarea value={form.excerpt} onChange={e => setField('excerpt', e.target.value)} placeholder="A short summary of this post…" rows={5} />
                  </div>
                )}
                {activeTab === 'seo' && (
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="admin-form-group">
                        <label>SEO Title <span style={{fontWeight:400,color:'var(--admin-text-muted)'}}>(defaults to post title)</span></label>
                        <input value={form.seo_title} onChange={e => setField('seo_title', e.target.value)} maxLength={70} />
                        <div className="admin-form-hint">{form.seo_title?.length || 0} / 70</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="admin-form-group">
                        <label>Meta Description</label>
                        <textarea value={form.seo_description} onChange={e => setField('seo_description', e.target.value)} rows={3} maxLength={170} />
                        <div className="admin-form-hint">{form.seo_description?.length || 0} / 170</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="admin-form-group">
                        <label>Keywords</label>
                        <input value={form.seo_keywords} onChange={e => setField('seo_keywords', e.target.value)} placeholder="food blog, Indian recipes, …" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="admin-form-group">
                        <label>OG Image URL (social preview)</label>
                        <input value={form.og_image} onChange={e => setField('og_image', e.target.value)} placeholder="/images/blog/post-og.jpg" />
                      </div>
                    </div>
                    {/* SERP Preview */}
                    <div className="col-12">
                      <div style={{fontSize:13,fontWeight:600,marginBottom:6,color:'var(--admin-text-muted)'}}>
                        <i className="fab fa-google" style={{marginRight:6}}></i>Search Preview
                      </div>
                      <div className="admin-seo-preview">
                        <div className="seo-title">{(form.seo_title || form.title || 'Post Title').slice(0,70)}</div>
                        <div className="seo-url">goldenspoon.in/blog/{form.slug || 'post-slug'}</div>
                        <div className="seo-desc">{(form.seo_description || form.excerpt || 'Post description…').slice(0,160)}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="admin-card admin-card-body" style={{marginBottom:12}}>
              <div style={{fontWeight:600,fontSize:14,marginBottom:12}}>Post Settings</div>
              <div className="admin-form-group">
                <label>URL Slug</label>
                <input value={form.slug} onChange={e => setField('slug', e.target.value)} placeholder="post-slug" />
                <div className="admin-form-hint">goldenspoon.in/blog/{form.slug || 'post-slug'}</div>
              </div>
              <div className="admin-form-group">
                <label>Author</label>
                <input value={form.author} onChange={e => setField('author', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Category</label>
                <input value={form.category} onChange={e => setField('category', e.target.value)} placeholder="Food Tips, Recipes…" />
              </div>
              <div className="admin-form-group">
                <label>Featured Image URL</label>
                <input value={form.featured_image} onChange={e => setField('featured_image', e.target.value)} placeholder="/images/post-1.jpg" />
                {form.featured_image && <img src={form.featured_image} alt="preview" style={{width:'100%',marginTop:8,borderRadius:6,objectFit:'cover',maxHeight:140}} onError={e => e.target.style.display='none'} />}
              </div>
              <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:14}}>
                <input type="checkbox" checked={form.is_published} onChange={e => setField('is_published', e.target.checked)} />
                <span>Published</span>
              </label>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Blog Manager">
      {toast && <div className="alert-admin success"><i className="fas fa-check-circle" style={{marginRight:8}}></i>{toast}</div>}

      <div className="admin-card">
        <div className="admin-card-header">
          <h6><i className="fas fa-blog" style={{marginRight:8,color:'var(--admin-accent)'}}></i>Blog Posts</h6>
          <button className="btn-admin" onClick={openNew}>
            <i className="fas fa-plus"></i> New Post
          </button>
        </div>
        <div style={{overflowX:'auto'}}>
          {loading ? <div className="admin-loading"><i className="fas fa-spinner fa-spin"></i> Loading…</div> :
          posts.length === 0 ? <div className="admin-empty"><i className="fas fa-blog"></i><p>No blog posts yet. Click "New Post" to write your first.</p></div> :
          <table className="admin-table">
            <thead><tr><th>Title</th><th>Status</th><th>Author</th><th>Created</th><th>Actions</th></tr></thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{fontWeight:500}}>{p.title}</div>
                    <div style={{fontSize:12,color:'var(--admin-text-muted)'}}>/blog/{p.slug}</div>
                  </td>
                  <td>
                    <button
                      onClick={() => togglePublish(p.id, p.is_published)}
                      className={`badge-status ${p.is_published ? 'badge-published' : 'badge-draft'}`}
                      style={{border:'none',cursor:'pointer',background:'none',padding:0}}
                    >
                      {p.is_published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td>{p.author}</td>
                  <td>{formatDate(p.created_at)}</td>
                  <td>
                    <div style={{display:'flex',gap:6}}>
                      <button className="btn-edit-sm" onClick={() => openEdit(p.id)}><i className="fas fa-edit"></i> Edit</button>
                      <button className="btn-danger-sm" onClick={() => deletePost(p.id)}><i className="fas fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>
      </div>
    </AdminLayout>
  )
}
