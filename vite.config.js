import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['7bf1-125-163-155-63.ngrok-free.app'],
  },
  plugins: [react()],
})
