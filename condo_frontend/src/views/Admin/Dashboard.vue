<template>
    <div class="container mt-5 animate__animated animate__fadeIn">
        <div class="row justify-content-center min-vh-100 g-3">
            <div class="col-md-12">
                <h5 class="card-heade border-0 fw-bold mb-3">Post a memorial</h5>

                <div class="row g-3">
                    <div class="col-lg-6 ">
                        <div class="card shadow-sm border-0 h-100">
                            <div class="card-body">
                                <div class="row g-3">
                                    <div class="col-12">
                                        <label class="form-label">Deceased name:</label>
                                        <input v-model="form.deceased" type="text" class="form-control"
                                            placeholder="enter name..">
                                    </div>

                                    <div class="col-md-6">
                                        <label class="form-label">Birth Date:</label>
                                        <VueDatePicker :format="useFxn.dateDisplay" hide-input-icon :clearable="false"
                                            :max-date="new Date()" :enable-time-picker="false" auto-apply
                                            v-model="form.birth_date">
                                        </VueDatePicker>
                                    </div>

                                    <div class=" col-md-6">
                                        <label class="form-label">Death Date:</label>
                                        <VueDatePicker :format="useFxn.dateDisplay" hide-input-icon :clearable="false"
                                            :min-date="form.birth_date" :max-date="new Date()"
                                            :enable-time-picker="false" auto-apply v-model="form.death_date">
                                        </VueDatePicker>
                                    </div>

                                    <div class="col-12" style="margin-bottom: 100px; height:200px">
                                        <label class="form-label">Biography:</label>
                                        <QuillEditor v-model:content="form.biography" contentType="html"
                                            toolbar="minimal" placeholder="enter here.." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 ">
                        <div class="card shadow-sm border-0 h-100">
                            <div class="card-body">
                                <div class="form-label mb-3">Survived by:
                                    <div class="float-end">
                                        <button @click="addNewSurvivedByField" style="border-style: dotted;"
                                            class="btn btn-light btn-sm border-dark   text-dark  ">
                                            add new line
                                            <i class="bi bi-plus-circle-dotted"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card border-0 p-0" style="max-height: 300px; overflow-y: auto;">
                                    <div class="card-body p-0">
                                        <div v-for="(item, index) in form.survivedBys" :key="index"
                                            class="col-12 bg-light-subtle mb-2 px-2 pb-3 card">

                                            <div class="row g-3">
                                                <div class="col-12 ">
                                                    <!-- Name {{ index + 1 }}: -->
                                                    <button @click="form.survivedBys.splice(index, 1)"
                                                        v-if="form.survivedBys.length > 1"
                                                        class="float-end btn m-0 p-0 btn-link text-danger border-0">
                                                        <i class="bi bi-x"></i>
                                                    </button>
                                                </div>
                                                <div class="col-md-6">
                                                    <input v-model="item.survived_by" type="text"
                                                        class="form-control form-control-sm" placeholder="enter name..">
                                                </div>
                                                <div class="col-md-6">
                                                    <select v-model="item.relationship"
                                                        class="form-select form-select-sm">
                                                        <option disabled selected>Relationship</option>
                                                        <option value="brother">Brother</option>
                                                        <option value="sister">Sister</option>
                                                        <option value="friend">Friend</option>
                                                        <option value="son">Son</option>
                                                        <option value="daughter">Daughter</option>
                                                    </select>

                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="col-12">
                                            <button @click="addNewSurvivedByField"
                                                style="font-size: 11px;border-style: dotted;"
                                                class="btn btn-light border-dark fw-bold text-dark w-100 ">
                                                click here to new line
                                                <i class="bi bi-plus-circle-dotted"></i>
                                            </button>
                                        </div> -->
                                    </div>
                                </div>

                                <hr>

                                <div class="row justify-content-center g-3">
                                    <label class="form-label">Display Photo:</label>
                                    <div class="col-md-3 order-2 order-md-1 d-flex justify-content-center">
                                        <div class="image-circle"
                                            :style="{ backgroundImage: `url(${form.photo_path})` }">
                                        </div>
                                        <!-- <div class="image-circle"></div> -->

                                    </div>
                                    <div class="col-md-8 order-1 order-md-2">
                                        <div class="dropzone" v-bind="getRootProps()">
                                            <div class="text-center small">
                                                <div><i class="bi bi-image color-theme"></i></div>
                                                <div><span class="color-theme">Click to replace</span> or drag and
                                                    drop
                                                </div>
                                                <!-- <div class="fw-light">SVG, PNG, JPG or GIF (max. 400 x 400px)</div> -->
                                            </div>
                                            <input v-bind="getInputProps()" />
                                        </div>
                                    </div>

                                </div>
                                <hr>
                                <div class="col-12 ">
                                    <div class="col-md-4 float-md-end">
                                        <div v-if="!authStore.emailVerified" class="small text-danger text-center">
                                            verify email first!
                                        </div>
                                        <button :disabled="!authStore.emailVerified" v-if="!form.isSaving"
                                            @click="saveForm" class="btn btn-theme w-100">Save</button>
                                        <button v-else class="btn btn-theme w-100" type="button" disabled>
                                            <span class="spinner-border spinner-border-sm" role="status"
                                                aria-hidden="true"></span>
                                            Saving...
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <deceasedLinkModal :link="''" />
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions';
// @ts-ignore
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useDropzone } from "vue3-dropzone";
import api from '@/stores/Helpers/axios'
import { useAuthStore } from '@/stores/authStore';
import { useAppVariables } from '@/stores/appVariables';
import deceasedLinkModal from '@/components/modals/deceasedLinkModal.vue';

