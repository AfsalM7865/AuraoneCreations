import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repository below /AuraoneCreations/; Vercel
  // serves it at the domain root.  Use the platform flag so generated asset
  // URLs are correct for both deployments.
  base: process.env.VERCEL ? '/' : '/AuraoneCreations/',

  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],

  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

  preview: {
    port: 4173,
  },
})  
