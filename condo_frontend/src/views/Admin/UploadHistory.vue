<template>
    <PageLoadingComponent v-if="isLoading" />
    <div class="container mt-5 animate__animated animate__fadeIn">
        <div class="row justify-content-center min-vh-100 g-3">
            <div class="col-md-12">
                <div class="card min-vh-100">
                    <div class="card-header border-0 fw-bold">History
                        <span class="float-end small fw-light">
                            showing page {{ paginate.currentPage }}/{{ paginate.totalPages }}
                        </span>
                    </div>
                    <div v-if="!list.length" class="card-body">
                        <div class="text-center">No data history</div>
                    </div>
                    <div v-else class="card-body">
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

                        <!-- pagination -->
                        <div class="mt-5" v-if="list.length">
                            <customPagination :currentPage="paginate.currentPage" :perPage="paginate.perPage"
                                :totalRecords="paginate.totalRecords" @moveToNext="paginateToNext" />
                        </div>
                    </div>
                </div>
            </div>

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
    isLoading.value = true;
    const resp = await api.userUploads(page)
    paginate.currentPage = resp.data.current_page;
    paginate.totalPages = resp.data.last_page;
    paginate.perPage = resp.data.per_page;
    paginate.totalRecords = resp.data.total
    list.value = resp.data.data
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
</script>

<style lang="css" scoped>
@import '@/assets/styles/table-mobile-responsive.css';
</style>