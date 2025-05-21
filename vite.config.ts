import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  build: {
    outDir: 'dist',
    // Configuração para copiar web.config para a pasta de build
    assetsInclude: ['web.config']
  },
  base: '/atwork-admin-portal/',
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
