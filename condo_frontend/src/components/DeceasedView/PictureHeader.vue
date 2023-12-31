<template>
    <div class="col-12 sticky-top">
        <div class="card border-0 position-relative">
            <div class="cover-photo ">
                <div class="transparent-layer">
                    <div class="float-end">
                        <div class="m-3 mb-0 text-white    text-end">
                            <div class="h3 fw-bold text-capitalize">{{ details.deceased }}</div>
                            <div style="line-height: 0;">
                                ({{ new Date(details.birth_date).getFullYear() }} -
                                {{ new Date(details.death_date).getFullYear() }})
                            </div>
                            <div class="mt-5">
                                <span @click="shareLink" class="badge rounded-pill text-bg-warning cursor-pointer">
                                    <i class="bi bi-share-fill"></i> Share link
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img :class="slideLeftClass" :src="useFxn.resolvePhotoSrc(details.display_photo, 'deceased_dps')"
                alt="Profile Picture" class="profile-picture mx-auto ms-5 d-block bg-light ">
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAppVariables } from '@/stores/appVariables';
import { useShare } from '@vueuse/core'
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import useFxn from '@/stores/Helpers/useFunctions';

const { share } = useShare()
const appVar = useAppVariables()
defineProps(['details'])
const route = useRoute()

function shareLink() {
    share({
        title: `${route.params.name}`,
        text: `Online condolence register for late: ${route.params.name}`,
        url: location.href,
    })
}

const slideLeftClass = computed(() => {
    const classs = appVar.y_axis < 100 ? `animate__slideInLeft` : `animate__slideOutLeft`
    return `animate__animated ${classs} animate__faster`
})

</script>

<style scoped>
.cover-photo {
    height: 150px;
    background: url('@/assets/images/hero.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    border-bottom: 4px solid var(--theme-color);
}



.transparent-layer {
    background-color: #000000a5;
    height: 100%
}

.profile-picture {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    position: absolute;
    top: 75px;
    border: 4px solid #fff;
}
</style>
