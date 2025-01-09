import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'src/admin/settings'),
//   base: process.env.NODE_ENV === 'production' ? '/wp-content/plugins/post-nest/assets/dist/' : '/',
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  css: {
    postcss: {
      plugins: [tailwindcss({
        config: './tailwind.config.js'
      }),
    autoprefixer],
    cssnano: {
      preset: 'default',
    },
    },
  },
  build: {
    manifest: true,
    outDir: path.resolve(__dirname, 'assets/dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/admin/settings/index.jsx'),
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: ({name}) => {
            if (/\.css$/.test(name ?? '')) {
              return 'assets/index.css';
            }
            return 'assets/[name][extname]';
          }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    cors: true,
    strictPort: true,
    port: 5173,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
});