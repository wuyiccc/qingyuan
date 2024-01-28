import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 8080,
    // 对于/api的请求, 会代理到后面的地址
    proxy: {
      '/api': { target: 'http://localhost:9000/', changeOrigin: true, rewrite: path => path.replace(/^\/api/, '') }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [react()]
})
