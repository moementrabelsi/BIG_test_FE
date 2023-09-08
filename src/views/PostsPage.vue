<template>
  <v-container>
    <!-- Header -->
    <v-row class="header" justify="center">
      <v-col cols="12">
        <h2>Blog</h2>
        <hr class="solid-divider"> <!-- Add a class for styling -->
      </v-col>
    </v-row>

    <!-- Content Row -->
    <v-row>
      <!-- Left Column -->
      <v-col cols="12" md="8" lg="8">
        <div v-if="isAuth">
          <v-card outlined class="mb-4 card">
            <h2>Add a New Post</h2>
            <v-form @submit.prevent="addPost">
              <v-text-field
                v-model="newPost.title"
                label="Title"
                required
              ></v-text-field>
              <v-textarea
                v-model="newPost.body"
                label="Body"
                required
              ></v-textarea>
              <v-btn type="submit" color="grey">Add Post</v-btn>
            </v-form>
          </v-card>
        </div>
      <!-- Blog Posts -->
  <div class="row">
    <div class="leftcolumn">
      <!-- Blog Post 1 -->
      <v-card outlined class="mb-4 card" v-for="(post) in paginatedPosts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <h5>Title description, Dec 7, 2017</h5>
        <p>{{ post.body }}</p>
        <h4>Created by: {{ post.username }}</h4> <!-- Display the username here -->
        <div class="options" v-if="isAuth">
          <!-- Edit and Delete buttons for each post -->
          <v-btn @click="editPost(post)">Edit</v-btn>
          <v-btn @click="deletePost(post)">Delete</v-btn>
        </div>
      </v-card>
      <!-- Add more blog posts as needed -->
    </div>
  </div>
      </v-col>

      <!-- Right Column -->
      <v-col cols="12" md="4" lg="4">
        <!-- About Me Card -->

        <!-- Popular Post Card -->
        <v-card outlined class="mb-4 card">
          <h3>Popular Post</h3>
          <v-img src="https://images.unsplash.com/photo-1693897454902-a621f16c6c30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" height="200" class="fakeimg mb-2" cover></v-img>
        </v-card>
        <v-card outlined class="mb-4 card">
          <h3>Popular Post</h3>
          <v-img src="https://images.unsplash.com/photo-1693897454902-a621f16c6c30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" height="200" class="fakeimg mb-2" cover></v-img>
        </v-card>
        <v-card outlined class="mb-4 card">
          <h3>Popular Post</h3>
          <v-img src="https://images.unsplash.com/photo-1693897454902-a621f16c6c30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" height="200" class="fakeimg mb-2" cover></v-img>
        </v-card>

        <!-- Follow Me Card -->
        <v-card outlined class="card">
          <h3>Follow Me</h3>
          <p>Some text..</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pagination -->
    <v-row justify="center">
      <v-col cols="12">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @input="changePage"
          :total-visible="5"
          class="mt-4"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 4, // Number of posts per page
      newPost: {
        title: '',
        body: '',
      },
    };
  },
  computed: {
    ...mapState({
      allPosts: (state) => state.posts.posts,
    }),
    ...mapGetters('auth', ['isAuth']),
    paginatedPosts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.allPosts.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.allPosts.length / this.itemsPerPage);
    },
  },
  methods: {
    ...mapActions('posts', ['fetchPosts', 'createPost', 'updatePost', 'deletePost']), // Add createPost action
    changePage(page) {
      this.currentPage = page;
    },
    goToAddPostPage() {
      // You can use Vue Router to navigate to the add post page.
      // For example:
      this.$router.push('/posts'); // Change '/add-post' to your actual route path
    },
    addPost() {
      // Validate the new post data here, e.g., check if fields are not empty
      if (!this.newPost.title || !this.newPost.body) {
        // Handle validation error
        return;
      }

      // Dispatch the createPost action to add the new post
      this.createPost(this.newPost);

      // Clear the form fields
      this.newPost.title = '';
      this.newPost.body = '';
    },
    editPost(post) {
      // You can navigate to the edit post page with the selected post's ID as a route parameter.
      // For example:
      this.$router.push(`/edit-post/${post.id}`);
    },

    deletePost(post) {
      // You can implement a confirmation dialog before deleting the post.
      const confirmDelete = window.confirm('Are you sure you want to delete this post?');
      if (confirmDelete) {
        // Dispatch the deletePost action to delete the post by ID
        this.deletePost(post.id);
      }
    },
  },
  created() {
    this.fetchPosts();
  },
};
</script>

<style scoped>
/* You can include the provided CSS styles here. */
.header {
  padding: 30px;
  font-size: 40px;
  text-align: center;
  background: white;
}

.leftcolumn {
  width: 100%; /* Make the left column full width on smaller screens */
}

.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.footer {
  padding: 20px;
  text-align: center;
  background: #ddd;
  margin-top: 20px;
}

.solid-divider {
  border-top: 1px solid #000; /* Adjust the width and color as needed */
  width: 30%; /* Adjust the width as needed */
  margin: 16px auto; /* Center the divider and add some spacing */
}
</style>
