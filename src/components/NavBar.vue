<template>
  <v-app-bar app dark color="white">
    <v-app-bar-nav-icon v-if="isMobile" @click="toggleMenu()"></v-app-bar-nav-icon>
    <v-toolbar-title class="ml-4">Blog Web App</v-toolbar-title>

    <!-- Display tabs on larger screens -->
    <v-tabs v-if="!isMobile" grow v-model="activeTab">
      <v-tab v-for="(item, index) in menuItems" :key="index" @click="navigate(item.route)">
        <span class="hidden-sm-and-down">{{ item.title }}</span>
      </v-tab>
    </v-tabs>
    <!-- Display menu on smaller screens -->
    <v-spacer></v-spacer>
    <!-- Conditionally show "Login" or "Logout" button -->
    <v-btn @click="handleAuthClick" text>
      Login
    </v-btn>
  </v-app-bar>

</template>

<script>
import { mapGetters,mapActions } from 'vuex'; // Import mapGetters from Vuex

export default {
  data() {
    return {
      drawer: false,
      isMobile: true, // Detect if it's a mobile view
      activeTab: null,
      menuItems: [
        { title: "Home", route: "/"},
        { title: "Users", route: "/users"},
        { title: "Blog", route: "/blog"},
      ],
    };
  },
  computed: {
    // Use computed properties to access isAuthenticated from Vuex store
    ...mapGetters('auth', ['isAuth']),  
  },
  methods: {
    ...mapActions('auth',['logout']),
    ...mapActions(['toggleMobileMenu']),
    toggleMenu() {
      // Call the 'toggleMobileMenu' action when needed
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
      // Open the login dialog when the button is clicked
      this.$refs.loginDialog.open();
    },
  },
  mounted() {
    this.isMobile = window.innerWidth <= 768; // Set the mobile view breakpoint
    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth <= 768;
    });
  }
};
</script>

<style scoped>
/* Customize the color scheme and design as needed */
</style>
