import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Injects preload hints for critical above-fold assets discovered at build time.
// Improves LCP by telling the browser to fetch hero/loading logos before JS runs.
function preloadCriticalAssetsPlugin() {
  const CRITICAL = ['l90', 'amanlogo', 'finalblue']
  const found = {}

  return {
    name: 'preload-critical-assets',
    generateBundle(_, bundle) {
      for (const [fileName] of Object.entries(bundle)) {
        for (const key of CRITICAL) {
          if (fileName.includes(key) && fileName.endsWith('.webp')) {
            found[key] = fileName
          }
        }
      }
    },
    transformIndexHtml(html) {
      const preloads = Object.values(found)
        .map(f => `  <link rel="preload" as="image" href="/${f}" type="image/webp" />`)
        .join('\n')
      return html.replace('</head>', `${preloads}\n</head>`)
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    preloadCriticalAssetsPlugin(),
  ],
  server: {
    host: true,
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer'
          }
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap'
          }
          if (
            id.includes('node_modules/three') ||
            id.includes('node_modules/@react-three')
          ) {
            return 'vendor-three'
          }
        },
      },
    },
    // Slightly higher warning threshold — we're code-splitting so chunks will be smaller
    chunkSizeWarningLimit: 600,
  },
})
