import { createApp } from 'vue'
import { setVisitorIdToLocalstorage } from './utils/figurePrint'
import { componentPlugin } from './utils/svg'
import { elementPlusComponentList } from './utils/element'
import App from './App.vue'
import store from './store'
import router from './router'
import './style.css'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)

elementPlusComponentList.forEach((item) => app.use(item))

app.use(store)
app.use(router)
app.use(componentPlugin)
app.mount('#app')

setVisitorIdToLocalstorage()
