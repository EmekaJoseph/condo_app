<template>
    <span @click="appVar.toggleTheme" class="cursor-pointer">
        <i v-if="appVar.appTheme == 'dark'" class="bi bi-sun"></i>
        <i v-else class="bi bi-moon"></i>
    </span>

</template>
<script setup lang="ts">
import { useAppVariables } from '@/stores/appVariables';
const appVar = useAppVariables()
</script>