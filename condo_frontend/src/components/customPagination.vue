<template>
    <div class="col-12">
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li @click="moveToPage(-1)" class="page-item">
                    <div class="page-link">
                        <i class="bi bi-chevron-left"></i>
                    </div>
                </li>
                <li v-if="pagesToShow[0] > 1" @click="changePage(1)" class="page-item">
                    <span class="page-link">1</span>
                </li>
                <li v-if="pagesToShow[0] > 2" class="page-item">
                    <span @click="moveToPage(-5)" class="page-link">....</span>
                </li>
                <li v-for="page in pagesToShow" :key="page" :class="{ 'page-item': true, 'active': page === currentPage }"
                    @click="changePage(page)">
                    <span class="page-link">{{ page }}</span>
                </li>

                <li v-if="pagesToShow[pagesToShow.length - 1] < totalPages - 1" class="page-item">
                    <span @click="moveToPage(5)" class="page-link">...</span>
                </li>

                <li v-if="pagesToShow[pagesToShow.length - 1] !== totalPages" @click="changePage(totalPages)"
                    class="page-item">
                    <span class="page-link">{{ totalPages }}</span>
                </li>
                <li @click="moveToPage(1)" class="page-item">
                    <div class="page-link">
                        <i class="bi bi-chevron-right"></i>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['moveToNext'])

const props = defineProps({
    currentPage: {
        type: Number,
        default: 0
    },
    totalRecords: {
        type: Number,
        default: 0
    },
    perPage: {
        type: Number,
        default: 0
    },
    buttonColor: {
        default: '#000'
    }
})

const totalPages = computed(() => Math.ceil(props.totalRecords / props.perPage))

const pagesToShow = computed(() => {
    let startPage = Math.max(1, props.currentPage - 2);
    let endPage = Math.min(totalPages.value, props.currentPage + 2);
    let pages = [];

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    return pages;
});

const changePage = (page: number) => {
    emit('moveToNext', page)
};

const moveToPage = (moveTo: number) => {
    const delta = Math.sign(moveTo) * Math.min(Math.abs(moveTo), 5);
    const newPage = Math.min(Math.max(props.currentPage + delta, 1), totalPages.value);
    changePage(newPage);
};
</script>

<style scoped>
.pagination .page-link {
    border: none !important;
    color: #000 !important;
    font-weight: bold;
    border-radius: 7px;
    padding-inline: 15px;
    margin-inline: 1px;
    cursor: pointer;
    background-color: transparent;
}

.pagination .active .page-link {
    background-color: var(--theme-color) !important;
    color: #fff !important;
}

@media (max-width: 767px) {
    .pagination .page-link {
        font-size: 11px;
        padding: 7px 11px;

    }
}
</style>