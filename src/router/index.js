import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostsPage from '../views/PostsPage.vue'
import DetailedPost from '../views/DetailedPost.vue'
import UsersPage from '../views/UsersPage.vue'
import ContactPage from '../views/ContactPage.vue'

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
    path: '/posts/:id',
    name: 'PostPage',
    component: DetailedPost,
  },
  {
    path: '/users',
    name: 'UsersPage',
    component: UsersPage,
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactPage,
  }
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
