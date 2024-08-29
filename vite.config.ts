import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';

import AutoImport from 'unplugin-auto-import/vite';

import Components from 'unplugin-vue-components/vite';

import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';

import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_APP_TITLE } = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        eslintrc: {
          enabled: true,
        },
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
      }),
      Components({
        resolvers: [
          IconsResolver({
            prefix: 'icon',
          }),
        ],
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: VITE_APP_TITLE,
          },
        },
      }),
    ],
  };
});
