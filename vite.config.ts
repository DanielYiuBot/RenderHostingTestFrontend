import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://whatsapp-chatbot-backend.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    }
  },
  preview: {
    port: 5173,
    host: true,
    strictPort: true,
    allowedHosts: [
      'renderhostingtestfrontend.onrender.com',
      'localhost',
      '127.0.0.1'
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
}) 