const authStore = useAuthStore()
const appVar = useAppVariables()

const form = reactive({
    deceased: '',
    birth_date: new Date(),
    death_date: new Date(),
    biography: '',
    display_photo: '',
    photo_path: '',
    survivedBys: [{ survived_by: '', relationship: 'friend' }],
    isSaving: false
    // life_history: ''
})

watch(() => form.birth_date, () => {
    if (new Date(form.birth_date) > new Date(form.death_date)) {
        form.death_date = new Date(form.birth_date)
    }
})

function addNewSurvivedByField() {
    form.survivedBys.push({
        survived_by: '',
        relationship: 'friend',
    })
}

const { getRootProps, getInputProps, ...rest } = useDropzone({
    onDrop: (acceptedFiles) => {
        const requiredFormats = ['png', 'jpg', 'jpeg', 'svg']
        if (!useFxn.isExtension(acceptedFiles[0].name, requiredFormats)) {
            useFxn.toast('Please upload an image', 'warning');
            return;
        }

        const file = acceptedFiles[0];
        form.photo_path = file;

        const reader = new FileReader();
        reader.onload = (e: any) => {
            form.photo_path = e.target.result; // Set preview to DataURL
        };
        reader.readAsDataURL(file);

        form.display_photo = acceptedFiles[0]
    }
});

function saveForm() {
    if (!form.deceased) {
        useFxn.toast('Name of Deceased required', 'warning')
        return;
    }

    if (!form.biography) {
        useFxn.toast('Biography required', 'warning')
        return;
    }

    if (!form.display_photo) {
        useFxn.toast('Please add a photo', 'warning')
        return;
    }

    const filledSurvivedBys = form.survivedBys.filter(x => x.survived_by.trim() !== '')

    const newForm = new FormData();
    newForm.append('deceased', form.deceased)
    newForm.append('biography', form.biography)
    newForm.append('display_photo', form.display_photo)
    newForm.append('birth_date', new Date(form.birth_date).toISOString())
    newForm.append('death_date', new Date(form.death_date).toISOString())
    if (filledSurvivedBys.length)
        newForm.append('survivedBys', JSON.stringify(filledSurvivedBys))

    sendformToAPI(newForm)
}

async function sendformToAPI(newForm: FormData) {
    form.isSaving = true;
    try {
        const resp = await api.userUploadDeceased(newForm)
        if (resp.status == 202) {
            useFxn.toast('Seems you have uploaded this exact name before!', 'error')
            return
        }

        useFxn.toast('Uploaded Successfully', 'success')
        form.deceased = ''
        form.biography = ''
        form.survivedBys = [{ survived_by: '', relationship: 'friend' }]
        form.photo_path = ''
        form.display_photo = ''
        form.birth_date = new Date()
        form.death_date = new Date()

    } catch (error) {
        console.log(error);
    }
    finally {
        form.isSaving = false

    }

}

</script>



<style lang="css" scoped>
.image-circle {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background-color: var(--bs-light-bg-subtle);
    border: 1px solid #e8e5e5;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}


.dropzone {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 5px;
    border: 2px dashed var(--bs-dark-bg-subtle);
    background-color: var(--bs-light);
    transition: 0.3s ease all;
    color: rgb(170, 164, 164);
    cursor: pointer;
    border-radius: 10px;
}

/* .dropzone input {
    display: none;
} */

.active-dropzone {
    color: #fff;
    border-color: #fff;
    background-color: #41b883;
}
</style>
