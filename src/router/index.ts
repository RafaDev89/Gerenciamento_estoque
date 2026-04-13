import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import UserView from '../views/UserView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/admin', name: 'Admin', component: AdminView },
  { path: '/usuario', name: 'Usuario', component: UserView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
