// src/router/adminRoutes.js
export default [
    {
      path:'/admin/home',
      component: () => import(/* webpackChunkName: "admin" */ '../views/admin/AdminHomeView.vue')
    },
    {
      path: '/admin/manager',
      component: () => import(/* webpackChunkName: "admin" */ '../views/admin/AdminManagerView.vue')
    },
    {
      path: '/admin/manager/add-products',
      component: () => import(/* webpackChunkName: "admin" */ '../views/admin/controllerView/AddProductView.vue')
    },
    {
      path:'/admin/manager/add-products/add-category',
      component: () => import(/* webpackChunkName: "admin" */ '../views/admin/controllerView/AddCategoryView.vue')
    },
    {
      path: '/admin/manager/edit/:id',
      name: 'edit-product',
      component: () => import(/* webpackChunkName: "admin" */ '../views/admin/controllerView/AdminEditView.vue')
    },
    {
      path: '/admin/orders',
      component: () => import(/* webpackChunkName: "admin" */ '../views/admin/AdminOrdersView.vue')
    },
  ];
  