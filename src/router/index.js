import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue')
  },

  {
    path: '/home',
    component: () => import('../views/HomeView.vue')
  },

  {
    path: '/about',
    component: () => import('../views/AboutView.vue')
  },
  
  {
    path:'/products',
    component: () => import('../views/ProductsView.vue')
  },

  {
    path:'/cart',
    component: () => import('../views/CartView.vue')
  },

  {
    path:'/checkout',
    component: () => import('../views/CheckoutView.vue')
  },

  {
    path:'/:pathMatch(.*)*',
    component: () => import('../views/ErrorView.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
