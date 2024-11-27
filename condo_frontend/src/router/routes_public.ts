import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import HomeView from '../views/General/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'


const initGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore();
    if (authStore.isLoggedIn) {
        next({ name: `Dashboard` });
    }
    else {
        next()
    }
}

export default [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },

    {
        path: '/condo/:id/:name',
        name: 'Deceased',
        component: () => import('../views/General/DeceasedView.vue')
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Admin/Login.vue'),
        beforeEnter: initGuard
    },

    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Admin/Register.vue'),
        beforeEnter: initGuard
    },

    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/General/PageNotFound.vue')
    },
]