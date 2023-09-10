<template>
  <v-container class="d-flex justify-center align-center">
    <v-container v-if="post">
      <v-row>
        <v-col cols="12">
          <v-card class="pa-4 post-card rounded-box">
            <div class="text-center">
              <h1 class="display-3">{{ post.title }}</h1>
              <p class="body-2">{{ post.body }}</p>
              <p class="body-2"><strong>Written by:</strong> {{ post.user.username }}</p>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" >
          <v-card class="mt-4 pa-4 rounded-box">
            <h2 class="display-4">Comments</h2>
            <v-form @submit="postComment">
              <v-text-field v-model="newComment" label="Your Comment"></v-text-field>
              <v-btn class="comment-button" @click="postComment" color="primary">
                <v-icon left>mdi-comment-outline</v-icon> Add Comment
              </v-btn>
            </v-form>

            <v-card v-for="(comment, index) in comments" :key="index" class="mt-4 pa-3">
              <p class="body-2">{{ comment.text }}</p>
              <v-row>
                <v-col cols="4">
                  <v-btn icon @click="likeComment(index)">
                    <v-icon :color="comment.liked ? 'primary' : 'grey'" class="fa-solid fa-thumbs-up"></v-icon>
                  </v-btn>
                  {{ comment.likes }} Likes
                </v-col>
              </v-row>
            </v-card>
          </v-card>
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
        this.fetchComments();
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    },
    fetchComments() {
      this.comments = [
        { text: 'This is a great post!', likes: 0, liked: false },
        { text: 'I learned a lot from this.', likes: 1, liked: false },
      ];
    },
    postComment() {
      this.comments.push({ text: this.newComment, likes: 0, liked: false });
      this.newComment = ''; 
    },
    likeComment(index) {
      const comment = this.comments[index];
      if (!comment.liked) {
        comment.likes++;
      } else {
        comment.likes--;
      }
      comment.liked = !comment.liked;
    },
  },
  data() {
    return {
      postId: null,
      post: null,
      newComment: '',
      comments: [],
    };
  },
  created() {
    this.postId = this.$route.params.id;
    this.fetchPostDetails();
  },
};
</script>

<style scoped>
.post-card {
  padding: 16px;
  text-align: center;  
}

.rounded-box {
  border-radius: 16px; 
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.comment-button {
  margin-top: 16px;
}

.comment-button:hover {
  background-color: #1976d2; 
}

.comment-button .v-icon {
  margin-right: 8px; 
}


.v-img {
  max-width: 100%;
  height: auto;
}
</style>
