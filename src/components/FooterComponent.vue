<template>
  <v-footer app>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="3">
        <div class="footer-links">
          <router-link to="/">Home</router-link>
          <router-link to="/about">Users</router-link>
          <router-link to="/contact">Posts</router-link>
          <router-link to="/contact">Contact</router-link>
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="3">
  <div class="social-links">
    <a href="https://www.facebook.com/moemeeeen" target="_blank">
      <v-icon class="fa"><i class="fab fa-facebook"></i></v-icon>
    </a>
    <a href="https://www.instagram.com/moemeeen/" target="_blank">
      <v-icon class="fa"><i class="fab fa-instagram"></i></v-icon>
    </a>
    <a href="https://github.com/moementrabelsi" target="_blank"> 
      <v-icon class="fa"><i class="fab fa-github"></i></v-icon>
    </a>
  </div>
</v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="3">
        <div class="text-center">
          &copy; {{ currentYear }} Abdelmoemen Trabelsi. All rights reserved.
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>


  
<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>

.footer-links a,
.social-links a {
  text-decoration: none;
  color: inherit;
  margin: 0 10px;
}

.footer-links a:hover,
.social-links a:hover {
  text-decoration: underline;
}
</style>





