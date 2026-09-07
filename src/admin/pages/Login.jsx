import React, { useState } from 'react'
import { adminApi, setAdminToken } from '../lib/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await adminApi.post('/auth/login', { email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    if (!data.user.is_admin) {
      setError('This account does not have admin access.')
      setLoading(false)
      return
    }
    setAdminToken(data.token)
    window.location.href = '/admin/dashboard'
  }

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <img src="/images/golden-spoon-logo.png" alt="Golden Spoon" />
        <h4>Welcome Back</h4>
        <p>Sign in to the admin panel</p>

        {error && (
          <div className="alert-admin error" style={{textAlign: 'left'}}>
            <i className="fas fa-exclamation-circle" style={{marginRight: 8}}></i>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="admin-form-group" style={{textAlign: 'left'}}>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@goldenspoon.com"
              required
              autoFocus
            />
          </div>
          <div className="admin-form-group" style={{textAlign: 'left'}}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn-admin" style={{width: '100%', justifyContent: 'center', padding: '11px 20px'}} disabled={loading}>
            {loading ? (
              <><i className="fas fa-spinner fa-spin"></i> Signing in…</>
            ) : (
              <><i className="fas fa-sign-in-alt"></i> Sign In</>
            )}
          </button>
        </form>

        <p style={{fontSize: 12, color: 'var(--admin-text-muted)', marginTop: 24}}>
          Use your Golden Spoon account — it needs admin access enabled on the backend.
        </p>
      </div>
    </div>
  )
}
