<template>
    <div class="row g-3">
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-header border-0 text-capitalize">
                    Late <span class="fw-bold">{{ details.deceased }}</span>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item px-0">
                            <span class="fw-bold">Born: </span>
                            <span>{{ useFxn.dateDisplay(details.birth_date) }}</span>
                        </li>
                        <li class="list-group-item px-0">
                            <span class="fw-bold">Died: </span>
                            <span>{{ useFxn.dateDisplay(details.death_date) }}</span>
                        </li>
                        <li class="list-group-item px-0">
                            <span class="fw-bold">Aged: </span>
                            <span>{{ details.age }} years</span>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-header fw-bold border-0">
                    Biography & History
                </div>
                <div class="card-body">
                    <p v-html="details.biography ?? ''"></p>
                    <p v-html="details.life_history ?? ''"></p>
                </div>
            </div>
        </div>
        <div v-if="details?.survived_bys?.length" class="col-12">
            <div class="card shadow-sm">
                <div class="card-header fw-bold border-0">
                    Survied By
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li v-for="surv in details.survived_bys" class="list-group-item px-0">
                            {{ surv.survived_by }} {{ surv.relationship ? '(' + surv.relationship + ')' : '' }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useFxn from "@/stores/Helpers/useFunctions";
defineProps(['details'])
</script>