import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../AdminLayout'
import { adminApi } from '../lib/api'

function slugToPath(slug) {
  return slug === '/' ? '' : slug.replace(/^\//, '')
}

const PAGE_SLUGS = [
  { slug: '/',              label: 'Home',          icon: 'fa-home' },
  { slug: '/about',         label: 'About Us',      icon: 'fa-info-circle' },
  { slug: '/menu',          label: 'Menu',          icon: 'fa-list-alt' },
  { slug: '/order',         label: 'Order Online',  icon: 'fa-shopping-cart' },
  { slug: '/contact',       label: 'Contact',       icon: 'fa-envelope' },
  { slug: '/services',      label: 'Services',      icon: 'fa-concierge-bell' },
  { slug: '/blog',          label: 'Blog',          icon: 'fa-blog' },
  { slug: '/faqs',          label: 'FAQs',          icon: 'fa-question-circle' },
  { slug: '/image-gallery', label: 'Image Gallery', icon: 'fa-images' },
  { slug: '/video-gallery', label: 'Video Gallery', icon: 'fa-video' },
  { slug: '/testimonial',   label: 'Testimonials',  icon: 'fa-star' },
  { slug: '/chefs',         label: 'Our Chefs',     icon: 'fa-user-tie' },
  { slug: '/checkout',      label: 'Checkout',      icon: 'fa-credit-card' },
]

export default function PagesManager() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  useEffect(() => { fetchPages() }, [])

  async function fetchPages() {
    setLoading(true)
    const { data } = await adminApi.get('/admin/page-content')
    setPages(data || [])
    setLoading(false)
  }

  async function ensurePage(slug, label) {
    setCreating(true)
    const exists = pages.find(p => p.slug === slug)
    if (!exists) {
      await adminApi.put('/admin/page-content', {
        slug, page_title: label, content: {}, seo: {}, is_published: true,
      })
      await fetchPages()
    }
    setCreating(false)
  }

  async function togglePublish(page) {
    const { data: full } = await adminApi.get(`/admin/page-content/${slugToPath(page.slug)}`)
    if (!full) return
    await adminApi.put('/admin/page-content', { ...full, is_published: !page.is_published })
    fetchPages()
  }

  const pageMap = Object.fromEntries(pages.map(p => [p.slug, p]))

  return (
    <AdminLayout title="Pages Manager">
      <div style={{ maxWidth: 900 }}>
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ margin: 0 }}>All Pages</h4>
          <p style={{ opacity: 0.6, fontSize: 13, marginTop: 4 }}>
            Edit content, images, and SEO settings for every page on the site.
          </p>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', opacity: 0.5 }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: 24 }}></i>
            <p style={{ marginTop: 8 }}>Loading pages…</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {PAGE_SLUGS.map(({ slug, label, icon }) => {
              const page = pageMap[slug]
              const isPublished = page?.is_published ?? true
              return (
                <div key={slug} style={{
                  background: 'var(--admin-card-bg)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: 12, padding: '20px 20px 16px',
                  display: 'flex', flexDirection: 'column', gap: 12,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: 'rgba(212,168,67,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#d4a843', fontSize: 16, flexShrink: 0,
                    }}>
                      <i className={`fas ${icon}`}></i>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{label}</div>
                      <div style={{ fontSize: 11, opacity: 0.45, marginTop: 2 }}>{slug}</div>
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '3px 8px',
                      borderRadius: 20, background: isPublished ? 'rgba(22,163,74,0.15)' : 'rgba(239,68,68,0.15)',
                      color: isPublished ? '#16a34a' : '#ef4444',
                    }}>
                      {isPublished ? 'Live' : 'Hidden'}
                    </span>
                  </div>

                  {page?.updated_at && (
                    <div style={{ fontSize: 11, opacity: 0.4 }}>
                      Updated {new Date(page.updated_at).toLocaleDateString()}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <Link
                      to={`/admin/pages/${encodeURIComponent(slug.replace(/\//g, '_') || 'home')}`}
                      onClick={() => ensurePage(slug, label)}
                      style={{
                        flex: 1, textAlign: 'center',
                        background: '#d4a843', color: '#111',
                        border: 'none', borderRadius: 8,
                        padding: '8px 0', fontSize: 13, fontWeight: 700,
                        textDecoration: 'none', cursor: 'pointer',
                      }}
                    >
                      <i className="fas fa-edit" style={{ marginRight: 6 }}></i>
                      Edit Page
                    </Link>
                    <button
                      onClick={() => togglePublish({ slug, is_published: isPublished })}
                      title={isPublished ? 'Hide page' : 'Publish page'}
                      style={{
                        background: 'var(--admin-input-bg)', color: 'inherit',
                        border: '1px solid var(--admin-border)', borderRadius: 8,
                        padding: '8px 12px', fontSize: 13, cursor: 'pointer',
                      }}
                    >
                      <i className={`fas fa-${isPublished ? 'eye-slash' : 'eye'}`}></i>
                    </button>
                    <a
                      href={slug} target="_blank" rel="noreferrer"
                      title="Preview page"
                      style={{
                        background: 'var(--admin-input-bg)', color: 'inherit',
                        border: '1px solid var(--admin-border)', borderRadius: 8,
                        padding: '8px 12px', fontSize: 13, textDecoration: 'none',
                        display: 'flex', alignItems: 'center',
                      }}
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {creating && (
          <div style={{ marginTop: 16, fontSize: 13, opacity: 0.6 }}>
            <i className="fas fa-spinner fa-spin" style={{ marginRight: 6 }}></i>
            Creating page record…
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
