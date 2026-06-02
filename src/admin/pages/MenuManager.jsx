import React, { useEffect, useRef, useState } from 'react'
import AdminLayout from '../AdminLayout'
import { supabase } from '../../lib/supabase'

// Compress any image file to WebP using the browser Canvas API (no library needed)
async function compressToWebP(file, maxPx = 400, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      const ratio = Math.min(maxPx / img.width, maxPx / img.height, 1)
      const w = Math.round(img.width * ratio)
      const h = Math.round(img.height * ratio)
      const canvas = document.createElement('canvas')
      canvas.width = w; canvas.height = h
      canvas.getContext('2d').drawImage(img, 0, 0, w, h)
      canvas.toBlob(
        blob => blob ? resolve(blob) : reject(new Error('WebP conversion failed')),
        'image/webp', quality
      )
    }
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('Image load failed')) }
    img.src = objectUrl
  })
}

async function uploadToStorage(blob, baseName) {
  const path = `menu/${Date.now()}-${baseName}.webp`
  const { error } = await supabase.storage
    .from('menu-images')
    .upload(path, blob, { contentType: 'image/webp', upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from('menu-images').getPublicUrl(path)
  return data.publicUrl
}

const EMPTY_CAT = { name: '', slug: '', description: '', image_url: '', sort_order: 0, is_active: true }
const EMPTY_ITEM = { name: '', category_id: '', description: '', price: '', price_half: '', image_url: '', is_vegetarian: true, is_featured: false, sort_order: 0, is_active: true }

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default function MenuManager() {
  const [tab, setTab] = useState('categories')
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | 'cat' | 'item'
  const [form, setForm] = useState(EMPTY_CAT)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    const [catsRes, itemsRes] = await Promise.all([
      supabase.from('menu_categories').select('*').order('sort_order'),
      supabase.from('menu_items').select('*, menu_categories(name)').order('sort_order'),
    ])
    setCategories(catsRes.data || [])
    setItems(itemsRes.data || [])
    setLoading(false)
  }

  function setField(k, v) { setForm(f => ({ ...f, [k]: v })) }

  function openCatModal(cat = null) {
    setForm(cat ? { ...cat } : EMPTY_CAT)
    setEditingId(cat?.id || null)
    setModal('cat')
  }

  function openItemModal(item = null) {
    setForm(item ? { ...item, price: item.price?.toString() || '' } : EMPTY_ITEM)
    setEditingId(item?.id || null)
    setModal('item')
  }

  function closeModal() { setModal(null); setEditingId(null) }

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  async function handleImagePick(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const blob = await compressToWebP(file, 400, 0.82)
      const originalKB = Math.round(file.size / 1024)
      const compressedKB = Math.round(blob.size / 1024)
      let publicUrl
      try {
        publicUrl = await uploadToStorage(blob, file.name.replace(/\.[^.]+$/, ''))
      } catch (storageErr) {
        // Storage bucket not configured — fall back to object URL preview only
        showToast(`Storage error: ${storageErr.message}. Check Supabase Storage setup.`)
        setUploading(false)
        return
      }
      setField('image_url', publicUrl)
      showToast(`Uploaded! ${originalKB}KB → ${compressedKB}KB (WebP)`)
    } catch (err) {
      showToast(`Image error: ${err.message}`)
    }
    setUploading(false)
    e.target.value = ''
  }

  async function saveCat(e) {
    e.preventDefault(); setSaving(true)
    const payload = { ...form, slug: form.slug || slugify(form.name) }
    const { error } = editingId
      ? await supabase.from('menu_categories').update(payload).eq('id', editingId)
      : await supabase.from('menu_categories').insert([payload])
    setSaving(false)
    if (error) return alert(error.message)
    showToast('Category saved!')
    closeModal(); fetchData()
  }

  async function saveItem(e) {
    e.preventDefault(); setSaving(true)
    const payload = { ...form, price: parseFloat(form.price) || null, price_half: parseFloat(form.price_half) || null }
    const { error } = editingId
      ? await supabase.from('menu_items').update(payload).eq('id', editingId)
      : await supabase.from('menu_items').insert([payload])
    setSaving(false)
    if (error) return alert(error.message)
    showToast('Menu item saved!')
    closeModal(); fetchData()
  }

  async function deleteCat(id) {
    if (!confirm('Delete this category? All items in it will lose their category.')) return
    await supabase.from('menu_categories').delete().eq('id', id)
    fetchData()
  }

  async function deleteItem(id) {
    if (!confirm('Delete this menu item?')) return
    await supabase.from('menu_items').delete().eq('id', id)
    fetchData()
  }

  async function toggleActive(table, id, current) {
    await supabase.from(table).update({ is_active: !current }).eq('id', id)
    fetchData()
  }

  return (
    <AdminLayout title="Menu Manager">
      {toast && <div className="alert-admin success"><i className="fas fa-check-circle" style={{marginRight:8}}></i>{toast}</div>}

      <div className="tabs-admin">
        <button className={`tab-admin ${tab === 'categories' ? 'active' : ''}`} onClick={() => setTab('categories')}>
          <i className="fas fa-layer-group" style={{marginRight:6}}></i>Categories ({categories.length})
        </button>
        <button className={`tab-admin ${tab === 'items' ? 'active' : ''}`} onClick={() => setTab('items')}>
          <i className="fas fa-utensils" style={{marginRight:6}}></i>Menu Items ({items.length})
        </button>
      </div>

      {/* ── Categories Tab ────────────────────────────────────── */}
      {tab === 'categories' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h6>Menu Categories</h6>
            <button className="btn-admin" onClick={() => openCatModal()}>
              <i className="fas fa-plus"></i> Add Category
            </button>
          </div>
          <div style={{overflowX:'auto'}}>
            {loading ? <div className="admin-loading"><i className="fas fa-spinner fa-spin"></i> Loading…</div> :
            categories.length === 0 ? <div className="admin-empty"><i className="fas fa-layer-group"></i><p>No categories yet</p></div> :
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Slug</th><th>Order</th><th>Active</th><th>Actions</th></tr></thead>
              <tbody>
                {categories.map(c => (
                  <tr key={c.id}>
                    <td>
                      {c.image_url && <img src={c.image_url} alt={c.name} style={{width:36,height:36,objectFit:'cover',borderRadius:6,marginRight:10}} />}
                      <span style={{fontWeight:500}}>{c.name}</span>
                    </td>
                    <td><code style={{fontSize:12,background:'#f3f4f6',padding:'2px 6px',borderRadius:4}}>{c.slug}</code></td>
                    <td>{c.sort_order}</td>
                    <td>
                      <button
                        onClick={() => toggleActive('menu_categories', c.id, c.is_active)}
                        className={c.is_active ? 'badge-status badge-published' : 'badge-status badge-draft'}
                        style={{border:'none',cursor:'pointer',background:'none',padding:0}}
                      >
                        {c.is_active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td>
                      <div style={{display:'flex',gap:6}}>
                        <button className="btn-edit-sm" onClick={() => openCatModal(c)}><i className="fas fa-edit"></i></button>
                        <button className="btn-danger-sm" onClick={() => deleteCat(c.id)}><i className="fas fa-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>}
          </div>
        </div>
      )}

      {/* ── Items Tab ─────────────────────────────────────────── */}
      {tab === 'items' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h6>Menu Items</h6>
            <button className="btn-admin" onClick={() => openItemModal()}>
              <i className="fas fa-plus"></i> Add Item
            </button>
          </div>
          <div style={{overflowX:'auto'}}>
            {loading ? <div className="admin-loading"><i className="fas fa-spinner fa-spin"></i> Loading…</div> :
            items.length === 0 ? <div className="admin-empty"><i className="fas fa-utensils"></i><p>No items yet</p></div> :
            <table className="admin-table">
              <thead><tr><th>Item</th><th>Category</th><th>Price</th><th>Veg</th><th>Active</th><th>Actions</th></tr></thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>
                      {item.image_url && <img src={item.image_url} alt={item.name} style={{width:36,height:36,objectFit:'cover',borderRadius:6,marginRight:10}} />}
                      <div style={{display:'inline-block'}}>
                        <div style={{fontWeight:500}}>{item.name}</div>
                        {item.is_featured && <span className="badge-status" style={{background:'rgba(212,168,67,0.12)',color:'var(--admin-accent)',fontSize:11}}>Featured</span>}
                      </div>
                    </td>
                    <td>{item.menu_categories?.name || '—'}</td>
                    <td style={{whiteSpace:'nowrap'}}>{item.price_half ? 'Half: ₹'+item.price_half+' / Full: ₹'+item.price : item.price ? '₹'+item.price : '—'}</td>
                    <td>{item.is_vegetarian ? '🌱' : '🍖'}</td>
                    <td>
                      <button
                        onClick={() => toggleActive('menu_items', item.id, item.is_active)}
                        className={item.is_active ? 'badge-status badge-published' : 'badge-status badge-draft'}
                        style={{border:'none',cursor:'pointer',background:'none',padding:0}}
                      >
                        {item.is_active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td>
                      <div style={{display:'flex',gap:6}}>
                        <button className="btn-edit-sm" onClick={() => openItemModal(item)}><i className="fas fa-edit"></i></button>
                        <button className="btn-danger-sm" onClick={() => deleteItem(item.id)}><i className="fas fa-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>}
          </div>
        </div>
      )}

      {/* ── Category Modal ────────────────────────────────────── */}
      {modal === 'cat' && (
        <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h5>{editingId ? 'Edit Category' : 'Add Category'}</h5>
              <button className="btn-close-modal" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={saveCat}>
              <div className="admin-modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="admin-form-group">
                      <label>Category Name</label>
                      <input value={form.name} onChange={e => { setField('name', e.target.value); if (!editingId) setField('slug', slugify(e.target.value)) }} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="admin-form-group">
                      <label>Slug</label>
                      <input value={form.slug} onChange={e => setField('slug', e.target.value)} placeholder="auto-generated" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="admin-form-group">
                      <label>Description</label>
                      <textarea value={form.description} onChange={e => setField('description', e.target.value)} rows={2} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="admin-form-group">
                      <label>Image</label>
                      <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
                        <label style={{
                          display:'inline-flex',alignItems:'center',gap:6,
                          background:'var(--admin-accent)',color:'#111',
                          borderRadius:6,padding:'7px 14px',fontSize:13,fontWeight:600,
                          cursor: uploading ? 'wait' : 'pointer',opacity: uploading ? 0.7 : 1,
                          whiteSpace:'nowrap',flexShrink:0,
                        }}>
                          <i className={`fas ${uploading ? 'fa-spinner fa-spin' : 'fa-upload'}`}></i>
                          {uploading ? ' Compressing…' : ' Upload Image'}
                          <input type="file" accept="image/*" style={{display:'none'}} disabled={uploading} onChange={handleImagePick} />
                        </label>
                        <input value={form.image_url} onChange={e => setField('image_url', e.target.value)}
                          placeholder="or paste URL" style={{flex:1,minWidth:120}} />
                        {form.image_url && (
                          <img src={form.image_url} alt="" style={{width:40,height:40,objectFit:'cover',borderRadius:6,flexShrink:0}}
                            onError={e => { e.target.style.display='none' }} />
                        )}
                      </div>
                      <p style={{fontSize:11,opacity:0.5,margin:'4px 0 0'}}>Auto-compressed to WebP on upload</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="admin-form-group">
                      <label>Sort Order</label>
                      <input type="number" value={form.sort_order} onChange={e => setField('sort_order', parseInt(e.target.value))} />
                    </div>
                  </div>
                  <div className="col-12">
                    <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:14}}>
                      <input type="checkbox" checked={form.is_active} onChange={e => setField('is_active', e.target.checked)} />
                      <span>Active (visible on site)</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="btn-admin-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-admin" disabled={saving}>
                  {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving…</> : <><i className="fas fa-save"></i> Save</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Item Modal ────────────────────────────────────────── */}
      {modal === 'item' && (
        <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h5>{editingId ? 'Edit Menu Item' : 'Add Menu Item'}</h5>
              <button className="btn-close-modal" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={saveItem}>
              <div className="admin-modal-body">
                <div className="row g-3">
                  <div className="col-md-8">
                    <div className="admin-form-group">
                      <label>Item Name</label>
                      <input value={form.name} onChange={e => setField('name', e.target.value)} required />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="admin-form-group">
                      <label>Full Price (₹)</label>
                      <input type="number" step="0.01" value={form.price} onChange={e => setField('price', e.target.value)} placeholder="0.00" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="admin-form-group">
                      <label>Half Price (₹) <span style={{fontWeight:400,opacity:0.5}}>(optional)</span></label>
                      <input type="number" step="0.01" value={form.price_half || '' } onChange={e => setField('price_half', e.target.value)} placeholder="0.00" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="admin-form-group">
                      <label>Category</label>
                      <select value={form.category_id} onChange={e => setField('category_id', e.target.value)}>
                        <option value="">— Select Category —</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="admin-form-group">
                      <label>Description</label>
                      <textarea value={form.description} onChange={e => setField('description', e.target.value)} rows={3} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="admin-form-group">
                      <label>Image</label>
                      <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
                        <label style={{
                          display:'inline-flex',alignItems:'center',gap:6,
                          background:'var(--admin-accent)',color:'#111',
                          borderRadius:6,padding:'7px 14px',fontSize:13,fontWeight:600,
                          cursor: uploading ? 'wait' : 'pointer',opacity: uploading ? 0.7 : 1,
                          whiteSpace:'nowrap',flexShrink:0,
                        }}>
                          <i className={`fas ${uploading ? 'fa-spinner fa-spin' : 'fa-upload'}`}></i>
                          {uploading ? ' Compressing…' : ' Upload Image'}
                          <input type="file" accept="image/*" style={{display:'none'}} disabled={uploading} onChange={handleImagePick} />
                        </label>
                        <input value={form.image_url} onChange={e => setField('image_url', e.target.value)}
                          placeholder="or paste URL" style={{flex:1,minWidth:120}} />
                        {form.image_url && (
                          <img src={form.image_url} alt="" style={{width:40,height:40,objectFit:'cover',borderRadius:6,flexShrink:0}}
                            onError={e => { e.target.style.display='none' }} />
                        )}
                      </div>
                      <p style={{fontSize:11,opacity:0.5,margin:'4px 0 0'}}>Auto-compressed to WebP on upload</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="admin-form-group">
                      <label>Sort Order</label>
                      <input type="number" value={form.sort_order} onChange={e => setField('sort_order', parseInt(e.target.value))} />
                    </div>
                  </div>
                  <div className="col-12" style={{display:'flex',gap:20,flexWrap:'wrap'}}>
                    <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:14}}>
                      <input type="checkbox" checked={form.is_vegetarian} onChange={e => setField('is_vegetarian', e.target.checked)} />
                      <span>🌱 Vegetarian</span>
                    </label>
                    <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:14}}>
                      <input type="checkbox" checked={form.is_featured} onChange={e => setField('is_featured', e.target.checked)} />
                      <span>⭐ Featured</span>
                    </label>
                    <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:14}}>
                      <input type="checkbox" checked={form.is_active} onChange={e => setField('is_active', e.target.checked)} />
                      <span>Active (visible)</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="btn-admin-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-admin" disabled={saving}>
                  {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving…</> : <><i className="fas fa-save"></i> Save Item</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
