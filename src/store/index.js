import { createStore } from 'vuex';

export default createStore({
  modules: {
  },
  state: {
    menu: false, // Initialize the menu state
  },
  mutations: {
    toggleMenu(state) {
      state.menu = !state.menu;
    },
    closeMenu(state) {
      state.menu = false;
    },
  },
  actions: {
    toggleMobileMenu({ commit }) {
      commit('toggleMenu');
    },
    closeMobileMenu({ commit }) {
      commit('closeMenu');
    },
  },
  getters : {
    menu: (state) => state.menu,
  }
});