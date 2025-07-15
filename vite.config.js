import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/consultor-precio-profar/', // <--- Cambia esto por tu repo si es necesario
})
