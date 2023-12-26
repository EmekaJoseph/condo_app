<template>
    <div v-if="condolences" class="">
        <ul class="list-group list-group-flush">
            <li v-for="condo in condolences" :key="condo" class="list-group-item bg-transparent fst-italic">
                <div>
                    "{{ condo.condolence }}"
                </div>
                <div>
                    <i class="bi bi-dash"></i>
                    <span>
                        <span class="fw-bolder">{{ condo.condo_name }}</span>
                        <span class="fw-normal ms-1"> {{ condo.relationship ? '(' + condo.relationship + ')' : '' }}</span>
                        <span class="small text-muted float-end">{{ condo.created }}</span>
                    </span>
                </div>
            </li>
        </ul>
    </div>
    <div v-else class="fst-italic">No Condolences</div>
</template>

<script setup lang="ts">
defineProps(['condolences'])
</script>