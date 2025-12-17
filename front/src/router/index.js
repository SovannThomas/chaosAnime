import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
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
      path: "/detail/:id",
      name: "user-detail",
      component: () => import("./../views/UserDetail.vue"),
    }
  ]
})

export default router

