import { createStore } from 'vuex';
import postsModule from './modules/posts';
import usersModule from './modules/users';
import authModule from './modules/auth';


export default createStore({
  modules: {
    posts: postsModule, 
    users: usersModule,
    auth: authModule
    
  },
  state: {
    menu: false, 
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