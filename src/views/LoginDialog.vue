<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline" style="text-align: center;">Login</v-card-title>
      <span class="error-text" v-if="error">{{ error }} please try to login again</span>
      <v-card-text>
        <v-form ref="loginForm">
          <v-text-field
            v-model="loginData.email"
            label="Email"
            required
            :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Email must be valid']"
          ></v-text-field>
          <v-text-field
            v-model="loginData.password"
            label="Password"
            type="password"
            required
            :rules="[v => !!v || 'Password is required']"
          ></v-text-field>
        </v-form>
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
      error: '',
      loginData: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapState({
      isAuth: (state) => state.auth.isAuth,
    }),
  },

  methods: {
    ...mapActions('auth', ['login', 'logout']),
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.error = ''; 
    },
    async signin() {
      if (this.$refs.loginForm.validate()) {
        const res = await this.login(this.loginData);
        if (res === 'logged in') {
          this.close();
        } else {
          this.error = res;
        }
        this.loginData = {
          email: '',
          password: '',
        };
      }
    },
  },
};
</script>

<style scoped>
.error-text {
  text-align: center;
  color: rgb(172, 67, 67);
}
</style>
