import { createApp } from '../server/index.js'

let appPromise = null

export default async function handler(req, res) {
  if (!appPromise) {
    appPromise = createApp().catch(err => {
      appPromise = null // allow retry on the next request after a failed cold-start
      throw err
    })
  }
  try {
    const app = await appPromise
    app(req, res)
  } catch (err) {
    console.error('[api/index] app init failed:', err)
    if (!res.headersSent) res.status(500).send('Internal Server Error')
  }
}
