<template>
    <div>
        <!-- Modal trigger button -->
        <button ref="openModal" class="btn d-none" data-bs-toggle="modal" data-bs-target="#condoModal">
        </button>

        <div class="modal fade" id="condoModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
            role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-heade p-3  bg-theme border-0">
                        <h5 class="modal-title text-white fw-bold text-center">Condonote.</h5>
                        <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Your Name (optional)</label>
                            <input v-model="form.condo_name" type="text" class="form-control" name="" id=""
                                aria-describedby="helpId" placeholder="" />
                        </div>

                        <div class="mb-3">
                            <div class="mb-3">
                                <label class="form-label">Relationship (optional)</label>
                                <select v-model="form.relationship" class="form-select">
                                    <option value="" selected disabled>Select relationship</option>
                                    <option value="sister">Sister</option>
                                    <option value="brother">Brother</option>
                                    <option value="father">Father</option>
                                    <option value="mother">Mother</option>
                                    <option value="cousin">Cousin</option>
                                    <option value="friend">Friend</option>
                                    <option value="grand_child">Grand child</option>
                                </select>
                            </div>

                        </div>


                        <div>
                            <label class="form-label">Write your condolence</label>
                            <textarea v-model="form.condolence" @input="checkWordCount" placeholder="enter text here..."
                                class="form-control" name="" rows="5"></textarea>
                            <span class="small">{{ form.maxCharCount - wordCount }} characters remaining</span>

                        </div>
                    </div>
                    <div class="modal-footer border-0">
                        <button ref="closeModal" type="button" class="btn" data-bs-dismiss="modal">
                            Cancel
                        </button>
                        <button type="button" class="btn btn-theme">
                            Post Condolence
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useAppVariables } from '@/stores/appVariables';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import api from "@/stores/Helpers/axios"
import useFxn from '@/stores/Helpers/useFunctions';

const appVar = useAppVariables()
const router = useRouter()
const openModal = ref<any>(null)
const closeModal = ref<any>(null)

const form = reactive<any>({
    condolence: '',
    condo_name: '',
    relationship: '',
    isSaving: true,
    maxCharCount: 250,
    // maxWordCount: 50
})

const wordCount = computed(() => {
    // return form.condolence.trim().split(/\s+/).length;
    return form.condolence.length;
});

function checkWordCount(event: any) {
    // const words = event.target.value.trim().split(/\s+/);
    // if (words.length > form.maxWordCount) {
    //     const truncatedText = words.slice(0, form.maxWordCount).join(' ');
    //     form.condolence = truncatedText;
    // }
    const input = event.target.value;
    if (input.length > form.maxCharCount) {
        form.condolence = input.slice(0, form.maxCharCount);
    }
}


async function search() {
    if (form.searchStr) {
        try {
            form.isSaving = true
            let resp = await api.search(form.searchStr)
            form.searchResults = resp.data
            form.isSaving = false
        } catch (error) {
            form.isSaving = false
        }
    }
}



watch(() => appVar.condoModal, () => {
    console.log('changed');

    openModal.value.click()
});

onBeforeRouteLeave(() => {
    closeModal.value.click()
});
</script>

<style  scoped>
.modal-content {
    border-bottom: 5px solid var(--theme-color);
}

.results-card {
    height: 300px;
    overflow-y: auto;
}
</style>