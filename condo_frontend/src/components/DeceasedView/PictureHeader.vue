<template>
    <div class="col-12">
        <div class="card border-0 shadow-s position-relative">
            <div class="cover-photo">
                <div class="transparent-layer">
                    <div class="float-end">
                        <h3 class="m-3 mb-0 text-white text-capitalize fw-bold">{{ details.deceased }}</h3>
                        <span class="float-end m-0 me-3 text-white">
                            {{ `(${new Date(details.birth_date).getFullYear()} - ${new
                                Date(details.death_date).getFullYear()} )` }}
                        </span>
                    </div>
                </div>
            </div>
            <img src="@/assets/images/dp_temp.png" alt="Profile Picture"
                class="profile-picture mx-auto ms-5 d-block bg-light">
            <div class="card-body small">
                <!-- <div class="d-flex float-lg-end ">
                    <div class="me-lg-5 mt-5 mt-lg-0 mb-3">
                        <div class="fs-5 fw-lighter text-capitalize">{{ }}</div>
                        <div class="text-muted text-capitalize">
                            {{ }}
                        </div>
                    </div>
                    <div class="mt-5 mt-lg-0">
                        <router-link to="/user/settings" class="btn btn-primary-outline btn-sm">
                            <i class="bi bi-pencil"></i> Edit profile
                        </router-link>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const prop = defineProps(['details'])
</script>



<style lang="css" scoped>
.cover-photo {
    height: 150px;
    background: url('@/assets/images/hero.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

.transparent-layer {
    background-color: #000000a5;
    height: 100%
}

.profile-picture {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    position: absolute;
    top: 75px;
    border: 4px solid #fff;
}
</style>
