<template>
    <!-- <HeaderVue /> -->
    <div class="everything-center containet">
        <div v-if="isLoading" class="d-flex justify-content-center align-items-center">
            <div style="width: 100px; height: 100px;" class="spinner-border theme-color spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <h1 v-else>
            {{ details.deceased }}
        </h1>

    </div>
</template>
  
<script setup lang="ts">
// import HeaderVue from '@/components/Header.vue';
import api from "@/stores/Helpers/axios"
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()

const details = ref<any>(null)
const condolences = ref<any>(null)
const isLoading = ref(true)

watchEffect(async () => {
    await getDetails()
    getCondolences()
})


async function getDetails() {
    try {
        isLoading.value = true
        let { data } = await api.details(route.params.id)
        details.value = data
        console.log(data);
        isLoading.value = false

    } catch (error) {
        isLoading.value = false
    }
}

async function getCondolences() {
    try {
        isLoading.value = true
        let { data } = await api.condolences(route.params.id)
        condolences.value = data
        console.log(data);
        isLoading.value = false

    } catch (error) {
        isLoading.value = false
    }

}
</script>
  
<style></style>
  