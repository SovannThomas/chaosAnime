import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'

import Favorites from '../views/Favorites.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    },
    {
      path: '/:id',
      name: 'Detail',
      component: Detail,
      props: true
    }
  ]
})

export default router

