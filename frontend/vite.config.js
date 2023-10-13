import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5000"  // Replace with your backend API's URL
      // "/api": "https://mern-aws.onrender.com"  // Replace with your backend API's URL
    }
  }
})