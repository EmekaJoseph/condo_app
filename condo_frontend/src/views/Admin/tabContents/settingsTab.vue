<template>
    <div class="container mt-5">

    </div>

</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions';
// @ts-ignore
// import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useDropzone } from "vue3-dropzone";
import api from '@/stores/Helpers/axios'
import { useAuthStore } from '@/stores/authStore';
import { useAppVariables } from '@/stores/appVariables';

// const authStore = useAuthStore()
const appVar = useAppVariables()

let formEmptyState = {
    deceased: '',
    biography: '',
    survivedBys: [{ survived_by: '', relationship: 'friend' }],
    photo_path: '',
    display_photo: '',
    birth_date: new Date(),
    death_date: new Date(),
    isSaving: false
}


const form = reactive(formEmptyState)

const relationships = [
    { name: 'Friend', value: 'friend' },
    { name: 'Brother', value: 'brother' },
    { name: 'Sister', value: 'sister' },
    { name: 'Son', value: 'son' },
    { name: 'Daughter', value: 'daughter' },
    { name: 'Father', value: 'father' },
    { name: 'Mother', value: 'mother' },
    { name: 'Relation', value: 'relation' },
]

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
            useFxn.toast('It seems you have uploaded this exact name before!', 'error')
            return
        }

        useFxn.toast('Uploaded Successfully', 'success')
        appVar.showDeceasedCopyModal(resp.data)
        Object.assign(form, formEmptyState);

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
