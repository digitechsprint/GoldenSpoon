import React, { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [stats, setStats] = useState({ menu: 0, blog: 0, bookings: 0, pending: 0 })
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const [menuRes, blogRes, bookingsRes, pendingRes, recentRes] = await Promise.all([
        supabase.from('menu_items').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase.from('bookings').select('id', { count: 'exact', head: true }),
        supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(5),
      ])

      setStats({
        menu: menuRes.count || 0,
        blog: blogRes.count || 0,
        bookings: bookingsRes.count || 0,
        pending: pendingRes.count || 0,
      })
      setRecentBookings(recentRes.data || [])
      setLoading(false)
    }
    fetchStats()
  }, [])

  const statusBadge = (status) => {
    const map = { pending: 'badge-pending', confirmed: 'badge-confirmed', cancelled: 'badge-cancelled' }
    return <span className={`badge-status ${map[status] || 'badge-draft'}`}>{status}</span>
  }

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

  return (
    <AdminLayout title="Dashboard">
      {/* Stat cards */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-card-icon gold"><i className="fas fa-utensils"></i></div>
            <div className="stat-card-info">
              <h3>{loading ? '–' : stats.menu}</h3>
              <p>Menu Items</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-card-icon blue"><i className="fas fa-blog"></i></div>
            <div className="stat-card-info">
              <h3>{loading ? '–' : stats.blog}</h3>
              <p>Blog Posts</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-card-icon green"><i className="fas fa-calendar-check"></i></div>
            <div className="stat-card-info">
              <h3>{loading ? '–' : stats.bookings}</h3>
              <p>Total Bookings</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-card-icon red"><i className="fas fa-clock"></i></div>
            <div className="stat-card-info">
              <h3>{loading ? '–' : stats.pending}</h3>
              <p>Pending Bookings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="row g-3 mb-4">
        {[
          { icon: 'fas fa-search', label: 'Update SEO', href: '/admin/seo', color: 'gold' },
          { icon: 'fas fa-utensils', label: 'Manage Menu', href: '/admin/menu', color: 'blue' },
          { icon: 'fas fa-blog', label: 'Write Blog Post', href: '/admin/blog', color: 'green' },
          { icon: 'fas fa-calendar-check', label: 'View Bookings', href: '/admin/bookings', color: 'red' },
        ].map(item => (
          <div className="col-6 col-xl-3" key={item.label}>
            <a href={item.href} className="admin-card" style={{display: 'block', padding: 20, textDecoration: 'none', color: 'inherit'}}>
              <div className={`stat-card-icon ${item.color}`} style={{marginBottom: 12}}>
                <i className={item.icon}></i>
              </div>
              <div style={{fontSize: 14, fontWeight: 600}}>{item.label}</div>
            </a>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h6><i className="fas fa-calendar" style={{marginRight: 8, color: 'var(--admin-accent)'}}></i>Recent Bookings</h6>
          <a href="/admin/bookings" className="btn-admin-outline" style={{fontSize: 12, padding: '5px 12px'}}>View All</a>
        </div>
        <div style={{overflowX: 'auto'}}>
          {loading ? (
            <div className="admin-loading"><i className="fas fa-spinner fa-spin"></i> Loading…</div>
          ) : recentBookings.length === 0 ? (
            <div className="admin-empty">
              <i className="fas fa-calendar-times"></i>
              <p>No bookings yet</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Guest</th><th>Date</th><th>Time</th><th>Guests</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(b => (
                  <tr key={b.id}>
                    <td>
                      <div style={{fontWeight: 500}}>{b.name}</div>
                      <div style={{fontSize: 12, color: 'var(--admin-text-muted)'}}>{b.email}</div>
                    </td>
                    <td>{formatDate(b.booking_date)}</td>
                    <td>{b.booking_time || '—'}</td>
                    <td>{b.guests}</td>
                    <td>{statusBadge(b.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
