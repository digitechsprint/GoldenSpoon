// Thin fetch wrapper for the Golden Spoon FastAPI backend (replaces @supabase/supabase-js).
// Every method resolves to { data, error } — error is null on success, or
// { message, status } on failure — so call sites can keep the familiar
// `const { data, error } = await ...` destructuring they used with Supabase.

const BASE_URL = (import.meta.env.VITE_API_URL || 'https://api.goldenspoonrestro.com').replace(/\/$/, '')
const TOKEN_KEY = 'gs_token'

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch { /* ignore (private browsing, SSR, etc.) */ }
}

async function request(method, path, body, isUpload = false) {
  const headers = {}
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  let payload
  if (isUpload) {
    payload = body // a FormData instance — let the browser set the multipart boundary
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
    payload = JSON.stringify(body)
  }

  try {
    const res = await fetch(`${BASE_URL}/api${path}`, { method, headers, body: payload })
    if (res.status === 204) return { data: null, error: null }

    const text = await res.text()
    const json = text ? JSON.parse(text) : null

    if (!res.ok) {
      return { data: null, error: { message: json?.detail || `Request failed (${res.status})`, status: res.status } }
    }
    return { data: json, error: null }
  } catch (err) {
    return { data: null, error: { message: err.message || 'Network error', status: 0 } }
  }
}

export const api = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  put: (path, body) => request('PUT', path, body),
  del: (path) => request('DELETE', path),
  upload: (path, formData) => request('POST', path, formData, true),
}
