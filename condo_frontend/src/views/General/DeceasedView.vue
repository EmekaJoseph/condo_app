<template>
    <div v-if="isLoading" class="everything-center">
        <LoadingComponent />
    </div>
    <div v-else>
        <PictureHeader :details="details" />
        <div class=" container" style="margin-top: 70px;">
            <div class="row g-3">
                <div class="col-md-8">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button @click="switchTab('info')" class="nav-link active" id="info-tab" data-bs-toggle="tab"
                                data-bs-target="#info" type="button" role="tab" aria-controls="info" aria-selected="true">
                                <i class="bi bi-info-circle"></i> Info
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button @click="switchTab('condo')" class="nav-link" id="condo-tab" data-bs-toggle="tab"
                                data-bs-target="#condo" type="button" role="tab" aria-controls="condo"
                                aria-selected="false">
                                <i class="bi bi-pencil"></i> Condolences
                            </button>
                        </li>
                        <li v-if="details.gallery.length" class="nav-item" role="presentation">
                            <button @click="switchTab('gal')" class="nav-link" id="gallery-tab" data-bs-toggle="tab"
                                data-bs-target="#gallery" type="button" role="tab" aria-controls="gallery"
                                aria-selected="false">
                                <i class="bi bi-vignette"></i> Gallery
                            </button>
                        </li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content pt-4">
                        <div class="tab-pane active" id="info" role="tabpanel" aria-labelledby="info-tab">
                            <InfoPanel :details="details" />
                        </div>

                        <div class="tab-pane" id="condo" role="tabpanel" aria-labelledby="condo-tab">
                            <CondolencesPanel :condolences="condolences" />
                        </div>

                        <div class="tab-pane" id="gallery" role="tabpanel" aria-labelledby="gallery-tab">
                            <GalleryPanel :gallery="details.gallery" />
                        </div>
                    </div>
                </div>
                <div class="col-md-4"></div>
            </div>
        </div>
    </div>
    <condoBtn v-if="condoIsClicked" />
    <condoModal />
</template>
  
<script setup lang="ts">
import api from "@/stores/Helpers/axios"
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router'
import PictureHeader from '@/components/DeceasedView/PictureHeader.vue'

import InfoPanel from "@/components/DeceasedView/InfoPanel.vue";
import CondolencesPanel from "@/components/DeceasedView/CondolencesPanel.vue";
import GalleryPanel from "@/components/DeceasedView/GalleryPanel.vue";

import condoBtn from "@/components/condoBtn.vue";
import condoModal from "@/components/modals/condoModal.vue";

const route = useRoute()

const details = ref<any>(null)
const condolences = ref<any>(null)
const isLoading = ref(true)
const condoIsClicked = ref(false)

watchEffect(async () => {
    await getDetails()
    getCondolences()
})

async function getDetails() {
    try {
        isLoading.value = true
        let { data } = await api.details(route.params.id)
        details.value = data
        isLoading.value = false

    } catch (error) {
        isLoading.value = false
    }
}

async function getCondolences() {
    try {
        let { data } = await api.condolences(route.params.id)
        condolences.value = data
    } catch (error) {
    }
}

const switchTab = (str: string) => condoIsClicked.value = str == 'condo' ?? false

</script>
  
<style scoped>
/* .nav-tabs .nav-item.show .nav-link, */
.nav-tabs .nav-link.active {
    color: var(--theme-color);
    border-bottom: 2px solid var(--theme-color) !important;

}

.nav-link {
    color: var(--bs-gray-500);
    border: 0 !important;
    background-color: transparent !important;
    /* padding-inline: 50px; */
    /* font-size: 20px; */
}

@media (max-width: 767px) {
    .nav-link {
        font-size: 14px;
    }
}
</style>
  