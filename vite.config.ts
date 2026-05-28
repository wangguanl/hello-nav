import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => ({
  base: command === 'build' && mode !== 'dev' ? '/page__nav/' : '',
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
