import { createStore } from 'vuex';
import postsModule from './modules/posts';
import usersModule from './modules/users';
import authModule from './modules/auth';


export default createStore({
  modules: {
    posts: postsModule, // Register the 'posts' module with the 'posts' namespace
    users: usersModule,
    auth: authModule
    
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