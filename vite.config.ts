import { fileURLToPath, URL } from 'node:url'

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'

import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      dirs: [
        'src/composables/**',
        'src/datasource/**',
        'src/stores/**',
      ],

      vueTemplate: true,

      eslintrc: {
        enabled: true,
      },

      dts: 'src/auto-imports.d.ts',

      imports: [
        'vue',
        'vue/macros',
        'pinia',
        'quasar',
      ],
    }),
    Components({
      dirs: [ 'src/components' ],

      dts: 'src/components.d.ts',

      resolvers: [
        IconsResolver(),
      ],
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
    }),
    Unocss(),
    quasar({
      autoImportComponentCase: 'pascal',
      sassVariables: fileURLToPath(
        new URL('./src/styles/quasar-variables.sass', import.meta.url),
      ),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    open: '/newtab.html',
  },
  optimizeDeps: {
    exclude: [ 'vuedraggable' ],
  },
  build: {
    rollupOptions: {
      input: {
        app: 'newtab.html',
      },
    },
  },
})
