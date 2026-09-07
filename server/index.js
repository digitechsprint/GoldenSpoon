import 'dotenv/config'
import express from 'express'
import compression from 'compression'
import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'
import { getPageData, buildHead, clearSiteContentCache } from './lib/pageData.js'

// process.cwd() is the project root both locally and on Vercel (/var/task)
const root = process.cwd()
const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000
const API_URL = (process.env.VITE_API_URL || 'https://api.goldenspoonrestro.com').replace(/\/$/, '')

export async function createApp() {
  const app = express()
  app.use(compression())
  app.use(express.json())

  let vite
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite')
    vite = await createViteServer({
      root,
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  }
  // In production, static assets are served by Vercel CDN (outputDirectory in vercel.json)
  // sirv is not used here.

  // ── Sitemap ───────────────────────────────────────────────────────────────
  app.get('/sitemap.xml', async (req, res) => {
    const siteUrl = process.env.SITE_URL || `${req.protocol}://${req.get('host')}`
    const staticRoutes = ['/', '/about', '/menu', '/contact', '/services',
      '/order', '/blog', '/faqs', '/image-gallery', '/video-gallery',
      '/testimonial', '/chefs']

    let blogSlugs = []
    try {
      const r = await fetch(`${API_URL}/api/blog`)
      const posts = r.ok ? await r.json() : []
      blogSlugs = posts.map(p => `/blog/${p.slug}`)
    } catch { /* backend unreachable — sitemap still serves the static routes */ }

    const allRoutes = [...staticRoutes, ...blogSlugs]
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(r => `  <url><loc>${siteUrl}${r}</loc><changefreq>weekly</changefreq></url>`).join('\n')}
</urlset>`
    res.set('Content-Type', 'application/xml').send(xml)
  })

  // ── Robots.txt ───────────────────────────────────────────────────────────
  app.get('/robots.txt', (req, res) => {
    const siteUrl = process.env.SITE_URL || `${req.protocol}://${req.get('host')}`
    res.type('text/plain').send(
      `User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: ${siteUrl}/sitemap.xml`
    )
  })

  // ── Admin: clear site content cache ──────────────────────────────────────
  app.post('/api/admin/clear-cache', (req, res) => {
    clearSiteContentCache()
    res.json({ ok: true })
  })

  // Razorpay order creation + payment verification now happen directly
  // against the FastAPI backend (POST /api/orders, POST /api/orders/{id}/verify-payment),
  // called from the browser — no proxy routes needed here anymore.

  // ── Admin panel SPA ───────────────────────────────────────────────────────
  app.use('/admin', async (req, res) => {
    try {
      if (isProd) {
        return res.sendFile(path.join(root, 'dist/admin.html'))
      }
      let html = fs.readFileSync(path.join(root, 'admin.html'), 'utf-8')
      html = await vite.transformIndexHtml(req.originalUrl, html)
      res.set({ 'Content-Type': 'text/html' }).send(html)
    } catch (e) {
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  // ── Main site SSR ─────────────────────────────────────────────────────────
  app.use(async (req, res) => {
    try {
      const url = req.originalUrl
      const pageData = await getPageData(url)
      const seoHead = buildHead(pageData, url)

      const pageDataJson = JSON.stringify({
        slug: pageData.slug,
        content: pageData.content,
        seo: pageData.seo,
        siteContent: pageData.siteContent,
      })

      let template, render
      if (!isProd) {
        template = fs.readFileSync(path.join(root, 'index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        template = fs.readFileSync(path.join(root, 'dist/ssr-template.html'), 'utf-8')
        render = (await import(pathToFileURL(path.join(root, 'dist/server/entry-server.js')).href)).render
      }

      const appHtml = await render(url, pageData)

      const html = template
        .replace('<!--SEO_TAGS-->', seoHead)
        .replace('<!--SSR_OUTLET-->', appHtml)
        .replace(
          '</head>',
          `<script>window.__PAGE_DATA__ = ${pageDataJson.replace(/</g, '\\u003c')};</script>\n</head>`
        )

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
    } catch (e) {
      if (!isProd && vite) vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  return app
}

// Start server for local dev / traditional hosting
if (process.env.VERCEL !== '1') {
  createApp().then(app => {
    app.listen(port, () => {
      console.log(`\n  Golden Spoon SSR Server running at http://localhost:${port}`)
      console.log(`  Admin panel: http://localhost:${port}/admin\n`)
    })
  })
}
