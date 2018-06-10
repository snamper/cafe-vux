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
          component: () => import('../pages/cart/cart.vue').then(m => m.default)
        },
        {
          name: 'active',
          path: 'active',
          component: () => import('../pages/active/active.vue').then(m => m.default)
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
      props: true
    }
  ]
});
