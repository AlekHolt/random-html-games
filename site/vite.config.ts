import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import { defineConfig, type Plugin } from 'vite'

// dev only: serve the games' folders (screenshots, play links) from the repo root
const serveGames = (): Plugin => ({
  name: 'serve-games',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = decodeURIComponent((req.url || '').split('?')[0])
      const m = url.match(/^\/(neon-run|voidwake)\//)
      if (!m) return next()
      let file = path.resolve(__dirname, '..' + url)
      if (url.endsWith('/')) file = path.join(file, 'index.html')
      if (!file.startsWith(path.resolve(__dirname, '..')) || !fs.existsSync(file)) return next()
      const ext = path.extname(file)
      res.setHeader('Content-Type', ({ '.jpg': 'image/jpeg', '.png': 'image/png', '.html': 'text/html' } as Record<string, string>)[ext] || 'application/octet-stream')
      fs.createReadStream(file).pipe(res)
    })
  },
})

// The landing page builds into the repo root (index.html + site-assets/), so GitHub Pages keeps serving the
// repo as-is and each game stays at /<game>/. emptyOutDir is off: the root also holds the games.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), serveGames()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  publicDir: false,
  build: { outDir: '..', emptyOutDir: false, assetsDir: 'site-assets' },
  server: { fs: { allow: ['..'] } },
})
