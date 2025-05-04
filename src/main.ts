import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { FontAwesomeIcon } from './plugins/fontawesome'
import { registerModules } from './routes'
import { Pokedex } from './pokedex'
import router from './routes'
import App from './App.vue'
import '@/assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
app.component('font-awesome-icon', FontAwesomeIcon)

registerModules({
  Pokedex
})

app.mount('#app')
