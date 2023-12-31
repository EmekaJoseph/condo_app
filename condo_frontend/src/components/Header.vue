<template>
    <nav class="navbar navbar-expand-sm navbar-light fixed-top" :class="customClass">
        <div class="container">
            <router-link class="navbar-brand" to="/" style="font-weight: 700;">Condonote. </router-link>
            <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about">About</router-link>
                    </li>
                </ul>
                <div @click="appVar.toggleSearchModal" class="cursor-pointer d-none d-md-block">
                    <i class="bi bi-search fs-5"></i>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppVariables } from '@/stores/appVariables';

const appVar = useAppVariables()

const customClass = computed(() => ({
    'animate__animated animate__slideInDown animate__faster': appVar.y_axis > 50,
    'bg-white shadow-sm': appVar.y_axis > 50,
}))

</script>

<style scoped>
.active {
    color: var(--theme-color) !important;
}
</style>