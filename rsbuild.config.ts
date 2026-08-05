import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  resolve: {
    alias: {
      '@': './src',
    },
  },
  server: {
    port: Number(process.env.DEV_PORT) || 3000,
    open: true,
  },
  html: {
    template: './public/index.html',
    title: process.env.APP_TITLE || 'React rsbuild base',
  },
});
