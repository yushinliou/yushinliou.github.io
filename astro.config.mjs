// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Uncomment if deploying to a subpath
  // base: '/your-repo-name',
  site: 'https://yushinliou.github.io',

  vite: {
    plugins: [tailwindcss()],
  },
});