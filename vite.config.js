import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_COMMIT_SHA': JSON.stringify(process.env.VITE_COMMIT_SHA || ''),
  },
})

console.log('VITE_COMMIT_SHA in vite.config.js:', process.env.VITE_COMMIT_SHA)
