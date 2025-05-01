import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { FontAwesomeIcon } from './plugins/fontawesome'
import App from './App.vue'
import './assets/main.css'
import './assets/fonts.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(VueQueryPlugin)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
