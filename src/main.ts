import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.sass'
import 'virtual:uno.css'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
