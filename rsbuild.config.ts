import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  resolve: {
    alias: {
      '@': './src',
    },
  },
  source: {
    define: {
      'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL ?? ''),
      'process.env.SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL ?? ''),
      'process.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY ?? ''),
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
