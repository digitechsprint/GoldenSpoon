import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api, getToken, setToken } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  // resolved by the auth modal after a successful login/signup, so callers
  // that opened the modal to gate an action can react once it succeeds
  const [pendingResolvers, setPendingResolvers] = useState([])

  // Hydrate from localStorage after mount (SSR-safe, same pattern as CartContext)
  useEffect(() => {
    (async () => {
      const token = getToken()
      if (token) {
        const { data, error } = await api.get('/auth/me')
        if (data && !error) setUser(data)
        else setToken(null)
      }
      setLoading(false)
    })()
  }, [])

  const login = useCallback(async (email, password) => {
    const { data, error } = await api.post('/auth/login', { email, password })
    if (error) return { error }
    setToken(data.token)
    setUser(data.user)
    return { error: null, user: data.user }
  }, [])

  const signup = useCallback(async (email, password, name, phone) => {
    const { data, error } = await api.post('/auth/signup', { email, password, name, phone })
    if (error) return { error }
    setToken(data.token)
    setUser(data.user)
    return { error: null, user: data.user }
  }, [])

  const logout = useCallback(async () => {
    await api.post('/auth/logout')
    setToken(null)
    setUser(null)
  }, [])

  // Open the shared auth modal and resolve once the user is signed in
  // (or reject if they dismiss it). Used to gate an action on login.
  const requireAuth = useCallback(() => {
    if (user) return Promise.resolve(user)
    return new Promise((resolve, reject) => {
      setPendingResolvers(prev => [...prev, { resolve, reject }])
      setModalOpen(true)
    })
  }, [user])

  const resolvePending = useCallback((signedInUser) => {
    setPendingResolvers(prev => {
      prev.forEach(p => p.resolve(signedInUser))
      return []
    })
    setModalOpen(false)
  }, [])

  const cancelPending = useCallback(() => {
    setPendingResolvers(prev => {
      prev.forEach(p => p.reject(new Error('cancelled')))
      return []
    })
    setModalOpen(false)
  }, [])

  return (
    <AuthContext.Provider value={{
      user, loading, login, signup, logout, requireAuth,
      modalOpen, openAuthModal: () => setModalOpen(true), resolvePending, cancelPending,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
