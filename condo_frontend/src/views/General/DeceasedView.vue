<template>
    <div v-if="isLoading" class="everything-center">
        <LoadingComponent />
    </div>
    <div v-else>
        <PictureHeader :details="details" />
        <div class="mt-5 container">
            {{ details }}
        </div>
    </div>
</template>
  
<script setup lang="ts">
// import HeaderVue from '@/components/Header.vue';
import api from "@/stores/Helpers/axios"
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router'
import PictureHeader from '@/components/DeceasedView/PictureHeader.vue'

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
        let { data } = await api.condolences(route.params.id)
        condolences.value = data
        console.log(data);

    } catch (error) {
    }

}
</script>
  
<style></style>
  