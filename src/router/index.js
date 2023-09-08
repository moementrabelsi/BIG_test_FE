import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogPage from '../views/BlogPage.vue'
import UsersPage from '../views/UsersPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/blog',
    name: 'BlogPage',
    component: BlogPage,
  },
  {
    path: '/users',
    name: 'UsersPage',
    component: UsersPage,
  }
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
