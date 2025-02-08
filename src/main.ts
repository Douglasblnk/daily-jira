import { createPinia } from 'pinia'

import { Quasar } from 'quasar'
import { createApp } from 'vue'

import App from './App.vue'
import './styles/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import 'virtual:uno.css'

const app = createApp(App)

app.use(Quasar, {
  plugins: {},
})

app.use(createPinia())

app.mount('#app')
