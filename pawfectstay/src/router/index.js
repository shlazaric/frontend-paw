import { createRouter, createWebHistory } from 'vue-router'

// USER
import WelcomeUser from '../views/user/WelcomeUser.vue'
import RegisterUser from '../views/user/RegisterUser.vue'
import LoginUser from '../views/user/LoginUser.vue'
import HomeUser from '../views/user/HomeUser.vue'
import DodajPsa from '../views/user/DodajPsa.vue'
import RezervirajTermin from '../views/user/RezervirajTermin.vue'
import UrediProfil from '../views/user/UrediProfil.vue'

// ADMIN
import WelcomeAdmin from '../views/admin/WelcomeAdmin.vue'
import LoginAdmin from '../views/admin/LoginAdmin.vue'
import HomeAdmin from '../views/admin/HomeAdmin.vue'
import AdminReservations from '../views/admin/AdminReservations.vue'
import PrikazPasa from '../views/admin/PrikazPasa.vue'


const routes = [
  // USER routes
  { path: '/', name: 'user-welcome', component: WelcomeUser },
  { path: '/register', name: 'user-register', component: RegisterUser },
  { path: '/login', name: 'login-user', component: LoginUser },
  { path: '/home', name: 'user-home', component: HomeUser },
  { path: '/dodaj-psa', name: 'add-dog', component: DodajPsa },
  { path: '/rezervacija', name: 'rezervacija', component: RezervirajTermin },
  { path: '/uredi-profil', name: 'uredi-profil', component: UrediProfil },


  // ADMIN routes
  { path: '/admin', name: 'admin-welcome', component: WelcomeAdmin },
  { path: '/admin-login', name: 'login-admin', component: LoginAdmin },
  { path: '/admin-home', name: 'admin-home', component: HomeAdmin },
  { path: '/admin-rezervacije', name: 'admin-rezervacije', component: AdminReservations },
  { path: '/admin-psi', name: 'admin-psi', component: PrikazPasa }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
