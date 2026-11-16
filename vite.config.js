import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Bundle all deps into dist/server/entry-server.js. The server loads it via a
  // dynamic import, which Vercel's file tracer can't follow, so any package left
  // external (react-router-dom, react-dom/server, …) is missing at runtime.
  ssr: {
    noExternal: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        admin: './admin.html',
      },
    },
  },
})
