import { createRouter, createWebHashHistory } from 'vue-router'
import { ROUTER_MAP } from './constant'
import store from '../store'
import Home from '../views/home/Home.vue'
import Document from '../views/document/Document.vue'
import About from '../views/about/About.vue'
import FuncList from '../views/funcList/FuncList.vue'
import FuncEdit from '../views/funcEdit/FuncEdit.vue'

const routerHashHistory = createWebHashHistory()

const router = createRouter({
  history: routerHashHistory,
  routes: [
    {
      path: ROUTER_MAP[0],
      component: Home
    },
    {
      path: ROUTER_MAP[1],
      component: Document
    },
    {
      path: ROUTER_MAP[2],
      component: FuncEdit
    },
    {
      path: ROUTER_MAP[3],
      component: FuncList
    },
    {
      path: ROUTER_MAP[4],
      component: About
    }
  ]
})

router.beforeEach((to, from, next) => {
  for (const key in ROUTER_MAP) {
    if (ROUTER_MAP[key] === to.fullPath) {
      store.commit('setMenuItemIndex', key)
      break
    }
  }
  next()
})

export default router