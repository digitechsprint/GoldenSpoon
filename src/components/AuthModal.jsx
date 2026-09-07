import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const styles = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
    zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%', maxWidth: 400, background: 'var(--bs-body-bg, #111)',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16,
    padding: '32px 28px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
  },
  title: { margin: '0 0 6px', fontSize: 20, fontWeight: 800, color: '#d4a843' },
  subtitle: { margin: '0 0 22px', fontSize: 13, opacity: 0.6 },
  label: { fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 },
  input: {
    width: '100%', padding: '11px 14px', borderRadius: 8, fontSize: 14,
    background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.12)',
    color: 'inherit', outline: 'none', boxSizing: 'border-box', marginBottom: 16,
  },
  submit: {
    width: '100%', padding: '13px', background: '#d4a843', color: '#111',
    border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 800, cursor: 'pointer',
  },
  switchRow: { textAlign: 'center', marginTop: 18, fontSize: 13, opacity: 0.75 },
  switchLink: { color: '#d4a843', fontWeight: 700, cursor: 'pointer', textDecoration: 'none' },
  closeBtn: {
    position: 'absolute', top: 14, right: 16, background: 'none', border: 'none',
    color: 'inherit', fontSize: 22, cursor: 'pointer', opacity: 0.6, lineHeight: 1,
  },
  error: {
    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#ef4444', fontSize: 13,
  },
}

export default function AuthModal() {
  const { modalOpen, login, signup, resolvePending, cancelPending } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!modalOpen) return null

  function setField(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const result = mode === 'login'
      ? await login(form.email, form.password)
      : await signup(form.email, form.password, form.name, form.phone)
    setSubmitting(false)
    if (result.error) {
      setError(result.error.message)
      return
    }
    resolvePending(result.user)
    setForm({ name: '', email: '', phone: '', password: '' })
  }

  return (
    <div style={styles.overlay} onClick={e => e.target === e.currentTarget && cancelPending()}>
      <div style={{ ...styles.card, position: 'relative' }}>
        <button style={styles.closeBtn} onClick={cancelPending} aria-label="Close">×</button>
        <h3 style={styles.title}>{mode === 'login' ? 'Welcome back' : 'Create an account'}</h3>
        <p style={styles.subtitle}>
          {mode === 'login' ? 'Sign in to continue' : 'Sign up to place an order or reserve a table'}
        </p>

        {error && <div style={styles.error}><i className="fas fa-exclamation-circle" style={{ marginRight: 8 }}></i>{error}</div>}

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <label style={styles.label}>Full Name</label>
              <input style={styles.input} value={form.name} onChange={e => setField('name', e.target.value)} required />
              <label style={styles.label}>Phone Number</label>
              <input style={styles.input} value={form.phone} onChange={e => setField('phone', e.target.value)} required />
            </>
          )}
          <label style={styles.label}>Email Address</label>
          <input style={styles.input} type="email" value={form.email} onChange={e => setField('email', e.target.value)} required />
          <label style={styles.label}>Password</label>
          <input style={styles.input} type="password" value={form.password} onChange={e => setField('password', e.target.value)}
            minLength={6} required />

          <button type="submit" style={{ ...styles.submit, opacity: submitting ? 0.7 : 1 }} disabled={submitting}>
            {submitting
              ? <><i className="fas fa-spinner fa-spin" style={{ marginRight: 8 }}></i>Please wait…</>
              : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={styles.switchRow}>
          {mode === 'login' ? (
            <>New here? <a style={styles.switchLink} onClick={() => { setMode('signup'); setError('') }}>Create an account</a></>
          ) : (
            <>Already have an account? <a style={styles.switchLink} onClick={() => { setMode('login'); setError('') }}>Sign in</a></>
          )}
        </div>
      </div>
    </div>
  )
}
