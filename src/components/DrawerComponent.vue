<template>
  <v-navigation-drawer
        v-if="isMobile"
        v-model="menu"
        temporary
      >
          <v-list>
            <v-list-item v-for="(item, index) in menuItems" :key="index" @click="navigate(item.route)">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'; // Import mapGetters from Vuex

export default {
    data() {
        return {
            isMobile: true,
            menuItems: [
                { title: "Home", route: "/"},
                { title: "Users", route: "/users"},
                { title: "Blog", route: "/blog"},
            ],
        }
    },
    computed: {
      // Use computed properties to access isAuthenticated from Vuex store
      ...mapGetters(['menu']),
    },
    methods: {
      ...mapActions(['closeMobileMenu']),
      close() {
        this.closeMobileMenu();
      },
      navigate(route) {
        this.$router.push(route);
        this.close();
      },
    },
    mounted() {
      this.isMobile = window.innerWidth <= 768; // Set the mobile view breakpoint
      window.addEventListener("resize", () => {
        this.isMobile = window.innerWidth <= 768;
      });
    },
}
</script>

<style>

</style>