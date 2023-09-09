<template>
  <v-app-bar app dark color="white">
    <v-app-bar-nav-icon v-if="isMobile" @click="toggleMenu()"></v-app-bar-nav-icon>
    <v-toolbar-title class="ml-4">Blog Web App</v-toolbar-title>

    <v-tabs v-if="!isMobile" grow v-model="activeTab">
      <v-tab v-for="(item, index) in menuItems" :key="index" @click="navigate(item.route)">
        <span class="hidden-sm-and-down">{{ item.title }}</span>
      </v-tab>
    </v-tabs>
    <v-spacer></v-spacer>
    <v-btn @click="handleAuthClick" text>
      {{ isAuth ? "Logout" : "Login" }}
    </v-btn>
  </v-app-bar>

  <login-dialog ref="loginDialog"></login-dialog>
</template>

<script>
import LoginDialog from '@/views/LoginDialog.vue';
import { mapGetters,mapActions } from 'vuex'; 

export default {
  data() {
    return {
      drawer: false,
      isMobile: true, 
      activeTab: null,
      menuItems: [
        { title: "Home", route: "/"},
        { title: "Users", route: "/users"},
        { title: "Posts", route: "/posts"},
        { title: "Contact", route: "/contact"},
      ],
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuth']),  
  },
  methods: {
    ...mapActions('auth',['logout']),
    ...mapActions(['toggleMobileMenu']),
    toggleMenu() {
      this.toggleMobileMenu();
    },
    navigate(route) {
      this.$router.push(route);
      this.drawer = false;
    },
    handleDrawerToggle(){
     this.toggleMenu()
    },
    openLoginDialog() {
      this.$refs.loginDialog.open();
    },

    handleAuthClick() {
      if (this.isAuth) {
        this.logout()
      } else {
        this.$refs.loginDialog.open();
      }
    },
  },
  mounted() {
    this.isMobile = window.innerWidth <= 768; 
    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth <= 768;
    });
  },
  components: {
    'login-dialog': LoginDialog,
  },
};
</script>

<style scoped>
</style>
