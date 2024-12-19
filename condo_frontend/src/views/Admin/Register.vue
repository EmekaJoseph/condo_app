<template>
    <div class="bg-theme">
        <div class="container py-lg-2">
            <div class="everything-center overflow-hidden">
                <div class="col-12 col-lg-4 animate__animated animate__slideInUp animate__faster">
                    <div class="card shadow-sm">
                        <h5 class="card-header text-center border-0 p-3 fw-bold">
                            CREATE NEW ACCOUNT
                        </h5>
                        <div class="card-body ">
                            <form @submit.prevent="submitForm" class="row g-3">
                                <div v-html="form.errorMessage"></div>

                                <div class="col-12">
                                    <div class="form-floating">
                                        <input v-model="form.email" id="email1" type="text"
                                            class="form-control form-control-float" placeholder="ss" />
                                        <label for="email1">Email:<span class="text-danger xsmall">*</span></label>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-floating">
                                        <input v-model="form.name" id="first1" type="text"
                                            class="form-control form-control-float" placeholder="" />
                                        <label for="first1">Name:</label>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="position-relative">
                                        <div class="form-floating">
                                            <input v-model="form.password" id="pass1" :type="form.passWordType"
                                                class="form-control form-control-float" placeholder="" />
                                            <label for="pass1">Password:<span
                                                    class="text-danger xsmall">*</span></label>
                                            <i @click="togglePasswordType" class="bi toggle-icon"
                                                :class="form.passWordType == 'password' ? 'bi-eye-slash' : 'bi-eye'"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input v-model="form.password2" id="pass2" type="password"
                                            class="form-control form-control-float" placeholder="" />
                                        <label for="pass2">Repeat Password:<span
                                                class="text-danger xsmall">*</span></label>
                                    </div>
                                </div>
                                <div class="col-12 mt-4">
                                    <button v-if="!form.isSaving" type="submit"
                                        class="btn btn-theme w-100 btn-lg">Create Account
                                        <i class="bi bi-chevron-right"></i>
                                    </button>
                                    <button v-else class="btn btn-theme w-100 btn-lg" type="button" disabled>
                                        <span class="spinner-border spinner-border-s" role="status"
                                            aria-hidden="true"></span>
                                    </button>
                                </div>
                                <h6 class="text-center mt-4 ">
                                    Already have an account? <router-link class=" theme-color hover-tiltY" to="/login"
                                        replace>Login.
                                    </router-link>
                                </h6>
                            </form>
                        </div>
                    </div>
                    <!-- <div class="text-center mt-4">
                        <router-link class="text-white " to="/">Home page</router-link>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions';
import api from '@/stores/Helpers/axios'
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';


const authStore = useAuthStore()
const router = useRouter()

const form = reactive<{
    email: string,
    password: string,
    password2: string,
    name: string,
    isSaving: boolean,
    passWordType: 'text' | 'password',
    errorMessage: string,
}>({
    email: '',
    password: '',
    password2: '',
    name: '',
    isSaving: false,
    passWordType: 'password',
    errorMessage: ''
})

function togglePasswordType() {
    form.passWordType = form.passWordType == 'password' ? 'text' : 'password'
}

const showErrorMsg = (text: string) => {
    const div = `<div class='alert alert-danger border-0 p-2 m-0 text-center'>${text} </div>`
    form.errorMessage = div
}



async function submitForm() {
    form.errorMessage = ''

    if (!form.email || !form.password || !form.password2) {
        showErrorMsg('Compulsory fields are empty!')
        return;
    }

    if (!useFxn.isValidEmail(form.email)) {
        showErrorMsg('Please enter a valid email')
        return;
    }


    if (form.password !== form.password2) {
        showErrorMsg('Passwords do not match!')
        return;
    }

    if (form.password.length < 6) {
        showErrorMsg('Password must be at least 6 characters!')
        return;
    }

    form.isSaving = true
    try {
        const resp = await api.userRegister(form)
        authStore.login(resp.data.token)
        router.push({ name: 'Dashboard' })
    } catch (error: any) {

        if (error.response && error.response.status === 422) {
            showErrorMsg(error.response.data.message)
            return;
        }
    }
    finally {
        form.isSaving = false
    }
}




</script>

<style scoped>
.bg-theme {
    position: relative;
    background: url('@/assets/images/hero.jpg');
    background-size: cover;
    background-position: center center;
    z-index: 0;
}

.bg-theme::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.566);
    /* Adjust opacity and color */
    z-index: -1;
    /* Keep it behind content */
}




.toggle-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-right: 15px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #6c757d;
}
</style>
