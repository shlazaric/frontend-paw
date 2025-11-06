import { createRouter, createWebHistory } from 'vue-router'
import WelcomeUser from '../components/WelcomeUser.vue'
import WelcomeAdmin from '../components/WelcomeAdmin.vue'

const routes = [
  { path: '/', name: 'user-welcome', component: WelcomeUser },
  { path: '/admin', name: 'admin-welcome', component: WelcomeAdmin },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
