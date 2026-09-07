// Vercel auto-serves any `index.html` sitting in the build output directory
// as the static document for `/`, and static files always win over
// `rewrites` — so as long as dist/index.html exists under that name, the
// homepage skips the SSR function entirely (no injected SEO tags, no
// window.__PAGE_DATA__, a hydration mismatch on load). Renaming it after
// build removes the collision so `/` reliably goes through api/index.js
// like every other route.
const fs = require('fs')
const path = require('path')

const from = path.join(__dirname, '..', 'dist', 'index.html')
const to = path.join(__dirname, '..', 'dist', 'ssr-template.html')

fs.renameSync(from, to)
console.log('[rename-ssr-template] dist/index.html -> dist/ssr-template.html')
