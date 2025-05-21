import { copyFileSync } from 'fs';
import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// Function to copy web.config to dist after build
const copyWebConfig = () => ({
  name: 'copy-web-config',
  closeBundle: () => {
    try {
      copyFileSync(
        path.resolve(__dirname, 'web.config'),
        path.resolve(__dirname, 'dist', 'web.config'),
      );
      console.log('✅ web.config copied to dist/');
    } catch (err) {
      console.error('❌ Failed to copy web.config:', err);
    }
  },
});

export default defineConfig(() => ({
  build: {
    outDir: 'dist',
    // Ensure static assets (including web.config) are included
    assetsInclude: ['web.config'],
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Isso ajuda com cache busting
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  base: '/atwork-admin-portal/',
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [
    react(),
    copyWebConfig(), // Add this plugin to copy web.config
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
