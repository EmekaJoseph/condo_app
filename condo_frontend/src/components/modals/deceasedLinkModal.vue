<template>
    <div>
        <!-- Modal trigger button -->
        <button ref="openModal_link" class="btn d-none" data-bs-toggle="modal" data-bs-target="#searchModal">
        </button>

        <div class="modal fade" id="searchModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
            role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-heade p-3  bg-theme border-0">
                        <h5 class="modal-title text-white fw-bold text-center">{{ appVar.appName }}.</h5>
                        <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                    </div>
                    <div class="modal-body rounded-0">
                        <div class="col-12">
                            <div class="alert px-0 alert-light small text-muted border-0" role="alert">
                                Copy this public link and send to others.
                            </div>

                        </div>
                        <div class="col-12">
                            <div class="input-group">
                                <input disabled :value="link" type="text" name="name" id="name" class="form-control"
                                    placeholder="placeholder" aria-describedby="suffixId" />
                                <span v-if="!copied" @click="copy(link)" class="input-group-text cursor-pointer"
                                    id="suffixId">
                                    <i class="bi bi-copy me-1"></i> copy
                                </span>
                                <span v-else class="input-group-text cursor-pointer">
                                    copied
                                </span>
                            </div>
                        </div>


                    </div>
                    <div class="modal-footer border-0">
                        <button ref="closeModal_link" type="button" class="btn" data-bs-dismiss="modal">
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
import { useClipboard } from '@vueuse/core';

const appVar = useAppVariables()
const openModal_link = ref<any>(null)
const closeModal_link = ref<any>(null)

const { copy, copied } = useClipboard()

const prop = defineProps({
    link: {
        required: true,
        type: String
    }
})


watch(() => appVar.copyLinkModal, () => {
    openModal_link.value.click()
});

onBeforeRouteLeave(() => {
    closeModal_link.value.click()
});
</script>

<style  scoped>
.results-card {
    height: 300px;
    overflow-y: auto;
}
</style>