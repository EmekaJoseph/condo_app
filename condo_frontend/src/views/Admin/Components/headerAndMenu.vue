<template>
    <nav class="navbar  navbar-light bg-light shadow-sm">
        <div class="container">
            <!-- <div class="fs-5 cursor-pointer" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample">
                <i class="bi bi-list"></i> &nbsp;

            </div> -->
            <div>
                <span class="color-theme fw-bolder">{{ appVar.appName }}</span>
                | {{ route.name }}
            </div>
            <div class="dropdown open d-none d-md-block">
                <span class=" dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="bi bi-person"></i> {{ authStore.profileData?.email ?? '' }}
                </span>
                <div class="dropdown-menu dropdown-menu-end pt-0 rounded-top-0" aria-labelledby="triggerId">
                    <span class="dropdown-item cursor-pointer text-danger bg-transparent" @click="logout">
                        <i class="bi bi-power"></i> Logout
                    </span>
                </div>
            </div>

        </div>
    </nav>


    <!-- <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header bg-light">
            <h5 class="offcanvas-title text-muted " id="offcanvasExampleLabel">
                {{ authStore.profileData?.email ?? '' }}
            </h5>
            <button ref="offCanvasToggler" type="button" class="btn-close" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="list-group list-group-flush mt-5">
                <li class="list-group-item">
                    <router-link to="/dashboard">
                        <i class="bi bi-columns-gap me-2"></i> Dashboard
                    </router-link>
                </li>

                <li class="list-group-item">
                    <router-link to="/profile">
                        <i class="bi bi-person me-2"></i> Profile
                    </router-link>
                </li>

                <div class="list-group-item mt-5 cursor-pointer" @click="logout">
                    <i class="bi bi-box-arrow-left"></i> Logout
                </div>
            </ul>

        </div>
    </div> -->
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useAppVariables } from '@/stores/appVariables';
import { useRoute, useRouter } from 'vue-router';
import api from '@/stores/Helpers/axios'

const offCanvasToggler = ref<any>(null)

const authStore = useAuthStore()
const appVar = useAppVariables()
const route = useRoute()
const router = useRouter()


async function logout() {
    try {
        await api.userLogout()
    } catch (error) {

    }
    authStore.logout()
    router.replace({ name: 'Login' })
}

watch(() => route.path, () => {
    offCanvasToggler.value.click()
})
</script>


<style scoped>
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
