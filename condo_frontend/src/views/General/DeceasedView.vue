<template>
    <div class="mb-5">
        <div v-if="isLoading && !details" class="everything-center">
            <PageLoadingComponent />
        </div>
        <div v-else>
            <PictureHeader :details="details" />
            <div class=" container" style="margin-top: 70px;">
                <div class="row g-3">
                    <div class="col-md-8">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button @click="switchTab('info')" class="nav-link active" id="info-tab"
                                    data-bs-toggle="tab" data-bs-target="#info" type="button" role="tab"
                                    aria-controls="info" aria-selected="true">
                                    <i class="bi bi-info-circle"></i> Info
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button @click="switchTab('condo')" class="nav-link" id="condo-tab" data-bs-toggle="tab"
                                    data-bs-target="#condo" type="button" role="tab" aria-controls="condo"
                                    aria-selected="false">
                                    <i class="bi bi-journal-text"></i> Condolences
                                </button>
                            </li>
                            <li v-if="details?.gallery?.length" class="nav-item" role="presentation">
                                <button @click="switchTab('gal')" class="nav-link" id="gallery-tab" data-bs-toggle="tab"
                                    data-bs-target="#gallery" type="button" role="tab" aria-controls="gallery"
                                    aria-selected="false">
                                    <i class="bi bi-camera"></i> Gallery
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
                    <div class="col-md-4">
                        <hr class="d-lg-none">
                        <div class="row g-3">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <p class="card-text">
                                        <h5>Lost a loved one?</h5>
                                        Share memories, photos and videos and create a beautiful and lasting tribute to
                                        celebrate
                                        the life of your lost loved ones.
                                        </p>
                                        <p>
                                            <i class="bi bi-1-circle-fill"></i>
                                            Fill out the personal details of your lost one and add a short description
                                            with
                                            preffered background music.
                                        </p>
                                        <p>
                                            <i class="bi bi-2-circle-fill"></i>
                                            Select a nice photo and generate a unique web address for your page.
                                        </p>
                                        <p>
                                            <i class="bi bi-3-circle-fill"></i>
                                            Invite people to share memories and condolence messages.
                                        </p>
                                        <div class="card-footer border-0 bg-transparent px-0">
                                            <router-link class="btn btn-theme w-100" to="/login">
                                                Create a memorial page <i class="bi bi-chevron-right"></i>
                                            </router-link>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <button @click="appVar.toggleSearchModal()" class="w-100 btn btn-theme-outline">
                                    <i class="bi bi-search"></i> Search memorial
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="col-12" style="margin-top: 130px;">
                        <div class="card bg-light">
                            <div class="card-body">
                                <div class="card-text">
                                    As we mourn the physical departure, we also celebrate the enduring spirit that
                                    transcends
                                    the boundaries of time. For in every cherished memory, every shared laugh, and every
                                    lesson
                                    learned, the essence of the departed lives on. It resides in the stories told, the
                                    values
                                    instilled, and the love that continues to reverberate through the lives touched.
                                </div>
                                <p class="mt-3">
                                    <router-link class="color-theme text-decoration-none fw-bold" to="/">
                                        Go To Home Page <i class="bi bi-chevron-right"></i>
                                    </router-link>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <condoBtn v-if="condoIsClicked" />
        <condoModal @has-posted="getCondolences" />

        <!-- search modal -->
        <SearchDeceasedModal />
    </div>
    <PageFooter />
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
import { useAppVariables } from "@/stores/appVariables";

const route = useRoute()
const appVar = useAppVariables()

const details = ref<any>(null)
const condolences = ref<any>(null)
const isLoading = ref(true)
const condoIsClicked = ref(false)
const audioIsPlaying = ref(false)

watchEffect(async () => {
    await getDetails()
    await getCondolences()
    appVar.currentDeceasedId = route.params.id
})

function playAudio() {
    const hostURL = import.meta.env.VITE_API_URL;
    const audioFileURL = `${hostURL}/background_hymns/nearer-my-god-to-thee.mp3`
    const audio = new Audio(audioFileURL);
    audio.play()
    audioIsPlaying.value = true
}

async function getDetails() {
    try {
        isLoading.value = true
        const { data } = await api.details(route.params.id)
        details.value = data
        isLoading.value = false

    } catch (error) {
        // isLoading.value = false
    }
}

async function getCondolences() {
    try {
        const { data } = await api.condolences(route.params.id)
        condolences.value = data
    } catch (error) { }
}

const switchTab = (str: string) => {
    condoIsClicked.value = (str == 'condo')
    if (!audioIsPlaying.value) playAudio()
}

setInterval(() => {
    getCondolences()
}, 10000)

</script>

<style scoped>
/* .nav-tabs .nav-item.show .nav-link, */
.nav-tabs .nav-link.active {
    color: var(--theme-color);
    border-bottom: 2px solid var(--theme-color) !important;
    font-size: 13px;

}

.nav-link {
    color: var(--bs-gray-500);
    border: 0 !important;
    background-color: transparent !important;
    /* padding-inline: 50px; */
    /* font-size: 20px; */
}

.tab-content {
    min-height: 30vh
}

@media (max-width: 767px) {
    .nav-link {
        font-size: 14px;
    }
}
</style>