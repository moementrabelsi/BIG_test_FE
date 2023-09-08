import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostsPage from '../views/PostsPage.vue'
import UsersPage from '../views/UsersPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/posts',
    name: 'PostsPage',
    component: PostsPage,
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
