/* eslint-disable no-unused-vars */
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
  UPDATE_POST(state, updatedPost) {
    const index = state.posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      state.posts.splice(index, 1, updatedPost);
    }
  },
  DELETE_POST(state, postId) {
    const index = state.posts.findIndex(post => post.id === postId);
    if (index !== -1) {
      state.posts.splice(index, 1);
    }
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
  async updatePost({ commit }, updatedPostData) {
    try {
      console.log('updating post ID...', updatedPostData.id); 

      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${updatedPostData.id}`,
        updatedPostData
      );

      const updatedPost = response.data;

      commit('UPDATE_POST', updatedPost);

      return updatedPost; 
    } catch (error) {
      console.error('Error updating post:', error);
      throw error; 
    }
  },
  async fetchOnePost({commit}, postId ) {
    try {
      console.log('Fetching post by ID...', postId); 
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${response.data.userId}`);
      const fetchedPost = {...response.data, user:{...userResponse.data}};

      return fetchedPost; 
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      throw error; 
    }
  },
  async deletePost({ commit }, postId) {
    try {
      console.log('deleting post by ID...', postId); 
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);

      commit('DELETE_POST', postId);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error; 
    }
  },
};

const getters = {
  allPosts: (state) => state.posts,
  getPostById: (state) => (postId) => {
    return state.posts.find(post => post.id === postId);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
