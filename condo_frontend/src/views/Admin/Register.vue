<template>
    <div class="bg-theme">
        <div class="container">
            <div class="everything-center overflow-hidden">
                <div class="col-12 col-md-4 animate__animated animate__flipInY">
                    <div class="card shadow-sm">
                        <h5 class="card-header text-center border-0 p-3">
                            <i class="bi bi-person-fill-check"></i> CREATE NEW ACCOUNT
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
                                <h6 class="text-center mt-4 hover-tiltX">
                                    <router-link class=" color-theme" to="/login" replace>I already have an
                                        account yet </router-link>
                                </h6>
                            </div>
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
