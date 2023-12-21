import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/General/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    // scroll to top except for Find-Jobs route
    if (router.currentRoute.value.name != 'Find Jobs')
      return {
        top: 0,
        behavior: 'smooth',
      }
  },
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/General/AboutView.vue')
    },

    {
      path: '/condo/:id/:name',
      name: 'Deceased',
      component: () => import('../views/General/DeceasedView.vue')
    }
  ]
})

router.afterEach((to, from) => {
  document.title = "CONDONOTE | " + to.name?.toString()
})

export default router
