import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import node from '@astrojs/node';

export default defineConfig({
    site: 'https://www.yourdomain.com',
    output: 'hybrid',
    adapter: node({ mode: 'standalone' }),
    integrations: [
        preact({ compat: true }),
    ],
    image: {
        service: { entrypoint: 'astro/assets/services/sharp' },
    },
    vite: {
        css: { devSourcemap: true },
    },
});
