const API_URL = (process.env.VITE_API_URL || 'https://api.goldenspoonrestro.com').replace(/\/$/, '')

// Route → page slug mapping
const SLUG_MAP = {
  '/':               '/',
  '/about':          '/about',
  '/menu':           '/menu',
  '/contact':        '/contact',
  '/services':       '/services',
  '/order':          '/order',
  '/checkout':       '/checkout',
  '/blog':           '/blog',
  '/faqs':           '/faqs',
  '/image-gallery':  '/image-gallery',
  '/video-gallery':  '/video-gallery',
  '/testimonial':    '/testimonial',
  '/chefs':          '/chefs',
}

function routeToSlug(url) {
  const path = url.split('?')[0].replace(/\/$/, '') || '/'
  return SLUG_MAP[path] || path
}

async function apiGet(path) {
  try {
    const r = await fetch(`${API_URL}/api${path}`)
    if (!r.ok) return null
    return await r.json()
  } catch (e) {
    console.error(`[SSR] fetch failed for ${path}:`, e.message)
    return null
  }
}

// Cached site_content so we don't fetch it on every request
let siteContentCache = null
let siteContentCachedAt = 0
const SITE_CACHE_TTL = 60_000 // 1 minute

export async function getSiteContent() {
  if (siteContentCache && Date.now() - siteContentCachedAt < SITE_CACHE_TTL) {
    return siteContentCache
  }
  const rows = await apiGet('/site-content')
  if (!rows) return {}
  const map = {}
  for (const row of rows) map[row.content_key] = row.content_value
  siteContentCache = map
  siteContentCachedAt = Date.now()
  return map
}

export function clearSiteContentCache() {
  siteContentCache = null
}

export async function getPageData(url) {
  const slug = routeToSlug(url)
  const pathSegment = slug === '/' ? '' : slug.replace(/^\//, '')

  const [page, siteContent] = await Promise.all([
    apiGet(`/page-content/${pathSegment}`),
    getSiteContent(),
  ])

  return {
    slug,
    content: page?.content || {},
    seo: page?.seo || {},
    siteContent,
    isPublished: page?.is_published ?? true,
  }
}

// Build complete <head> HTML from page seo + site defaults
export function buildHead(pageData, reqUrl) {
  const { seo, siteContent } = pageData
  const siteName = siteContent['site.name'] || 'Golden Spoon Restaurant'
  const defaultOgImage = siteContent['site.default_og_image'] || '/images/golden-spoon-logo.png'
  const siteUrl = process.env.SITE_URL || ''

  const rawTitle = seo.title || siteName
  const rawDesc = seo.meta_description || `Authentic Indian cuisine at ${siteName}.`
  const ogTitle = seo.og_title || rawTitle
  const ogDesc = seo.og_description || rawDesc
  const ogImage = seo.og_image || defaultOgImage
  const canonical = seo.canonical_url || (siteUrl + reqUrl.split('?')[0])
  const noIndex = seo.no_index === true

  const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // Schema.org JSON-LD
  let schemaTag = ''
  const schema = seo.schema || null
  if (schema) {
    schemaTag = `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
  }

  // Google Analytics
  const gaId = siteContent['site.google_analytics']
  const gaTag = gaId ? `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${esc(gaId)}"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${esc(gaId)}');</script>` : ''

  return `
    <title>${esc(rawTitle)}</title>
    <meta name="description" content="${esc(rawDesc)}" />
    ${seo.meta_keywords ? `<meta name="keywords" content="${esc(seo.meta_keywords)}" />` : ''}
    <meta name="robots" content="${noIndex ? 'noindex, nofollow' : 'index, follow'}" />
    <link rel="canonical" href="${esc(canonical)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(siteName)}" />
    <meta property="og:title" content="${esc(ogTitle)}" />
    <meta property="og:description" content="${esc(ogDesc)}" />
    <meta property="og:image" content="${esc(ogImage)}" />
    <meta property="og:url" content="${esc(canonical)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(ogTitle)}" />
    <meta name="twitter:description" content="${esc(ogDesc)}" />
    <meta name="twitter:image" content="${esc(ogImage)}" />
    ${schemaTag}
    ${seo.custom_head || ''}
    ${gaTag}
  `.trim()
}
