// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  // Uncomment if deploying to a subpath
  // base: '/your-repo-name',
  site: 'https://yushinliou.github.io',

  vite: {
    plugins: [tailwindcss()],
  },
});