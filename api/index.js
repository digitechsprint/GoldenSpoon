import { createApp } from '../server/index.js'

let appPromise = null

export default async function handler(req, res) {
  if (!appPromise) appPromise = createApp()
  const app = await appPromise
  app(req, res)
}
