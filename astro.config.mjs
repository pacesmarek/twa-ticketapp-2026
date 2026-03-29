import { defineConfig } from 'astro/config';
import alpine from '@astrojs/alpinejs';
import path from 'path';

const sgStylesPath = './twa-styleguide-2026/src/styles'; // Cesta ke stylům ze styleguide submodulu

export default defineConfig({
  base: '/',
  integrations: [alpine()],
  server: { port: 4322 },
  vite: {
    resolve: {
      alias: {
        // Alias @sg-styles → cesta ke styleguide stylům
        // Použití v .astro souborech: import '@sg-styles/tokens.css'
        '@sg-styles': path.resolve(sgStylesPath),
      },
    },
    server: {
      watch: {
        usePolling: true,
        interval: 500,
      },
    },
  },
});
