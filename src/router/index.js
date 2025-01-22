import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tic-tac-toe',
      name: 'tic-tac-toe',
      component: () => import('../views/TicTacToeView.vue')
    },
    {
      path: '/wordle',
      name: 'wordle',
      component: () => import('../views/WordleView.vue')
    }
  ]
})

export default router 