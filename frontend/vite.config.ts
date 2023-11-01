import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true, // yarn dev でブラウザが自動で開かれる
    // origin: 'http://localhost:3001',
    port: 3001,
  },
  plugins: [react({
    jsxImportSource: '@emotion/react',
  })],
  define: {
    global: 'window',
  },
})

