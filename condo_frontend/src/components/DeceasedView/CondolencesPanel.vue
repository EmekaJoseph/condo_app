<template>
    <div v-if="condolences && condolences.length" class="">
        <ul class="list-group list-group-flush">
            <li v-for="condo in condolences" :key="condo" class="list-group-item bg-transparent fst-italic pe-lg-5">
                <div> "{{ condo.condolence }}" </div>
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
    <div v-else class="fst-italic">
        No Condolences, click on the <b>icon: </b> <i class="bi bi-pencil small"></i> to add yours.
    </div>
</template>

<script setup lang="ts">
defineProps(['condolences'])
</script>