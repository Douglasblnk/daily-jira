import { QueryClient, VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'
import { createPinia } from 'pinia'

import { Notify, Quasar } from 'quasar'

import { createApp } from 'vue'

import App from './App.vue'
import './styles/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import 'virtual:uno.css'

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Notify,
  },
})

const vueQueryOptions: VueQueryPluginOptions = {
  queryClient: new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: Infinity,
      },
    },
  }),
}

app.use(VueQueryPlugin, vueQueryOptions)

app.use(createPinia())

app.mount('#app')
