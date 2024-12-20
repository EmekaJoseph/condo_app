<template>
    <div class="containe mt-3">
        <div class="row justify-content-center min-vh-100 g-3">
            <div class="col-md-12">
                <PageLoadingComponent v-if="isLoading" />
                <div v-else class="card min-vh-100 border-0">
                    <div v-show="list.length" class="card-header bg-white border-0 small">
                        <div class="d-lg-flex justify-content-start">
                            <div class="me-3 text-muted" v-if="list.length">
                                Showing
                                <span class="fw-bold">{{ paginate.currentPage }}/{{ paginate.totalPages }}</span>
                                pages
                            </div>
                            <!-- <div class="mt-3 mt-lg-0 d-flex justify-content-center">
                                <customPagination :currentPage="paginate.currentPage" :perPage="paginate.perPage"
                                    :totalRecords="paginate.totalRecords" @moveToNext="paginateToNext" />
                            </div> -->
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 mb-3">
                                <div class="col-md-6 col-lg-4 float-lg-end ">
                                    <div class="input-group bg-white">
                                        <input @input="onInputFunction()" v-model="searchString" type="text" name="name"
                                            id="name" class="form-control border-end-0" placeholder="search here.."
                                            aria-describedby="suffixId" />
                                        <span class="input-group-text bg-white">
                                            <i class="bi bi-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="!list.length" class="d-flex justify-content-center my-5">
                            <div>
                                <i class="bi bi-exclamation-circle text-muted" style="font-size: 4rem;"></i>
                                <div>No history</div>
                            </div>

                        </div>
                        <div v-else>
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="table-responsive table-mobile-responsiv ">
                                        <table class="table table-sm table-striped text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>NAME</th>
                                                    <th>EMAIL</th>
                                                    <th>JOINED</th>
                                                    <th class="text-center">UPLOADS</th>
                                                    <th>LEVEL</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(record, index) in list" :key="record.id">
                                                    <th>{{ (index + 1) }}</th>
                                                    <td> {{ record.name }} </td>
                                                    <td> {{ record.email }} </td>
                                                    <td>{{ useFxn.dateDisplay(record.created_at) }}</td>
                                                    <td class="text-center">{{ record.deceased_uploads }}</td>
                                                    <td>Level {{ record.level }}</td>
                                                    <td>
                                                        <button :disabled="record.id == authStore.profileData?.id"
                                                            @click="deleteRecord(record.id)"
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
                            <div class="mt-3 mt-lg-0 d-flex justify-content-center">
                                <customPagination :currentPage="paginate.currentPage" :perPage="paginate.perPage"
                                    :totalRecords="paginate.totalRecords" @moveToNext="paginateToNext" />
                            </div>
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
import { useAppVariables } from '@/stores/appVariables';
import { useAuthStore } from '@/stores/authStore';

const list = ref<any>([])
const isLoading = ref(true)
const authStore = useAuthStore()



const appVar = useAppVariables()

// pagination
const paginate = reactive({
    currentPage: 0,
    totalPages: 0,
    perPage: 0,
    totalRecords: 0
})

function paginateToNext(page: any) {
    window.scrollTo(0, 0)
    loadAdmins(page)
}

onMounted(() => {
    loadAdmins()
})

async function loadAdmins(page = 1) {
    // isLoading.value = true;
    const resp = await api.userAdmins(searchString.value, page)
    list.value = resp.data.data
    paginate.currentPage = resp.data.current_page;
    paginate.totalPages = resp.data.last_page;
    paginate.perPage = resp.data.per_page;
    paginate.totalRecords = resp.data.total
    isLoading.value = false;
}

function deleteRecord(id: string | number) {
    useFxn.confirmDelete('This user will be deleted?', 'Yes. Delete')
        .then(async (answer) => {
            if (answer.value === true) {
                try {
                    await api.userDeleteAdmin(id)
                    useFxn.toast('Record deleted', 'success')
                    loadAdmins()
                } catch (error) {

                }
            }
        })
}

// searching
const searchString = ref('')
const onInputFunction = useFxn.debounce(loadAdmins, 300);

</script>

<style lang="css" scoped>
@import '@/assets/styles/table-mobile-responsive.css';
</style>