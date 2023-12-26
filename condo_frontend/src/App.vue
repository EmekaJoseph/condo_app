<template>
  <vue3-progress-bar></vue3-progress-bar>
  <div class="pb-5">
    <RouterView />
  </div>
  <Footer />
</template>
<script setup lang="ts">
import Footer from './components/Footer.vue';
</script>
