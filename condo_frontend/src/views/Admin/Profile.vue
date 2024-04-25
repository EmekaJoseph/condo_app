<template>
    <div class="container mt-5 animate__animated animate__fadeIn">

        <!-- Nav tabs -->
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1" type="button"
                    role="tab" aria-controls="tab1" aria-selected="true">

                    <i class="bi bi-clock-history"></i> Upload History ({{ paginate.totalRecords }})
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button"
                    role="tab" aria-controls="tab2" aria-selected="false">
                    <i class="bi bi-gear"></i> Settings
                </button>
            </li>
            <!-- <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3" type="button"
                    role="tab" aria-controls="tab3" aria-selected="false">
                    tab3
                </button>
            </li> -->
        </ul>

        <!-- Tab panes -->
        <div class="tab-content pt-4">
            <div class="tab-pane active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">

                <div class="row justify-content-center min-vh-100 g-3">
                    <div class="col-md-12">
                        <PageLoadingComponent v-if="isLoading" />
                        <div class="card min-vh-100">
                            <div class="card-header border-0 fw-bold">
                                <span v-if="list.length" class="float-en fw-bold">
                                    <span class="fw-lighter">Showing page</span>
                                    {{ paginate.currentPage }}/{{ paginate.totalPages }}
                                </span>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12 mb-3">
                                        <div class="col-md-6 col-lg-4 float-lg-end ">
                                            <div class="input-group bg-white">
                                                <input @input="onInputFunction()" v-model="searchString" type="text"
                                                    name="name" id="name" class="form-control border-end-0"
                                                    placeholder="search here.." aria-describedby="suffixId" />
                                                <span class="input-group-text bg-white">
                                                    <i class="bi bi-search"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="!list.length" class="text-center">No data history</div>
                                <div v-else>
                                    <div class="row g-3">
                                        <div class="col-12">
                                            <div class="table-responsive">
                                                <table class="table table-sm table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>S/N</th>
                                                            <th>NAME</th>
                                                            <th>BIRTH DATE</th>
                                                            <th>DEATH DATE</th>
                                                            <th>DATE UPLOADED</th>
                                                            <th>POSTED BY</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(record, index) in list" :key="record.id">
                                                            <th>{{ (index + 1) }}</th>
                                                            <td>{{ record.deceased }}</td>
                                                            <td>{{ useFxn.dateDisplay(record.birth_date) }}</td>
                                                            <td>{{ useFxn.dateDisplay(record.death_date) }}</td>
                                                            <td>{{ useFxn.dateDisplay(record.created_at) }}</td>
                                                            <td>{{ record.admin.email }}</td>
                                                            <td>
                                                                <button class="btn btn-outline-dark btn-sm border-0">
                                                                    <i class="bi bi-pencil"></i>
                                                                </button>
                                                                <button @click="deleteRecord(record.id)"
                                                                    class="btn btn-outline-danger btn-sm border-0">
                                                                    <i class="bi bi-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- pagination -->
                                    <div class="mt-5" v-if="list.length">
                                        <customPagination :currentPage="paginate.currentPage"
                                            :perPage="paginate.perPage" :totalRecords="paginate.totalRecords"
                                            @moveToNext="paginateToNext" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                <div class="row justify-content-center min-vh-100 g-3">

                </div>
            </div>
            <!-- <div class="tab-pane" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                <div class="row justify-content-center min-vh-100 g-3">
                    Tab 3
                </div>
            </div> -->
        </div>




    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions';
import api from '@/stores/Helpers/axios'
import customPagination from '@/components/customPagination.vue'

const list = ref<any>([])
const isLoading = ref(false)

// pagination
const paginate = reactive({
    currentPage: 0,
    totalPages: 0,
    perPage: 0,
    totalRecords: 0
})

function paginateToNext(page: any) {
    window.scrollTo(0, 0)
    loadHistory(page)
}

onMounted(() => {
    loadHistory()
})

async function loadHistory(page = 1) {
    // isLoading.value = true;
    const resp = await api.userUploads(searchString.value, page)
    list.value = resp.data.data
    paginate.currentPage = resp.data.current_page;
    paginate.totalPages = resp.data.last_page;
    paginate.perPage = resp.data.per_page;
    paginate.totalRecords = resp.data.total
    isLoading.value = false;
}

function deleteRecord(id: string | number) {
    useFxn.confirmDelete('The Entire Record will be deleted?', 'Yes. Delete')
        .then(async (answer) => {
            if (answer.value === true) {
                try {
                    await api.userDeleteDeceased(id)
                    useFxn.toast('Record deleted', 'success')
                    loadHistory()
                } catch (error) {

                }
            }
        })
}

// searching
const searchString = ref('')
const onInputFunction = useFxn.debounce(loadHistory, 300);


</script>

<style lang="css" scoped>
@import '@/assets/styles/table-mobile-responsive.css';

.nav-link,
.nav-item .active {
    border: none !important;
    background: transparent;
    color: inherit;
}

.nav-item .active {
    border-bottom: 1px solid var(--theme-color) !important;
    color: var(--theme-color) !important;
}
</style>