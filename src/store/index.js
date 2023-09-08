import { createStore } from 'vuex';
import usersModule from './modules/users';

export default createStore({
  modules: {
    users: usersModule,
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