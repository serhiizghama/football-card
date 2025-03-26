import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "images/*",
          dest: "images",
        },
      ],
    }),
  ],
  server: {
    host: true, // позволяет слушать внешние подключения
    allowedHosts: ['.ngrok-free.app'], // разрешаем все ngrok-домены
  },
})
