<template>
    <div>
        <!-- Modal trigger button -->
        <button ref="openModal_image" class="btn d-none" data-bs-toggle="modal" data-bs-target="#imageModal">
        </button>

        <div class="modal fade" id="imageModal" tabindex="-1" role="dialog" aria-labelledby="modalTitleId"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-heade p-3  bg-theme border-0">
                        <h5 class="modal-title text-white fw-bold text-center">{{ appVar.appName }}.</h5>
                    </div>
                    <div class="modal-body rounded-0">
                        <img :src="appVar.currentImageToShow.url" class="img-fluid rounded-top" alt="" />
                        <p>
                            {{ appVar.currentImageToShow.caption }}
                        </p>
                    </div>
                    <div class="modal-footer border-0">
                        <button ref="closeModal_image" type="button" class="btn" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAppVariables } from '@/stores/appVariables';
import { onBeforeRouteLeave } from 'vue-router';
import useFxn from '@/stores/Helpers/useFunctions';

const appVar = useAppVariables()
const openModal_image = ref<any>(null)
const closeModal_image = ref<any>(null)


watch(() => appVar.imageModal, () => {
    openModal_image.value.click()
});

onBeforeRouteLeave(() => {
    closeModal_image.value.click()
});
</script>

<style  scoped>
.results-card {
    height: 300px;
    overflow-y: auto;
}
</style>