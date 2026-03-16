import { defineConfig } from 'astro/config';

export default defineConfig({
  base: '/',
  server: { port: 4322 },
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 500,
      },
    },
  },
});
