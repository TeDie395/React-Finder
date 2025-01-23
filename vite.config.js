import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Escuchar en todas las direcciones
    port: 5173,
    strictPort: true,
    hmr: {
      host: 'localhost', // Cambiar a localhost
      port: 5174, // Puerto diferente para HMR
    },
    proxy: {
      '/api': 'http://localhost:5000' // Asegúrate que el puerto coincide con el de tu servidor backend
    }
  },
});

