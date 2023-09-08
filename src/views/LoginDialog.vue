<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline">Login</v-card-title>
      <v-card-text>
        <!-- Your login form here -->
        <v-form ref="loginForm">
          <v-text-field v-model="loginData.username" label="Username"></v-text-field>
          <v-text-field v-model="loginData.password" label="Password" type="password"></v-text-field>
        </v-form>
        <span>{{error}}</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="signin">Login</v-btn>
        <v-btn text @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      dialog: false,
      error : '',
      loginData:{
        username: '',
        password: '',
      }
    };
  },
  computed: {
    ...mapState({
      isAuth: (state) => state.auth.isAuth
    })
  },

  methods: {
    ...mapActions('auth', ['login', 'logout']),
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    async signin() {
      if(this.loginData.username != '' && this.loginData.password != ''){
        const res = await this.login(this.loginData)
        if(res === 'logged in'){
          this.close()
        }
        else this.error = res;
      }
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
