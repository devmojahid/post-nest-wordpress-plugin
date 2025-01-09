import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
//   base: '/',
  root: path.resolve(__dirname, 'src'),
  build: {
    manifest: true,
    outDir: 'assets/dist',
    rollupOptions: {
      input: {
        settings: path.resolve(__dirname, 'src/admin/settings/index.jsx'),
        // 'social-dashboard': path.resolve(__dirname, 'src/admin/pages/social-dashboard/index.jsx'),
        // 'analytics-dashboard': path.resolve(__dirname, 'src/admin/pages/analytics-dashboard/index.jsx')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    }
  }
});