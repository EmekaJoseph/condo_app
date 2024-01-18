<template>
    <nav class="navbar  navbar-light bg-light shadow-sm">
        <div class="container">
            <div ref="offCanvasToggler" class="fs-5 cursor-pointer" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <i class="bi bi-list"></i> Menu
            </div>
            <span class="navbar-brand color-theme fw-bold">{{ appVar.appName }}</span>
        </div>
    </nav>


    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header bg-light">
            <h5 class="offcanvas-title text-muted " id="offcanvasExampleLabel"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="list-group list-group-flush mt-5">
                <li class="list-group-item">
                    <router-link to="/dashboard">
                        <i class="bi bi-window-desktop"></i> Dashboard
                    </router-link>
                </li>
                <li class="list-group-item">
                    <router-link to="/profile">
                        <i class="bi bi-person"></i> My Profile
                    </router-link>
                </li>

            </ul>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useAppVariables } from '@/stores/appVariables';
import { useRoute } from 'vue-router';

const offCanvasToggler = ref<any>(null)

const authStore = useAuthStore()
const appVar = useAppVariables()
const route = useRoute()


watch(() => route.path, () => {
    offCanvasToggler.value.click()
})
</script>


<style  scoped>
/* @media (max-width: 797px) { */
.offcanvas {
    width: 300px;
}

/* } */

.list-group-item {
    border: 0px;
}

.list-group-item a {
    text-decoration: none;
    color: #8f8080;
}

.list-group-item a:hover {
    color: #000;
}

.active {
    color: #000 !important;
    font-weight: bold;
}
</style>
