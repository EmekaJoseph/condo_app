import { createRouter, createWebHistory, type RouterOptions } from 'vue-router'
import public_routes from './routes_public'
import account_routes from './routes_account'


const routes: RouterOptions['routes'] = [
  ...public_routes,
  ...account_routes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
  linkActiveClass: 'active',
  routes
})

router.afterEach((to, from) => {
  document.title = "CONDONOTE | " + to.name?.toString()
})

export default router
