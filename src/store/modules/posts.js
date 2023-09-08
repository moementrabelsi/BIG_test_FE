import axios from 'axios';

const state = {
  posts: [],
};

const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
  ADD_POST(state, post) {
    state.posts.push(post);
  },
};

const actions = {
  async fetchPosts({ commit }) {
    try {
      console.log('Fetching posts...'); 
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      console.log('Received response:', response.data); 

      
      const postsWithUsernames = await Promise.all(
        response.data.map(async (post) => {
          const userResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${post.userId}`
          );
          return {
            ...post,
            username: userResponse.data.username,
          };
        })
      );

      commit('SET_POSTS', postsWithUsernames);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  },
  async createPost({ commit }, postData) {
    try {
      
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postData);

      
      const newPost = response.data;

      commit('ADD_POST', newPost);

      return newPost; 
    } catch (error) {
      console.error('Error creating post:', error);
      throw error; 
    }
  },
};

const getters = {
  allPosts: (state) => state.posts,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
