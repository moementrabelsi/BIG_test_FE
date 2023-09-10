<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline" style="text-align: center;">Edit Post</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitUpdatePost">
      <v-text-field v-model="updatedPost.title" label="Title" required></v-text-field>
      <v-textarea v-model="updatedPost.body" label="Body" required></v-textarea>
      <v-btn type="submit" color="grey">Update Post</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      dialog: false,
      updatedPost: {
        title: '', 
        body: '',
      },
    };
  },
  computed: {
    ...mapGetters('posts', ['allPosts']), 
  },
  methods: {
    ...mapActions('posts', ['updatePost']),
    open(post) {
      this.dialog = true;
      this.updatedPost = {...post};
    },
    close() {
      this.dialog = false;
    },

    async submitUpdatePost() {
      try {
        await this.updatePost(this.updatedPost);
        this.close() 
      } catch (error) {
        console.error('Error updating post:', error);
      }
    },
  },

};
</script>

<style scoped>
</style>
