import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import(/* webpackChunkName: "table" */ '../views/Table.vue')
  },
  {
    path: '/dialog',
    name: 'dialog',
    component: () => import(/* webpackChunkName: "dialog" */ '../views/Dialog.vue')
  },
  {
    path: '/filter',
    name: 'filter',
    component: () => import(/* webpackChunkName: "filter" */ '../views/Filter.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
