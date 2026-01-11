// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import remarkFootnotes from 'remark-footnotes';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkFootnotes, remarkMath],
      rehypePlugins: [rehypeKatex],
    })
  ],
  // Uncomment if deploying to a subpath
  // base: '/your-repo-name',
  site: 'https://yushinliou.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"','"Monaco"', '"Consolas"', '"Courier New"', 'monospace'],
        system: ['-apple-system', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
});