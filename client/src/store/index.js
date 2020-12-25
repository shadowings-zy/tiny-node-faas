import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      menuItemIndex: '0'
    }
  },
  mutations: {
    setMenuItemIndex(state, index) {
      state.menuItemIndex = index
    }
  }
})

export default store