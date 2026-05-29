import { createClient } from '@supabase/supabase-js'

export function createSupabaseServerClient() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    console.warn('[SSR] Supabase env vars not set — SEO data will not be fetched')
    return null
  }

  return createClient(url, key, {
    auth: { persistSession: false }
  })
}
