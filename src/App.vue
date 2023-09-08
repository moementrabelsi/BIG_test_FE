<template>
  <LayoutComponent> 
    <router-view></router-view> 
  </LayoutComponent>
</template>

<script>
import LayoutComponent from './components/LayoutComponent.vue'; 

export default {
  components: {
    LayoutComponent, 
  },
};
</script>