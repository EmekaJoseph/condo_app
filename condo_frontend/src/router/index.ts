import { createRouter, createWebHistory } from 'vue-router'
import public_routes from './public_routes'

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
    ...public_routes,
  ]
})

router.afterEach((to, from) => {
  document.title = "CONDONOTE | " + to.name?.toString()
})

export default router
