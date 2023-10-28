import { createRouter, createWebHistory } from 'vue-router'
import TodosView from '../views/TodosView.vue'
import DetailView from '../views/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodosView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView,
      props: true,
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
