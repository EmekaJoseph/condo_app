<template>
  <vue3-progress-bar></vue3-progress-bar>
  <div style="padding-bottom: 100px;">
    <RouterView />
  </div>
  <SearchModal />
  <PageFooter />
</template>
<script setup lang="ts">
import SearchModal from '@/components/modals/SearchModal.vue';
import PageFooter from './components/Footer.vue';
</script>
