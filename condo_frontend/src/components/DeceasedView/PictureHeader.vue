<template>
    <div class="col-12 sticky-top">
        <div class="card border-0 position-relative">
            <div class="cover-photo ">
                <div class="transparent-layer">
                    <div class="float-end">
                        <h3 class="m-3 mb-0 text-white text-capitalize fw-bold">{{ details.deceased }}</h3>
                        <span class="float-end m-0 me-3 text-white">
                            ({{ new Date(details.birth_date).getFullYear() }} -
                            {{ new Date(details.death_date).getFullYear() }})
                        </span>
                    </div>
                </div>
            </div>
            <img v-if="appVar.y_axis < 100" src="@/assets/images/dp_temp.png" alt="Profile Picture"
                class="profile-picture mx-auto ms-5 d-block bg-light animate__animated animate__slideInLeft animate__faster">
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAppVariables } from '@/stores/appVariables';
const appVar = useAppVariables()
defineProps(['details'])
</script>



<style lang="css" scoped>
.cover-photo {
    height: 150px;
    background: url('@/assets/images/hero.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    border-bottom: 4px solid var(--theme-color);
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
