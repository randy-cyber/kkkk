import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Production builds are served from the GitHub Pages project subpath
  // (https://<user>.github.io/kkkk/). Override with VITE_BASE if you later
  // deploy to a root domain (e.g. Vercel) by setting VITE_BASE=/.
  base: process.env.VITE_BASE ?? (command === 'build' ? '/kkkk/' : '/'),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
