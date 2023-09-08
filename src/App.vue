<template>
  <LayoutComponent> <!-- Use the Layout component as the root -->
    <!-- Your page content goes here -->
    <router-view></router-view> <!-- This renders the content of the current page -->
  </LayoutComponent>
</template>

<script>
import LayoutComponent from './components/LayoutComponent.vue'; // Import the Layout component

export default {
  components: {
    LayoutComponent, // Register the Layout component
  },
};
</script>