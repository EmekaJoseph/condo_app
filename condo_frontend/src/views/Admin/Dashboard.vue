<template>
    <div class="container mt-5 animate__animated animate__fadeIn">
        <div class="min-vh-100">

            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li v-for="tab in tabs" :key="tab.value" class="nav-item" role="presentation">
                    <button v-if="tab.adminAccess.includes(authStore.profileData.level.toString())"
                        @click="tabToShow = tab.value" :class="['nav-link', { active: tabToShow === tab.value }]"
                        type="button" role="tab" :aria-selected="tabToShow === tab.value"
                        :aria-controls="`tab-${tab.value}`">
                        {{ tab.name }}
                    </button>
                </li>
            </ul>

            <div class="tab-content">
                <div v-for="tab in tabs" :key="tab.value" :class="['tab-pane', { active: tabToShow === tab.value }]"
                    role="tabpanel" :id="`tab-${tab.value}`">
                    <component @done="tabToShow = 'history'" v-if="tabToShow === tab.value" :is="tab.component" />
                </div>
            </div>

        </div>
    </div>
    <deceasedLinkModal />
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue';
import deceasedLinkModal from '@/components/modals/deceasedLinkModal.vue';
import { useAuthStore } from '@/stores/authStore';

type Tagtypes = 'history' | 'new_post' | 'settings' | 'users'
type AsyncComponent = ReturnType<typeof defineAsyncComponent>;

const tabToShow = ref<Tagtypes>('new_post')
const authStore = useAuthStore()

const deceadedPostingTab = defineAsyncComponent(() => import('./tabContents/deceadedPostingTab.vue'));
const historyTab = defineAsyncComponent(() => import('./tabContents/historyTab.vue'));
const usersTab = defineAsyncComponent(() => import('./tabContents/usersTab.vue'));
// const settingsTab = defineAsyncComponent(() => import('./tabContents/settingsTab.vue'));

const tabs: { name: string, value: Tagtypes, component: AsyncComponent, adminAccess: string[] }[] = [
    { name: 'Post Memorial', value: 'new_post', component: deceadedPostingTab, adminAccess: ['1', '2'] },
    { name: 'My Uploads', value: 'history', component: historyTab, adminAccess: ['1', '2'] },
    { name: 'Users', value: 'users', component: usersTab, adminAccess: ['1'] },
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
