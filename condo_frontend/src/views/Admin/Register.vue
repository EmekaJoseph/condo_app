<template>
    <div class="container">
        <div class="everything-center">
            <div class="col-12 col-md-4 animate__animated animate__fadeIn">
                <div class="card shadow-sm">
                    <h5 class="card-header text-center border-0 p-3 color-theme fw-bolder">Condonote
                        <span class="fw-lighter text-black">| Register</span>
                    </h5>
                    <div class="card-body py-4">
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
                                <label class="form-label">Email:</label>
                                <input type="text" class="form-control">
                            </div>
                            <div class="col-12">
                                <label class="form-label">Create a Password:</label>
                                <input type="password" class="form-control">
                            </div>
                            <div class="col-12">
                                <label class="form-label">Re-enter Password:</label>
                                <input type="password" class="form-control">
                            </div>
                            <div class="col-12">
                                <button class="btn btn-theme w-100">Create Account
                                    <i class="bi bi-chevron-right"></i>
                                </button>
                            </div>
                            <h6 class="text-center mt-5">
                                <router-link class=" color-theme" to="/login">I already have an
                                    account yet </router-link>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="css" scoped></style>
