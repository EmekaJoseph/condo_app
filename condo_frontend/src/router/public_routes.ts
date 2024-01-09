// @ts-nocheck
import HomeView from '../views/General/HomeView.vue'
// import { useProfileStore } from '@/stores/profileStore';

// const initGuard = (to, from, next) => {
//     const profileStore = useProfileStore();
//     if (profileStore.userType) {
//         next({ path: `/${profileStore.userType}/dashboard` });
//     }
//     else {
//         next()
//     }
// }

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
        // beforeEnter: initGuard
    },

    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Admin/Register.vue'),
        // beforeEnter: initGuard
    },

    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/General/PageNotFound.vue')
    },
]