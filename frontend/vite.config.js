import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  // ── Speed: pre-bundle heavy deps so Dev-HMR stays fast ──────────────
  optimizeDeps: {
    include: [
      'react', 'react-dom', 'react-router-dom',
      'framer-motion', 'axios',
      'react-toastify', 'lucide-react',
      'recharts', 'date-fns'
    ]
  },

  build: {
    // ── Code-split: one chunk per logical group ──────────────────────
    // Vite will automatically handle code-splitting natively
    // Removed problematic manualChunks that split dependencies improperly
    // Warn when any chunk exceeds 700 kB
    chunkSizeWarningLimit: 700,
    // Fastest source-maps in production (none = best perf)
    sourcemap: false,
  },

  // ── Dev: faster file serving ─────────────────────────────────────────
  server: {
    port: 5173,
    // Enable HTTP/2 for multiplexed asset loading
    https: false,
  }
})
