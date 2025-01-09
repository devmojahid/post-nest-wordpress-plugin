import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    build: {
        manifest: true,
        outDir: 'assets/dist',
        rollupOptions: {
            input: {
                settings: path.resolve(__dirname, 'src/admin/settings/index.jsx'),
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: 'chunks/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash][extname]'
            },
            external: [
                'react',
                'react-dom',
                '@wordpress/element',
                '@wordpress/components',
                '@wordpress/i18n'
            ]
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    server: {
        cors: true,
        strictPort: true,
        port: 5173,
        hmr: {
            host: 'localhost',
        },
    },
    optimizeDeps: {
        include: [
            'react', 
            'react-dom', 
            'react-router-dom'
        ],
        exclude: [
            '@wordpress/element',
            '@wordpress/components',
            '@wordpress/i18n'
        ]
    },
    define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
}); 
