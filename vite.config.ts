import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/nav/' : '',
  server: {
    host: true,
    port: 5000,
    watch: {
      usePolling: true,
    },
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
  },
}));
