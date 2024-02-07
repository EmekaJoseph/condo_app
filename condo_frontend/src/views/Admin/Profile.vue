<template>
    <div class="container mt-5 animate__animated animate__fadeIn">
        <div class="row justify-content-center min-vh-100 g-3">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header border-0 fw-bold">My Profile</div>
                    <div class="card-body">
                        {{ profile }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions';
import { useAuthStore } from '@/stores/authStore';

const profile = useAuthStore()

</script>



<style lang="css" scoped></style>
