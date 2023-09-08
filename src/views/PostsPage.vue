<template>
  <v-container>
    <v-row class="header" justify="center">
      <v-col cols="12">
        <h2>Blog</h2>
        <hr class="solid-divider"> 
      </v-col>
    </v-row>

    
    <v-row>
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
  <div class="row">
    <div class="leftcolumn">
      <v-card outlined class="mb-4 card" v-for="(post) in paginatedPosts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <h5>Title description, Dec 7, 2017</h5>
        <p>{{ post.body }}</p>
        <h4>Created by: {{ post.username }}</h4>
        <div class="options" v-if="isAuth">
          <v-btn @click="editPost(post)">Edit</v-btn>
          <v-btn @click="deletePost(post)">Delete</v-btn>
        </div>
      </v-card>
    </div>
  </div>
      </v-col>

      <v-col cols="12" md="4" lg="4">
       
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

        <v-card outlined class="card">
          <h3>Follow Me</h3>
          <p>Some text..</p>
        </v-card>
      </v-col>
    </v-row>

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
      itemsPerPage: 4, 
      newPost: {
        title: '',
        body: '',
        
      },
      selectedPost: { // Replace with actual post data
        id: 1,
        title: 'Sample Post Title',
        username: 'John Doe',
        body: 'This is the post content...',
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
    ...mapActions('posts', ['fetchPosts', 'createPost', 'updatePost', 'deletePost']), 
    changePage(page) {
      this.currentPage = page;
    },
    goToAddPostPage() {
      
      this.$router.push('/posts'); 
    },
    addPost() {
      
      if (!this.newPost.title || !this.newPost.body) {
        
        return;
      }

      this.createPost(this.newPost);

      this.newPost.title = '';
      this.newPost.body = '';
    },
    editPost(post) {
      this.$router.push(`/edit-post/${post.id}`);
    },

    deletePost(post) {
      const confirmDelete = window.confirm('Are you sure you want to delete this post?');
      if (confirmDelete) {
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
.header {
  padding: 30px;
  font-size: 40px;
  text-align: center;
  background: white;
}

.leftcolumn {
  width: 100%; 
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
  border-top: 1px solid #000; 
  width: 30%; 
  margin: 16px auto; 
}
</style>
