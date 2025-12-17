import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import AnimeList from '../views/Home.vue'
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
      path: '/animes',
      name: 'AnimeList',
      component: AnimeList
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    },
    {
      component: Detail,
      props: true,
      name: 'Profile',
      path: '/profile/:id',
    }
  ]
})

export default router