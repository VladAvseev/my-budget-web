import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: Number(process.env.DEV_PORT) || 3000,
  },
  html: {
    template: './public/index.html',
    title: process.env.APP_TITLE || 'React rsbuild base',
  },
});
