<template>
  <v-app>
    <NavBar /> <!-- Include the NavBar component -->
    <DrawerComponent/>
    <v-main>
      <slot></slot> <!-- This slot will render the content of the pages -->
    </v-main>
    <FooterComponent /> <!-- Include your FooterComponent or any other components here -->
  </v-app>
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";
import NavBar from "@/components/NavBar.vue";
import DrawerComponent from "@/components/DrawerComponent.vue";

export default {
  name: "LayoutComponent",
  components: {
    FooterComponent,
    NavBar,
    DrawerComponent
  },
};
</script>
