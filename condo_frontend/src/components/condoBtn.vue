<template>
    <div class="fixed-bottom-btn">
        <div @click="appVar.toggleCondoModal()" class="justify-content-end floatPanel">
            <div class="card btnCard shadow">
                <div><i class="bi bi-pencil"></i></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAppVariables } from '@/stores/appVariables';
const appVar = useAppVariables()
</script>

<style scoped>
.fixed-bottom-btn {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 999;
}


.floatPanel {
    margin-bottom: 60px;
    padding-right: 24px;
    display: flex;
    z-index: 999;
    position: relative;
    transition: all ease-in-out 0.4s;
    font-size: 11px;
}

.btnCard {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.43rem;
    color: #fff;
    background-color: var(--theme-color);
    cursor: pointer;
}

@media (min-width: 979px) {
    .floatPanel {
        margin-bottom: 250px;
    }
}
</style>