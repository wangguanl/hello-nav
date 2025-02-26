import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import GlobPlugin from 'vite-plugin-glob';

export default defineConfig(({ command, mode }) => ({
  base: command === 'build' && mode !== 'dev' ? '/page__nav/' : '',
  server: {
    host: true,
    port: 5000,
  },
  plugins: [react(), GlobPlugin()],
  esbuild: {
    logOverride: {
      'this-is-undefined-in-esm': 'silent',
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
  },
}));
