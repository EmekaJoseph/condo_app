<template>
    <div v-if="gallery && gallery.length">
        <div class="row g-3">
            <div v-for="image in gallery" class="col-6 col-md-4 col-lg-3 cursor-pointer">
                <div class="card" @click="showImage(image)">
                    <img :src="useFxn.resolvePhotoSrc(image.gallery, 'galleries')" class="card-img-top" alt="Image 1">
                    <div class="card-body py-1">
                        <div class="card-title small text-truncate">{{ image.gallery_name }}</div>
                    </div>
                </div>
            </div>
        </div>
        <imageViewModal />
    </div>
</template>

<script setup lang="ts">
import useFxn from '@/stores/Helpers/useFunctions';
import { useAppVariables } from '@/stores/appVariables';
import imageViewModal from '@/components/modals/imageViewModal.vue'


const appVar = useAppVariables()

function showImage(image: any) {
    const url = useFxn.resolvePhotoSrc(image.gallery, 'galleries')
    appVar.currentImageToShow = { url: url, caption: image.gallery_name };
    appVar.toggleImageModal()
}
defineProps(['gallery'])
</script>

<style  scoped>
.card-img-top {
    object-fit: cover;
    /* Maintains aspect ratio */
    height: 100px;
    /* Set the desired height */
}
</style>