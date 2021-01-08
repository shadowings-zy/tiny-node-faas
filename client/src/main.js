import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import store from './store'
import router from './router'
import { setVisitorIdToLocalstorage } from './utils/figurePrint'
import { componentPlugin } from './utils/svg'

import './style.css'
import 'element-plus/lib/theme-chalk/index.css'


const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(componentPlugin)
app.mount('#app')

setVisitorIdToLocalstorage()
