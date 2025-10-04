import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { resolve } from 'node:path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    tanstackRouter({ autoCodeSplitting: true, target: 'react' }),
    viteReact(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: require('./public/manifest.json'),
      includeAssets: [
        'favicon.ico',
        'logo192.png',
        'logo512.png',
        'apple-touch-icon.png',
      ],
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
