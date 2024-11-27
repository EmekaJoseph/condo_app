<template>
    <div class="bg-theme">
        <div class="container">
            <div class="everything-center overflow-hidden">
                <div class="col-12 col-md-4 animate__animated animate__slideInUp animate__faster">
                    <div class="card shadow-sm">
                        <h5 class="card-header text-center border-0 p-3 fw-bold">
                            CREATE NEW ACCOUNT
                        </h5>
                        <div class="card-body ">
                            <div class="row g-2">
                                <!-- <div class="col-12">
                                <label class="form-label">Firstname:</label>
                                <input type="text" class="form-control">
                            </div>
                            <div class="col-12">
                                <label class="form-label">Lastname:</label>
                                <input type="text" class="form-control">
                            </div> -->
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input id="email1" type="text" class="form-control form-control-float"
                                            placeholder="ss" />
                                        <label for="email1">Email:</label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input id="pass1" type="password" class="form-control form-control-float"
                                            placeholder="" />
                                        <label for="pass1">Create Password:</label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input id="pass2" type="password" class="form-control form-control-float"
                                            placeholder="" />
                                        <label for="pass2">Repeat Password:</label>
                                    </div>
                                </div>
                                <div class="col-12 mt-4">
                                    <button class="btn btn-theme w-100">Create Account
                                        <i class="bi bi-chevron-right"></i>
                                    </button>
                                </div>
                                <h6 class="text-center mt-4">
                                    Already have an account? <router-link class=" theme-color hover-tiltY" to="/login"
                                        replace>Login.
                                    </router-link>
                                </h6>
                            </div>
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
import { reactive } from 'vue';

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
