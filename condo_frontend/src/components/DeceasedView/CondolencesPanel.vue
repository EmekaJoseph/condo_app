<template>
    <div v-if="condolences" class="">
        <ul class="list-group list-group-flush">
            <li v-for="condo in condolences" :key="condo" class="list-group-item bg-transparent fst-italic">
                <div>
                    {{ condo.condolence }}
                </div>
                <div>
                    <i class="bi bi-dash"></i>
                    <span class="fw-bolder">
                        {{ condo.condo_name }}
                        <span class="fw-normal"> {{ condo.relationship ? '(' + condo.relationship + ')' : '' }}</span>
                    </span>
                </div>
            </li>
        </ul>
    </div>
    <div v-else class="fst-italic">No Condolences</div>
</template>

<script setup lang="ts">
import useFxn from "@/stores/Helpers/useFunctions";
defineProps(['condolences'])
</script>