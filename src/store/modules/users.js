import axios from 'axios';

const state = {
  users: [],
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
};

const actions = {
  async fetchUsers({ commit }) {
    try {
      console.log('Fetching users...'); 
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      console.log('Received response:', response.data); 
      commit('SET_USERS', response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
};

const getters = {
  allUsers: (state) => state.users,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
