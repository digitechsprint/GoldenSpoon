import React, { createContext, useContext } from 'react'

const PageDataContext = createContext({
  slug: '/',
  content: {},
  seo: {},
  siteContent: {},
})

export function PageDataProvider({ value, children }) {
  return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

export function usePageData() {
  return useContext(PageDataContext)
}

// Convenience: read a nested content key with a fallback.
// e.g. useContent('hero.title', 'Default Title')
export function useContent(key, fallback = '') {
  const { content } = usePageData()
  const parts = key.split('.')
  let val = content
  for (const p of parts) {
    if (val == null || typeof val !== 'object') return fallback
    val = val[p]
  }
  return val ?? fallback
}

export function useSiteContent(key, fallback = '') {
  const { siteContent } = usePageData()
  return siteContent[key] ?? fallback
}
