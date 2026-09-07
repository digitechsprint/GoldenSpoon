import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { adminApi, getAdminToken, setAdminToken } from './lib/api'
import './admin.css'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MenuManager from './pages/MenuManager'
import BlogManager from './pages/BlogManager'
import BookingsManager from './pages/BookingsManager'
import OrdersManager from './pages/OrdersManager'
import PagesManager from './pages/PagesManager'
import PageEditor from './pages/PageEditor'

function ProtectedRoute({ children, session }) {
  if (!session) return <Navigate to="/admin/login" replace />
  return children
}

export default function AdminApp() {
  const [session, setSession] = useState(undefined) // undefined = loading

  useEffect(() => {
    const token = getAdminToken()
    if (!token) { setSession(null); return }
    adminApi.get('/auth/me').then(({ data, error }) => {
      if (data && data.is_admin && !error) setSession(data)
      else { setAdminToken(null); setSession(null) }
    })
  }, [])

  if (session === undefined) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--admin-sidebar-bg)',
        color: '#fff'
      }}>
        <div style={{textAlign: 'center'}}>
          <img src="/images/golden-spoon-logo.png" alt="Golden Spoon" style={{height: 50, marginBottom: 16}} />
          <p style={{opacity: 0.6}}>Loading admin panel…</p>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={
          session ? <Navigate to="/admin/dashboard" replace /> : <Login />
        } />
        <Route path="/admin" element={<Navigate to={session ? '/admin/dashboard' : '/admin/login'} replace />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute session={session}><Dashboard /></ProtectedRoute>
        } />
        <Route path="/admin/menu" element={
          <ProtectedRoute session={session}><MenuManager /></ProtectedRoute>
        } />
        <Route path="/admin/blog" element={
          <ProtectedRoute session={session}><BlogManager /></ProtectedRoute>
        } />
        <Route path="/admin/bookings" element={
          <ProtectedRoute session={session}><BookingsManager /></ProtectedRoute>
        } />
        <Route path="/admin/orders" element={
          <ProtectedRoute session={session}><OrdersManager /></ProtectedRoute>
        } />
        <Route path="/admin/pages" element={
          <ProtectedRoute session={session}><PagesManager /></ProtectedRoute>
        } />
        <Route path="/admin/pages/:pageKey" element={
          <ProtectedRoute session={session}><PageEditor /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to={session ? '/admin/dashboard' : '/admin/login'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
