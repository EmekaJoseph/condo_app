<template>
    <PageLoadingComponent v-if="isLoading" />
    <div v-else>
        <div class="mb-5">
            <headerAndMenu />
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

