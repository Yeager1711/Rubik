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

  // {
  //   path:'/cart',
  //   component: () => import('../views/CartView.vue')
  // },

  {
    path:'/checkout',
    component: () => import('../views/CheckoutView.vue')
  },

  {
    path:'/login',
    component: () => import('../views/LoginView.vue')
  },

  {
    path:'/register',
    component: () => import('../views/RegisterView.vue')
  },

  {
    path:'/profile',
    component: () => import('../views/ProfileView.vue')
  },

  {
    path:'/order/history',
    component: () => import('../views/ManagerOrdersView.vue')
  },

  //ADMIN LAYOUT ROUTER
  {
    path:'/admin/home',
    component: () => import('../views/admin/AdminHomeView.vue')
  },

  {
    path: '/admin/manager',
    component: () => import('../views/admin/AdminManagerView.vue')
  },

  {
    path: '/admin/manager/add-products',
    component: () => import('../views/admin/controllerView/AddProductView.vue')
  },

  {
    path:'/admin/manager/add-products/add-category',
    component: () => import ('../views/admin/controllerView/AddCategoryView.vue')
  },

  {
    path: '/admin/manager/edit/:id',
    name: 'edit-product',
    component: () => import('../views/admin/controllerView/AdminEditView.vue')
},


  {
    path: '/admin/orders',
    component: () => import('../views/admin/AdminOrdersView.vue')
  },

  {
    path:'/:pathMatch(.*)*',
    component: () => import('../views/ErrorView.vue')
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router