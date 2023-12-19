<template>
    <div>
        <!-- Modal trigger button -->
        <button ref="openModal" class="btn d-none" data-bs-toggle="modal" data-bs-target="#searchModal">
        </button>

        <div class="modal fade" id="searchModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
            role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <!-- <h5 class="modal-title">Search by name</h5> -->
                        <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                    </div>
                    <div class="modal-body rounded-0">

                        <!-- <div class="input-group mb-3 border-5">
                            <input type="text" class="form-control form-control-lg border-end-0" placeholder=""
                                aria-label="Button" aria-describedby="" />
                            <button class="btn btn-outline-secondary border-start-0 bg-transparent" type="button" id="">
                                <i class="bi bi-search"></i>
                            </button>
                        </div> -->


                        <form @submit.prevent="search" class="row g-3 justify-content-center">
                            <div class="col-12">
                                <input v-model="form.searchStr" type="text" class="form-control form-control-lg"
                                    placeholder="enter name">
                            </div>
                            <div class="col-12">
                                <button v-if="!form.isSearching" type="submit" class="btn theme-btn w-100 btn-lg">
                                    Search by name <i class="bi bi-search"></i>
                                </button>
                                <button v-else disabled class="btn theme-btn w-100 btn-lg">
                                    Searching..
                                </button>
                            </div>

                            <div v-if="form.isSearched" class="col-12">
                                <div class="card">
                                    <div class="card-body bg-light-subtle results-card">
                                        <ul v-if="form.searchResults.length" class="list-group list-group-flush">
                                            <li v-for="(item, index) in form.searchResults" @click="gotToDeceasedPage(item)"
                                                class="list-group-item ps-0 text-capitalize cursor-pointer">
                                                <span class="fw-bold theme-color me-2">{{ item.deceased }}</span>
                                                ({{ new Date(item.birth_date).getFullYear() }} - {{ new
                                                    Date(item.death_date).getFullYear() }})
                                            </li>
                                        </ul>
                                        <div v-else class="text-muted text-center pt-4">
                                            0 search results
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                    <div class="modal-footer border-0">
                        <button ref="closeModal" type="button" class="btn" data-bs-dismiss="modal">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { useAppVariables } from '@/stores/appVariables';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import api from "@/stores/Helpers/axios"

const appVar = useAppVariables()
const router = useRouter()
const openModal = ref<any>(null)
const closeModal = ref<any>(null)


const form = reactive<any>({
    searchStr: '',
    isSearching: false,
    isSearched: false,
    searchResults: []
})

async function search() {
    if (form.searchStr) {
        form.isSearching = true
        try {
            let resp = await api.search(form.searchStr)
            form.searchResults = resp.data
            form.isSearched = true
            form.isSearching = false

        } catch (error) {
            form.isSearching = false

        }
    }
}

function gotToDeceasedPage(item: any) {
    const name = item.deceased.split(' ').join('-')
    closeModal.value.click()
    router.push({
        path: `/deceased/${item.id}/${name}`,
    })
}


watch(() => appVar.searchModal, () => {
    openModal.value.click()
});

onBeforeRouteLeave(() => {
    closeModal.value.click()
});
</script>

<style  scoped>
.modal-content {
    border-bottom: 5px solid var(--theme-color);
}

.results-card {
    height: 200px;
    overflow-y: auto;
}
</style>