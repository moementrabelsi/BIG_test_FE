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
      console.log('Fetching posts...'); // Add this line for debugging
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      console.log('Received response:', response.data); // Add this line for debugging

      // Fetch user information for each post
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
      // Make an HTTP POST request to create the post
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postData);

      // Assuming the response contains the newly created post
      const newPost = response.data;

      // Commit the mutation to add the new post to the state
      commit('ADD_POST', newPost);

      return newPost; // You can return the newly created post if needed
    } catch (error) {
      console.error('Error creating post:', error);
      throw error; // Propagate the error to the caller
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
