import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/math',
      name: 'math',
      component: () => import('../views/MathView.vue')
    },
    {
      path: '/english',
      name: 'english',
      component: () => import('../views/EnglishView.vue')
    },
    {
      path: '/english/letter',
      name: 'english-letter',
      component: () => import('../views/english/LetterView.vue')
    },
    {
      path: '/chinese',
      name: 'chinese',
      component: () => import('../views/ChineseView.vue')
    }
  ]
})

export default router
