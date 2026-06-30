import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://betterflow.site',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/ingest') && !page.includes('/mobile'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [],
      serialize(item) {
        if (item.url === 'https://betterflow.site/') {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }
        if (item.url.includes('/alternatives/') || item.url.includes('/blog/')) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }
        if (item.url.includes('/alternatives') || item.url.includes('/blog')) {
          return { ...item, priority: 0.85, changefreq: 'weekly' };
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
  },
});
