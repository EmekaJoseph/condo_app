<template>
    <div class="container mt-5 animate__animated animate__fadeIn">
        <div class="row justify-content-center min-vh-100 g-3">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header border-0 fw-bold">Post a memorial</div>
                    <div class="card-body">
                        <div class="row g-3">
                            <div class="col-lg-6 px-lg-4">
                                <div class="row g-3">
                                    <div class="col-12">
                                        <label class="form-label">Deceased name:</label>
                                        <input type="text" class="form-control" placeholder="enter name..">
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
                                            :min-date="form.birth_date" :max-date="new Date()" :enable-time-picker="false"
                                            auto-apply v-model="form.death_date">
                                        </VueDatePicker>
                                    </div>

                                    <div class="col-12" style="margin-bottom: 100px; height:200px">
                                        <label class="form-label">Biography:</label>
                                        <QuillEditor v-model:content="form.biography" contentType="html" toolbar="minimal"
                                            placeholder="enter here.." />
                                    </div>


                                    <!-- <div class="col-12">
                                        <div class="col-md-4 float-end">
                                            <button class="btn btn-theme w-100">Save</button>
                                        </div>
                                    </div> -->

                                </div>
                            </div>
                            <div class="col-lg-6 px-lg-4">
                                <label class="form-label mb-3">Survived by:</label>
                                <div class="card">
                                    <div class="card-body">
                                        <div v-for="(item, index) in form.survivedBys" :key="item.survived_by"
                                            class="col-12 bg-light mb-2 p-2">
                                            <div class="row g-3">
                                                <div class="col-md-6">
                                                    <input v-model="item.survived_by" type="text"
                                                        class="form-control form-control-sm" placeholder="enter name..">
                                                </div>
                                                <div class="col-9 col-md-4">
                                                    <select v-model="item.relationship" class="form-select form-select-sm">
                                                        <option disabled selected>Relationship</option>
                                                        <option value="brother">Brother</option>
                                                        <option value="sister">Sister</option>
                                                        <option value="friend">Friend</option>
                                                        <option value="son">Son</option>
                                                        <option value="daughter">Daughter</option>
                                                    </select>

                                                </div>
                                                <div class="col-3 col-md-2">
                                                    <button @click="removeSurvivedByIndex(index)"
                                                        v-if="form.survivedBys.length > 1"
                                                        class="btn-sm btn btn-outline-danger bg-danger-subtle border-0 w-100">
                                                        <i class="bi bi-x-lg"></i>
                                                    </button>
                                                    <!-- <button v-else disabled
                                                        class="btn-sm btn btn-outline-danger bg-danger-subtle border-0 w-100">
                                                        <i class="bi bi-x-lg"></i>
                                                    </button> -->
                                                </div>

                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <button @click="addNewSurvivedByField" style="font-size: 11px;"
                                                class="btn btn-outline-secondary float-end ">
                                                add new line
                                                <i class="bi bi-chevron-down"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <hr class="faint">

                                <div class="row g-3">
                                    <label class="form-label">Display Photo:</label>
                                    <div class="col-md-3">
                                        <div class="image-circle" :style="{ backgroundImage: `url(${form.photo_path})` }">
                                        </div>
                                        <!-- <div class="image-circle"></div> -->

                                    </div>
                                    <div class="col-md-8">
                                        <div class="dropzone" v-bind="getRootProps()">
                                            <div class="text-center small">
                                                <div><i class="bi bi-image them-color"></i></div>
                                                <div><span class="theme-color">Click to replace</span> or drag and drop
                                                </div>
                                                <!-- <div class="fw-light">SVG, PNG, JPG or GIF (max. 400 x 400px)</div> -->
                                            </div>
                                            <input v-bind="getInputProps()" />
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header border-0 fw-bold">My History</div>
                    <div class="card-body">
                        xx
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions';
// @ts-ignore
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useDropzone } from "vue3-dropzone";


const form = reactive({
    deceased: '',
    birth_date: new Date(),
    death_date: new Date(),
    biography: '',
    display_photo: '',
    photo_path: '',
    survivedBys: [{
        survived_by: '',
        relationship: 'friend'
    }],
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

function removeSurvivedByIndex(index: any) {
    form.survivedBys.splice(index, 1);
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

</script>



<style lang="css" scoped>
.image-circle {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background-color: var(--theme-color-soft);
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
    border: 2px dashed var(--bs-secondary);
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
