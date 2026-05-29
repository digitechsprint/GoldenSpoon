import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageData } from '../context/PageDataContext';
import { supabase } from '../lib/supabase'
import { useCart } from '../context/CartContext'

export default function OrderPage() {
  const { content = {} } = usePageData();
  const header = content.header || {};
  const { addItem, itemCount, total, setIsOpen } = useCart()
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState({}) // track recently-added for button feedback

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchMenu()
  }, [])

  async function fetchMenu() {
    const [catsRes, itemsRes] = await Promise.all([
      supabase.from('menu_categories').select('*').eq('is_active', true).order('sort_order'),
      supabase.from('menu_items').select('*, menu_categories(name)').eq('is_active', true).order('sort_order'),
    ])
    setCategories(catsRes.data || [])
    setItems(itemsRes.data || [])
    setLoading(false)
  }

  function handleAdd(item) {
    addItem({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price) || 0,
      image: item.image_url,
      category: item.menu_categories?.name || '',
    })
    setAdded(a => ({ ...a, [item.id]: true }))
    setTimeout(() => setAdded(a => ({ ...a, [item.id]: false })), 1200)
  }

  const filtered = items.filter(item => {
    const matchCat = activeCategory === 'all' || item.category_id === activeCategory
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <main>
      {/* Page header */}
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">{header.title || 'Order Online'}</h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">home</Link></li>
                    <li className="breadcrumb-item active">{header.breadcrumb || 'Order Online'}</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '60px 0', minHeight: '60vh' }}>
        <div className="container">
          {/* Search + Category Tabs */}
          <div className="row section-row">
            <div className="col-lg-12">
              <div className="section-title" style={{ textAlign: 'center' }}>
                <h3 className="wow fadeInUp">Golden Spoon Kitchen</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  Choose from our <span>menu</span>
                </h2>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="row mb-4 wow fadeInUp">
            <div className="col-lg-6 col-md-8 mx-auto">
              <div style={{ position: 'relative' }}>
                <i className="fas fa-search" style={{
                  position: 'absolute', left: 16, top: '50%',
                  transform: 'translateY(-50%)', opacity: 0.4, zIndex: 1,
                }}></i>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search menu items…"
                  style={{
                    width: '100%', padding: '12px 16px 12px 44px',
                    border: '1.5px solid rgba(255,255,255,0.12)',
                    borderRadius: 50, background: 'rgba(255,255,255,0.05)',
                    color: 'inherit', fontSize: 15, outline: 'none',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Category tabs */}
          {!loading && categories.length > 0 && (
            <div className="wow fadeInUp mb-5" style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: '4px 0 12px' }}>
              <button
                onClick={() => setActiveCategory('all')}
                style={{
                  marginRight: 10, padding: '9px 22px',
                  borderRadius: 50, fontSize: 14, fontWeight: 600,
                  border: activeCategory === 'all' ? 'none' : '1.5px solid rgba(255,255,255,0.15)',
                  background: activeCategory === 'all' ? '#d4a843' : 'transparent',
                  color: activeCategory === 'all' ? '#111' : 'inherit',
                  cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
                }}
              >
                All Items
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    marginRight: 10, padding: '9px 22px',
                    borderRadius: 50, fontSize: 14, fontWeight: 600,
                    border: activeCategory === cat.id ? 'none' : '1.5px solid rgba(255,255,255,0.15)',
                    background: activeCategory === cat.id ? '#d4a843' : 'transparent',
                    color: activeCategory === cat.id ? '#111' : 'inherit',
                    cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Menu items grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.5 }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: 32, display: 'block', marginBottom: 12 }}></i>
              <p>Loading menu…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.5 }}>
              <i className="fas fa-search" style={{ fontSize: 40, display: 'block', marginBottom: 12 }}></i>
              <p>No items found{search ? ` for "${search}"` : ''}.</p>
              {items.length === 0 && (
                <p style={{ fontSize: 14, marginTop: 8 }}>
                  Menu items not loaded yet. Add items from the admin panel.
                </p>
              )}
            </div>
          ) : (
            <div className="row g-4">
              {filtered.map((item, idx) => (
                <div key={item.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${(idx % 6) * 0.1}s`}>
                  <div style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 16, overflow: 'hidden',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                    height: '100%', display: 'flex', flexDirection: 'column',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    {/* Image */}
                    <div style={{ position: 'relative', paddingTop: '60%', overflow: 'hidden' }}>
                      <img
                        src={item.image_url || '/images/logo.png'}
                        alt={item.name}
                        style={{
                          position: 'absolute', inset: 0, width: '100%', height: '100%',
                          objectFit: 'cover', transition: 'transform 0.4s',
                        }}
                        onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                        onError={e => { e.target.src = '/images/logo.png' }}
                      />
                      {item.is_vegetarian && (
                        <span style={{
                          position: 'absolute', top: 12, left: 12,
                          background: '#16a34a', color: '#fff', borderRadius: 20,
                          fontSize: 11, fontWeight: 700, padding: '3px 10px',
                        }}>🌱 VEG</span>
                      )}
                      {item.is_featured && (
                        <span style={{
                          position: 'absolute', top: 12, right: 12,
                          background: '#d4a843', color: '#111', borderRadius: 20,
                          fontSize: 11, fontWeight: 700, padding: '3px 10px',
                        }}>⭐ POPULAR</span>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {item.menu_categories?.name && (
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#d4a843', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          {item.menu_categories.name}
                        </span>
                      )}
                      <h3 style={{ margin: '6px 0 8px', fontSize: 17, fontWeight: 700, lineHeight: 1.3 }}>
                        {item.name}
                      </h3>
                      {item.description && (
                        <p style={{ fontSize: 13, opacity: 0.65, lineHeight: 1.5, flex: 1, marginBottom: 14 }}>
                          {item.description.slice(0, 80)}{item.description.length > 80 ? '…' : ''}
                        </p>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                          {item.price_half && (
                            <button
                              onClick={() => handleAdd({ ...item, id: item.id + '-half', name: item.name + ' (Half)', price: parseFloat(item.price_half) })}
                              style={{
                                background: added[item.id + '-half'] ? '#16a34a' : 'transparent',
                                color: added[item.id + '-half'] ? '#fff' : '#d4a843',
                                border: '1.5px solid #d4a843', borderRadius: 8,
                                padding: '7px 14px', fontSize: 13, fontWeight: 700,
                                cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
                              }}
                            >
                              {added[item.id + '-half'] ? '✓' : '+'} Half ₹{parseFloat(item.price_half).toFixed(0)}
                            </button>
                          )}
                          {item.price ? (
                            <button
                              onClick={() => handleAdd({ ...item, id: item.id + (item.price_half ? '-full' : ''), name: item.name + (item.price_half ? ' (Full)' : ''), price: parseFloat(item.price) })}
                              style={{
                                background: added[item.id + (item.price_half ? '-full' : '')] ? '#16a34a' : '#d4a843',
                                color: '#111', border: 'none', borderRadius: 8,
                                padding: '7px 14px', fontSize: 13, fontWeight: 700,
                                cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
                              }}
                            >
                              {added[item.id + (item.price_half ? '-full' : '')]
                                ? '✓ Added'
                                : (item.price_half ? `Full ₹${parseFloat(item.price).toFixed(0)}` : `+ Add ₹${parseFloat(item.price).toFixed(0)}`)}
                            </button>
                          ) : (
                            <span style={{ fontSize: 13, opacity: 0.5 }}>Price on request</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating cart button */}
      {itemCount > 0 && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed', bottom: 32, right: 32, zIndex: 1000,
            background: '#d4a843', color: '#111', border: 'none',
            borderRadius: 50, padding: '14px 24px',
            fontSize: 15, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(212,168,67,0.5)',
            display: 'flex', alignItems: 'center', gap: 10,
            transition: 'transform 0.2s',
            animation: 'pulse 2s infinite',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <i className="fas fa-shopping-basket"></i>
          View Cart ({itemCount} items · ₹{total.toFixed(0)})
        </button>
      )}
    </main>
  )
}
