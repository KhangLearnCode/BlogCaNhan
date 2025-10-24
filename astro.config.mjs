import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://khanglearncode.github.io/BlogCaNhan',
  base: '/BlogCaNhan',
  integrations: [sitemap()],
});
