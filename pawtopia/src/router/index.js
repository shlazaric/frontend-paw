import { createRouter, createWebHistory } from 'vue-router'

// USER
import WelcomeUser from '../views/user/WelcomeUser.vue'
import RegisterUser from '../views/user/RegisterUser.vue'

// ADMIN
import WelcomeAdmin from '../views/admin/WelcomeAdmin.vue'

const routes = [

  { path: '/', name: 'user-welcome', component: WelcomeUser },
  { path: '/register', name: 'user-register', component: RegisterUser },


  { path: '/admin', name: 'admin-welcome', component: WelcomeAdmin },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
