import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  {
    path: '/stores',
    name: 'stores',
    component: () => import(/* webpackChunkName: "about" */ '../views/Stores.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/DashBoard.vue')
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import(/* webpackChunkName: "about" */ '../views/Reports.vue')
  },
  {
    path: '/suppliers',
    name: 'suppliers',
    component: () => import(/* webpackChunkName: "about" */ '../views/Providers.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import(/* webpackChunkName: "about" */ '../views/Orders.vue')
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: () => import(/* webpackChunkName: "about" */ '../views/Inventory.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router