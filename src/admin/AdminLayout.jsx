import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AdminLayout({ children, title }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <img src="/images/golden-spoon-logo.png" alt="Golden Spoon" />
          <h6>Admin Panel</h6>
        </div>

        <nav className="admin-nav">
          <div className="admin-nav-label">Main</div>
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fas fa-chart-line"></i> Dashboard
          </NavLink>

          <div className="admin-nav-label" style={{marginTop: 8}}>Content</div>
          <NavLink to="/admin/pages" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fas fa-file-alt"></i> Pages
          </NavLink>
          <NavLink to="/admin/menu" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fas fa-utensils"></i> Menu Manager
          </NavLink>
          <NavLink to="/admin/blog" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fas fa-blog"></i> Blog Manager
          </NavLink>
          <NavLink to="/admin/seo" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fas fa-search"></i> SEO Manager
          </NavLink>

          <div className="admin-nav-label" style={{marginTop: 8}}>Operations</div>
          <NavLink to="/admin/orders" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fas fa-shopping-basket"></i> Orders
          </NavLink>
          <NavLink to="/admin/bookings" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fas fa-calendar-check"></i> Bookings
          </NavLink>

          <div className="admin-nav-label" style={{marginTop: 8}}>Site</div>
          <NavLink to="/admin/settings" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="fas fa-cog"></i> Settings
          </NavLink>
          <a href="/" target="_blank" rel="noreferrer">
            <i className="fas fa-external-link-alt"></i> View Site
          </a>
        </nav>

        <div className="admin-sidebar-footer">
          <button
            onClick={handleLogout}
            className="btn-admin-outline"
            style={{width: '100%', justifyContent: 'center'}}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main">
        <header className="admin-topbar">
          <h5>{title || 'Admin Panel'}</h5>
          <span style={{fontSize: 13, color: 'var(--admin-text-muted)'}}>
            <i className="fas fa-circle" style={{fontSize: 8, color: 'var(--admin-success)', marginRight: 6}}></i>
            Golden Spoon Restaurrant
          </span>
        </header>
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  )
}
