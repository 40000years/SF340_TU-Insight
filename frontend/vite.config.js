import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: 'localhost',
  },
  build: {
    // สร้างไฟล์ build ไปที่ dist/frontend (โฟลเดอร์เดียวกับ backend.exe ใช้)
    outDir: '../dist/frontend',
    emptyOutDir: true,
  },
})
