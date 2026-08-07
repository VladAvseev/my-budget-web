import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const { parsed: env } = loadEnv();

const define = Object.fromEntries(
  Object.entries(env).flatMap(([key, value]) => [
    [`process.env.${key}`, JSON.stringify(value)],
    [`import.meta.env.${key}`, JSON.stringify(value)],
  ]),
);

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define,
  },
  resolve: {
    alias: {
      '@': './src',
    },
  },
  server: {
    port: Number(process.env.DEV_PORT) || 3001,
    open: true,
  },
  html: {
    template: './public/index.html',
    title: process.env.APP_TITLE || 'React rsbuild base',
  },
});
