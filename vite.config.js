import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // Use relative paths for assets
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: 'all'
  },
  css: {
    postcss: './postcss.config.js', // Add this line
  },
  build: {
    rollupOptions: {
    }
  }
});