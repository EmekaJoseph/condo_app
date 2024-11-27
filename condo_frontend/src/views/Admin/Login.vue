<template>
    <div class="bg-theme">
        <div class="container">
            <div class="everything-center overflow-hidden">
                <div class="col-12 col-md-4 animate__animated animate__slideInDown animate__faster">
                    <div class="card">
                        <h5 class="card-header text-center border-0 p-3 fw-bold">
                            ACCOUNT LOGIN
                        </h5>
                        <div class="card-body">
                            <form @submit.prevent="submitForm" class="row g-3">
                                <div v-html="form.invalidText"></div>

                                <div class="col-12">
                                    <div class="form-floating">
                                        <input v-model="form.email" id="email1" type="text"
                                            class="form-control form-control-float" placeholder="" />
                                        <label for="email1">Email:</label>
                                    </div>
                                </div>
                                <div class="col-12">

                                    <div class="position-relative">
                                        <div class="form-floating">
                                            <input v-model="form.password" id="pass1" :type="form.passWordType"
                                                class="form-control form-control-float" placeholder="" />
                                            <label for="pass1">Password:</label>
                                            <span @click="togglePasswordType">
                                                <i v-if="form.passWordType == 'password'"
                                                    class="bi bi-eye toggle-icon"></i>
                                                <i v-else class="bi bi-eye-slash toggle-icon"></i>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-12 mt-4">
                                    <button v-if="!form.isLoading" type="submit"
                                        class="btn btn-theme w-100 btn-lg">Login
                                        <i class="bi bi-chevron-right"></i>
                                    </button>
                                    <button v-else class="btn btn-theme w-100 btn-lg" type="button" disabled>
                                        <span class="spinner-border spinner-border-sm" role="status"
                                            aria-hidden="true"></span>
                                    </button>

                                </div>
                                <h6 class="text-center mt-4 hover-tiltX">
                                    <router-link class=" theme-color" to="/register" replace>I dont have an
                                        account yet </router-link>
                                </h6>
                            </form>
                        </div>
                    </div>

                    <div class="text-center mt-4">
                        <router-link class="text-white " to="/">Home page</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
import { useAppVariables } from '@/stores/appVariables';
import { useAuthStore } from '@/stores/authStore';
import useFxn from '@/stores/Helpers/useFunctions';
import api from '@/stores/Helpers/axios'

const appVar = useAppVariables()
const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
    email: '',
    password: '',
    isLoading: false,
    invalidText: '',
    passWordType: 'password'
})

function togglePasswordType() {
    form.passWordType = form.passWordType == 'password' ? 'text' : 'password'
}


const showErrorMsg = (text: string) => {
    const div = `<div class='alert alert-danger border-0 p-2 m-0 rounded-0 text-center'>${text} </div>`
    form.invalidText = div
}

async function submitForm() {
    form.invalidText = ''

    if (!form.email || !form.password) {
        showErrorMsg('Please complete fields!')
        return;
    }

    if (!useFxn.isValidEmail(form.email)) {
        showErrorMsg('Please enter a valid email')
        return;
    }

    form.isLoading = true
    try {
        const resp = await api.userLogin(form)
        authStore.login(resp.data.token)
        router.push({ name: 'Dashboard' })
    } catch (error: any) {
        console.log(error);

        if (error.response && error.response.status === 401) {
            showErrorMsg('Email or Password is incorrect!')
            return;
        }
    }
    finally {
        form.isLoading = false
    }
}

</script>

<style scoped>
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