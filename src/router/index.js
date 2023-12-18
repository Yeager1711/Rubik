// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import mainRoutes from './mainRoutes';
import adminRoutes from './adminRoutes';

Vue.use(VueRouter);

const routes = [
  ...mainRoutes,
  ...adminRoutes
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
