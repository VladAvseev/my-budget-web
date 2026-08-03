import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [pluginReact(), pluginSvgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: Number(process.env.DEV_PORT) || 3000,
    historyApiFallback: true,
  },
  output: {
    filenameHash: process.env.NODE_ENV === 'production',
  },
  html: {
    template: './public/index.html',
    mountId: 'root',
    title: process.env.APP_TITLE || 'React rsbuild base',
  },
});
