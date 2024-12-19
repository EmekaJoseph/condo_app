<template>
    <div class="container mt-5 animate__animated animate__fadeIn">
        <div class="min-vh-100">

            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li v-for="tab in tabs" :key="tab.value" class="nav-item" role="presentation">
                    <button @click="tabToShow = tab.value" :class="['nav-link', { active: tabToShow === tab.value }]"
                        type="button" role="tab" :aria-selected="tabToShow === tab.value"
                        :aria-controls="`tab-${tab.value}`">
                        {{ tab.name }}
                    </button>
                </li>
            </ul>

            <div class="tab-content">
                <div v-for="tab in tabs" :key="tab.value" :class="['tab-pane', { active: tabToShow === tab.value }]"
                    role="tabpanel" :id="`tab-${tab.value}`">
                    <component v-if="tabToShow === tab.value" :is="tab.component" />
                </div>
            </div>

        </div>
    </div>
    <deceasedLinkModal />
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue';
import deceasedLinkModal from '@/components/modals/deceasedLinkModal.vue';

type Tagtypes = 'history' | 'new_post' | 'settings'
type AsyncComponent = ReturnType<typeof defineAsyncComponent>;

const tabToShow = ref<Tagtypes>('new_post')

const deceadedPostingTab = defineAsyncComponent(() => import('./tabContents/deceadedPostingTab.vue'));
const historyTab = defineAsyncComponent(() => import('./tabContents/historyTab.vue'));
// const settingsTab = defineAsyncComponent(() => import('./tabContents/settingsTab.vue'));

const tabs: { name: string, value: Tagtypes, component: AsyncComponent }[] = [
    { name: 'Post Memorial', value: 'new_post', component: deceadedPostingTab },
    { name: 'History', value: 'history', component: historyTab },
    // { name: 'Settings', value: 'settings', component: settingsTab },
]

</script>

<style scoped>
.nav-link,
.nav-item .active {
    border: none !important;
    background: transparent;
    color: inherit;
}

.nav-item {
    color: var(--bs-gray-600)
}

.nav-item .active {
    border-bottom: 1px solid var(--theme-color) !important;
    color: var(--theme-color) !important;
    background: transparent !important;
    font-weight: bolder;
}
</style>
