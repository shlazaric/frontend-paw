import { createRouter, createWebHistory } from 'vue-router'

// USER
import WelcomeUser from '../views/user/WelcomeUser.vue'
import RegisterUser from '../views/user/RegisterUser.vue'
import LoginUser from '../views/user/LoginUser.vue'
import HomeUser from '../views/user/HomeUser.vue'
//import AddPet from '../views/user/AddPet.vue'
import RezervirajTermin from '../views/user/RezervirajTermin.vue'

// ADMIN
import WelcomeAdmin from '../views/admin/WelcomeAdmin.vue'
import LoginAdmin from '../views/admin/LoginAdmin.vue'
import HomeAdmin from '../views/admin/HomeAdmin.vue'
import AdminReservations from '../views/admin/AdminReservations.vue';

const routes = [
  // USER routes
  { path: '/', name: 'user-welcome', component: WelcomeUser },
  { path: '/register', name: 'user-register', component: RegisterUser },
  { path: '/login', name: 'login-user', component: LoginUser },
  { path: '/home', name: 'user-home', component: HomeUser },
  //{ path: '/dodaj-psa', name: 'add-dog', component: AddPet },
  { path: '/rezervacija', name: 'rezervacija', component: RezervirajTermin },


  // ADMIN routes
  { path: '/admin', name: 'admin-welcome', component: WelcomeAdmin },
  { path: '/admin-login', name: 'login-admin', component: LoginAdmin },
  { path: '/admin-home', name: 'admin-home', component: HomeAdmin },
  { path: '/admin-rezervacije', name: 'admin-rezervacije', component: AdminReservations }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
