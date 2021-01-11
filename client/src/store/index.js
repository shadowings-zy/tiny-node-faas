import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      menuItemIndex: '0',
      funcId: ''
    }
  },
  mutations: {
    setMenuItemIndex(state, index) {
      state.menuItemIndex = index
    },
    setFuncId(state, id) {
      state.funcId = id
    }
  }
})

export default store