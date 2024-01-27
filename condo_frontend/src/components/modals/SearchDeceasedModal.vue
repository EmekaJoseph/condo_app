<template>
    <div>
        <!-- Modal trigger button -->
        <button ref="openModal_search" class="btn d-none" data-bs-toggle="modal" data-bs-target="#searchModal">
        </button>

        <div class="modal fade" id="searchModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
            role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-heade p-3  bg-theme border-0">
                        <h5 class="modal-title text-white fw-bold text-center">{{ appVar.appName }}.</h5>
                        <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                    </div>
                    <div class="modal-body rounded-0">

                        <div class="input-group mb-3 border-5">
                            <label class="input-group-text bg-transparent text-muted border-end-0 pe-0 "><i
                                    class="bi bi-search"></i></label>

                            <input @input="onInputFunction" v-model="form.searchStr" type="text"
                                class="form-control form-control-lg border-start-0" placeholder="search by name.."
                                aria-label="Button" aria-describedby="" />
                        </div>

                        <div v-if="form.searchStr" class="col-12">
                            <div class="card bg-light-subtle">
                                <div class="card-body  results-card">
                                    <div v-if="!form.isSearching">
                                        <ul v-if="form.searchResults.length" class="list-group list-group-flush">
                                            <li v-for="(item, index) in form.searchResults" @click="gotToDeceasedPage(item)"
                                                class="list-group-item ps-0 text-capitalize cursor-pointer">
                                                <span class="fw-bold color-theme me-2">{{ item.deceased }}</span>
                                                ({{ new Date(item.birth_date).getFullYear() }} -
                                                {{ new Date(item.death_date).getFullYear() }})
                                            </li>
                                        </ul>
                                        <div v-else class="text-muted text-center pt-4">
                                            No results found.
                                        </div>
                                    </div>
                                    <div v-else>
                                        <spinnerLoadingComponent />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer border-0">
                        <button ref="closeModal_search" type="button" class="btn" data-bs-dismiss="modal">
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
import useFxn from '@/stores/Helpers/useFunctions';
import spinnerLoadingComponent from '@/components/spinnerLoadingComponent.vue';

const appVar = useAppVariables()
const router = useRouter()
const openModal_search = ref<any>(null)
const closeModal_search = ref<any>(null)

const form = reactive<any>({
    searchStr: '',
    isSearching: true,
    searchResults: [],
})

const onInputFunction = useFxn.debounce(search, 300);

async function search() {
    if (form.searchStr) {
        try {
            form.isSearching = true
            let resp = await api.search(form.searchStr)
            form.searchResults = resp.data
            form.isSearching = false
        } catch (error) {
            // form.isSearching = false
        }
    }
}

function gotToDeceasedPage(item: any) {
    const name = item.deceased.split(' ').join('-')
    closeModal_search.value.click()
    router.push({
        path: `/condo/${item.id}/${name}`,
    })
}


watch(() => appVar.searchModal, () => {
    openModal_search.value.click()
});

onBeforeRouteLeave(() => {
    closeModal_search.value.click()
});
</script>

<style  scoped>
.results-card {
    height: 300px;
    overflow-y: auto;
}
</style>