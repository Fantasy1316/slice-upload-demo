import { createApp } from 'vue'
import App from './App.vue'

import naive from 'naive-ui'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

import './assets/styles/index.scss'

const app = createApp(App)
app.use(naive)
app.mount('#app')
