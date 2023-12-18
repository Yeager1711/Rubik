// src/router/mainRoutes.js
export default [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "main" */ '../views/HomeView.vue')
    },
    {
      path: '/home',
      component: () => import(/* webpackChunkName: "main" */ '../views/HomeView.vue')
    },
    {
      path: '/about',
      component: () => import(/* webpackChunkName: "main" */ '../views/AboutView.vue')
    },
    {
      path:'/products',
      component: () => import(/* webpackChunkName: "main" */ '../views/ProductsView.vue')
    },
    {
      path:'/checkout',
      component: () => import(/* webpackChunkName: "main" */ '../views/CheckoutView.vue')
    },
    {
      path:'/login',
      component: () => import(/* webpackChunkName: "main" */ '../views/LoginView.vue')
    },
    {
      path:'/register',
      component: () => import(/* webpackChunkName: "main" */ '../views/RegisterView.vue')
    },
    {
      path:'/profile',
      component: () => import(/* webpackChunkName: "main" */ '../views/ProfileView.vue')
    },
    {
      path:'/:pathMatch(.*)*',
      component: () => import(/* webpackChunkName: "main" */ '../views/ErrorView.vue')
    },
  ];
  