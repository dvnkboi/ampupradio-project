import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/functions',
    name: 'functions',
    component: () => import(/* webpackChunkName: "functions" */ '../views/Functions.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
