<template>
  <v-app>
    <NavBar /> 
    <DrawerComponent/>
    <v-main>
      <slot></slot> 
    </v-main>
    <FooterComponent /> 
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
