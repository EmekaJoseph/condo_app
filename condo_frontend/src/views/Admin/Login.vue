<template>
    <div class="container">
        <div class="everything-center">
            <div class="col-12 col-md-4 animate__animated animate__fadeIn">
                <div class="card shadow-sm">
                    <h5 class="card-header text-center border-0 p-3 color-theme fw-bolder">Condonote
                        <span class="fw-lighter text-black">| Login</span>
                    </h5>
                    <div class="card-body py-4">
                        <div class="row g-3">
                            <div class="col-12">
                                <input type="text" class="form-control" placeholder="enter email...">
                            </div>
                            <div class="col-12">
                                <input type="password" class="form-control" placeholder="enter password...">
                            </div>
                            <div class="col-12">
                                <button class="btn btn-theme w-100">Login
                                    <i class="bi bi-chevron-right"></i>
                                </button>
                            </div>
                            <h6 class="text-center mt-5">
                                <router-link class=" color-theme" to="/register">I dont have an
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
