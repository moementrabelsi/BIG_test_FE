<template>
    <v-container>
    <v-container v-if="post">
      <v-row>
        <v-col cols="12">
          <h1 class="display-2 text-center">{{ post.title }}</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-img src="https://images.unsplash.com/photo-1693897454902-a621f16c6c30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" height="450" class="fakeimg mb-2" cover></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="pa-4 post-card" >
            <p class="body-1">{{ post.body }}</p>
          </v-card>
          <v-card >
          </v-card>
          <p class="body-1"> <strong>written by</strong> :{{ post.user.username }}</p>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>

    <v-progress-circular indeterminate color="primary"></v-progress-circular>
    
    </v-container>
    </v-container>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'DetailedPost',
    computed: {
      ...mapGetters('posts', ['getPostById']),
    },
    methods: {
      ...mapActions('posts', ['fetchOnePost']),
      async fetchPostDetails() {
        try {
          this.post = await this.fetchOnePost(this.postId);
          console.log(this.post.user);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      },
    },
    data() {
      return {
        postId: null,
        post: null,
      };
    },
    created() {
      this.postId = this.$route.params.id;
      this.fetchPostDetails();
    },

  };
  </script>
  <style>
.post-card{
  padding: 3px
}
</style>
  