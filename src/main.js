import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/assets/theme.css'
import '@/assets/page-layout.css'

axios.defaults.baseURL='http://localhost:3000/api/'

createApp(App).use(store).use(router).mount('#app')
