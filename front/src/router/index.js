import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Detail from '../views/Detail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      component: Detail,
      props: true
      name: 'Profile',
      path: '/profile/:id',
    }
  ]
})

export default router