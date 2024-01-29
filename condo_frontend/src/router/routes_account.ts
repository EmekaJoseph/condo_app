import HomeView from '../views/General/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'

// @ts-ignore
const authGuard = (to, from, next) => {
    const authStore = useAuthStore();
    if (!authStore.isLoggedIn) {
        next({ name: `Login` });
    }
    else {
        next()
    }
}

export default [
    {
        path: '/account',
        beforeEnter: authGuard,
        component: () => import('../views/Admin/AdminLayout.vue'),
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                alias: '/account',
                component: () => import('../views/Admin/Dashboard.vue'),
            },
            {
                path: '/upload-history',
                name: 'History',
                component: () => import('../views/Admin/UploadHistory.vue'),
            },
            {
                path: '/profile',
                name: 'Profile',
                component: () => import('../views/Admin/Profile.vue'),
            },
        ]
    }
]