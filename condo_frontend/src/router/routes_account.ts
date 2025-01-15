import { useAuthStore } from '@/stores/authStore'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

const authGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
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
        component: () => import(/* webpackChunkName: "admin" */ '../views/Admin/AdminLayout.vue'),
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                alias: '/account',
                component: () => import(/* webpackChunkName: "admin" */ '../views/Admin/Dashboard.vue'),
            },
        ]
    }
]