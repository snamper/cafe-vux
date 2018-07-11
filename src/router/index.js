import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export const routerMap = [
  {
    path: '/',
    component: () => import('@/views/main/index').then(m => m.default),
    redirect: '/menu',
    children: [
      {
        name: 'menu',
        path: 'menu',
        component: () => import('@/views/main/category/index').then(m => m.default),
        meta: {
          keepAlive: true
        }
      },
      {
        name: 'category',
        path: 'category',
        component: () => import('@/views/main/menu/index').then(m => m.default),
        meta: {
          keepAlive: true
        }
      },
      {
        name: 'cart',
        path: 'cart',
        component: () => import('@/views/main/cart/index').then(m => m.default),
        meta: {keepAlive: true }
      },
      {
        name: 'activity',
        path: 'activity',
        component: () => import('@/views/main/activity/index').then(m => m.default),
        meta: {
          keepAlive: true
        }
      },
      {
        name: 'member',
        path: 'member',
        component: () => import('@/views/main/member/index').then(m => m.default),
        meta: {
          keepAlive: true
        }
      },
      {
        name: 'login',
        path: 'login',
        component: () => import('@/views/main/login/index').then(m => m.default)
      }
    ]
  },
  {
    name: 'food',
    path: '/food',
    component: () => import('@/views/food/index').then(m => m.default),
    props: true,
    meta: {
      keepAlive: true
    }
  },
  {
    name: 'card',
    path: '/card',
    component: () => import('@/views/card/index').then(m => m.default),
    props: true
  },
  {
    name: 'modify',
    path: '/modify',
    component: () => import('@/views/modify/index').then(m => m.default),
    props: true
  },
  {
    name: 'order',
    path: '/order',
    component: () => import('@/views/order/index').then(m => m.default),
    props: true,
    meta: {
      keepAlive: true
    }
  },
  {
    name: 'pay',
    path: '/pay',
    component: () => import('@/views/pay/index').then(m => m.default),
    props: true,
    meta: { keepAlive: true }
  },
  {
    name: 'address',
    path: '/address',
    component: () => import('@/views/address/index').then(m => m.default),
    props: true,
    meta: { keepAlive: true }
  },
  {
    name: 'records',
    path: '/records',
    component: () => import('@/views/records/index').then(m => m.default),
    props: true
  },
  {
    name: 'record',
    path: '/record',
    component: () => import('@/views/record/index').then(m => m.default),
    props: true
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error/index').then(m => m.default)
  }
];

export default new Router({
  routes: routerMap
});
