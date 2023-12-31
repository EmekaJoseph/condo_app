<template>
    <div>
        <!-- Modal trigger button -->
        <button ref="openModal_condo" class="btn d-none" data-bs-toggle="modal" data-bs-target="#condoModal">
        </button>

        <div class="modal fade" id="condoModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
            role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-heade p-3  bg-theme border-0">
                        <h5 class="modal-title text-white fw-bold text-center">{{ appVar.appName }}.</h5>
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
                                <label class="form-label">Relationship</label>
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
                            <span v-if="form.condoIsEmpty" class="ms-2 small text-danger">field is empty!</span>
                        </div>
                    </div>
                    <div class="modal-footer border-0">
                        <button ref="closeModal_condo" type="button" class="btn" data-bs-dismiss="modal">
                            Cancel
                        </button>
                        <button @click="postCondolence" v-if="!form.isSaving" style="width: 160px;" type="button"
                            class="btn btn-theme">
                            Post Condolence
                        </button>
                        <button v-else style="width: 160px;" :disabled="true" class="btn btn-theme" type="button">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Posting...
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
import { onBeforeRouteLeave } from 'vue-router';
import api from "@/stores/Helpers/axios"
import useFxn from '@/stores/Helpers/useFunctions';

const appVar = useAppVariables()
const openModal_condo = ref<any>(null)
const closeModal_condo = ref<any>(null)

const emit = defineEmits(['hasPosted'])

const form = reactive<any>({
    condolence: '',
    condo_name: '',
    relationship: '',
    isSaving: false,
    condoIsEmpty: false,
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


function postCondolence() {
    form.condoIsEmpty = false

    if (!form.condolence) {
        form.condoIsEmpty = true;
        return;
    }

    const obj = {
        condolence: form.condolence,
        condo_name: !form.condo_name ? 'anonymous' : form.condo_name,
        relationship: !form.relationship ? null : form.relationship,
        deceased_id: appVar.currentDeceasedId
    }

    useFxn.confirm('Post now', 'Confirm')
        .then(async (response) => {
            if (response.value) {
                try {
                    form.isSaving = true
                    let resp = await api.postCondolence(obj)
                    if (resp.status == 201) {
                        emit('hasPosted')
                        useFxn.toast('Condolence posted successfully', 'success')
                        form.condoIsEmpty = false
                        form.condo_name = ''
                        form.condolence = ''
                    }
                } catch (error) {
                    // 
                }
                finally {
                    form.isSaving = false
                    closeModal_condo.value.click()
                }
            }

        })
}


watch(() => appVar.condoModal, () => {
    openModal_condo.value.click()
});

onBeforeRouteLeave(() => {
    closeModal_condo.value.click()
});
</script>