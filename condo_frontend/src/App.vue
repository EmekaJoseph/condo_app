<template>
  <vue3-progress-bar></vue3-progress-bar>
  <RouterView />
</template>
<script setup lang="ts">
import { watchEffect } from 'vue';
import { useAppVariables } from './stores/appVariables';

const appVar = useAppVariables()
watchEffect(() => {
  document.documentElement.setAttribute('data-bs-theme', appVar.appTheme)
})
</script>
