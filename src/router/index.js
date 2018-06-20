import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('../pages/main/main.vue').then(m => m.default),
      redirect: '/menu',
      children: [
        {
          name: 'menu',
          path: 'menu',
          component: () => import('../pages/menu/menu.vue').then(m => m.default),
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'cart',
          path: 'cart',
          component: () => import('../pages/cart/cart.vue').then(m => m.default),
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'active',
          path: 'active',
          component: () => import('../pages/active/active.vue').then(m => m.default),
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'member',
          path: 'member',
          component: () => import('../pages/member/member.vue').then(m => m.default)
        }
      ]
    },
    {
      name: 'good',
      path: '/good',
      component: () => import('../pages/menu/good.vue').then(m => m.default),
      props: true,
      meta: {
        keepAlive: true
      }
    },
    {
      name: 'card',
      path: '/card',
      component: () => import('../pages/member/card.vue').then(m => m.default),
      props: true
    },
    {
      name: 'info',
      path: '/info',
      component: () => import('../pages/member/info.vue').then(m => m.default),
      props: true
    },
    {
      name: 'pay',
      path: '/pay',
      component: () => import('../pages/cart/pay.vue').then(m => m.default),
      props: true
    },
    {
      name: 'address',
      path: '/address',
      component: () => import('../pages/member/address.vue').then(m => m.default),
      props: true
    },
    {
      name: 'addressedit',
      path: '/addressedit',
      component: () => import('../pages/member/addressedit.vue').then(m => m.default),
      props: true
    },
    {
      name: 'order',
      path: '/order',
      component: () => import('../pages/order/orderlist.vue').then(m => m.default),
      props: true
    },
    {
      name: 'orderdetail',
      path: '/orderdetail',
      component: () => import('../pages/order/orderdetail.vue').then(m => m.default),
      props: true
    }
  ]
});
