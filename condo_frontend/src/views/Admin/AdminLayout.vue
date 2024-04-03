<template>
    <PageLoadingComponent v-if="isLoading" />
    <div v-else>
        <div style="margin-bottom: 100px;">
            <headerAndMenu />
            <div class="container mt-4">
                <!-- <div v-if="authStore.emailVerified" class="alert alert-success bg-transparent border-0 fw-bold">
                    <div class="float-end fw-lighter small ms-4 lh-1 ">
                        {{ authStore.profileData.email }}
                        <i class="bi bi-check-circle-fill"></i>
                    </div>
                </div> -->
                <div v-if="!authStore.emailVerified" class="alert alert-warning border-0 bg-transparent fw-bold">
                    <div class="float-end">
                        <i class="bi bi-exclamation-circle-fill"></i>
                        {{ authStore.profileData.email }}
                        <button class="btn btn-warning btn-sm px-4 rounded-5">verify</button>
                    </div>
                </div>
            </div>
            <router-view></router-view>
        </div>
        <PageFooter />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import api from "@/stores/Helpers/axios"
import headerAndMenu from './Components/headerAndMenu.vue'


const isLoading = ref(true)
const authStore = useAuthStore()

onMounted(() => {
    getProfileDetails()
})

async function getProfileDetails() {
    try {
        const { data } = await api.userProfile()
        authStore.profileData = data
        isLoading.value = false
    } catch (error) {

    }
}
</script>
