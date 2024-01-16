<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand color-theme" to="/">{{ appVar.appName }}</router-link>
        </div>
    </nav>

    <div class="container">
        <div class="everything-center">
            <div class="col-12 col-md-4 animate__animated animate__fadeIn">
                <div class="card shadow-sm">
                    <h5 class="card-header text-center border-0 p-3">
                        ACCOUNT LOGIN
                    </h5>
                    <div class="card-body py-4">
                        <div class="row g-3">
                            <div class="text-center text-danger">
                                Invalid Credentials!, Try again
                            </div>
                            <div class="col-12">
                                <label class="form-label">Email:</label>
                                <input type="text" class="form-control form-control-lg">
                            </div>
                            <div class="col-12">
                                <label class="form-label">Password:</label>
                                <input type="password" class="form-control form-control-lg">
                            </div>
                            <div class="col-12 mt-5">
                                <button v-if="!form.isLoading" @click="submitForm" class="btn btn-theme w-100 btn-lg">Login
                                    <i class="bi bi-chevron-right"></i>
                                </button>
                                <button v-else class="btn btn-theme w-100 btn-lg" type="button" disabled>
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                </button>

                            </div>
                            <h6 class="text-center mt-4">
                                <router-link class=" color-theme" to="/register">I dont have an
                                    account yet </router-link>
                            </h6>
                        </div>
                    </div>
                </div>

                <div class="text-center mt-5">
                    <router-link class="color-theme text-decoration-none" to="/">Go To Home</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useAppVariables } from '@/stores/appVariables';
import { useAuthStore } from '@/stores/authStore';
import api from '@/stores/Helpers/axios'

const appVar = useAppVariables()
const authStore = useAuthStore()

const form = reactive({
    email: '',
    password: '',
    isLoading: false,
    isInvalid: false
})

async function submitForm() {
    let resp = await api.userLogin(form)
}

</script>

<style  scoped></style>
