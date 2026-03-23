import { defineConfig } from 'astro/config';
import alpine from '@astrojs/alpinejs';
import path from 'path';

const sgStylesPath = './twa-styleguide-2026/src/styles';

export default defineConfig({
  base: '/',
  integrations: [alpine()],
  server: { port: 4322 },
  vite: {
    resolve: {
      alias: {
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
