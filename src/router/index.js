import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/pages/main/main';
import Login from '@/pages/login/login';
import Menu from '@/pages/menu/menu';
import Order from '@/pages/order/order';
import Pay from '@/pages/order/pay';
import Records from '@/pages/record/records';
import Record from '@/pages/record/record';

Vue.use(Router);

export default new Router({
  routes: [
      {
      path: '/',
      component: Main,
      redirect: '/menu',
      children: [{
        path: 'menu',
        component: Menu,
        meta: {
          keepAlive: true
        }
      },
      {
        // 登陆页面
        name: 'login',
        path: 'login',
        component: Login
      },
      {
        // 购买清单页面
        name: 'order',
        path: 'order',
        component: Order
      },
      {
        // 订单详情
        path: 'records',
        component: Records
      }]
    },
    {
      // 付款页面
      name: 'pay',
      path: '/pay',
      component: Pay
    },
    {
      name: 'record',
      path: '/record',
      component: Record,
      props: true
    }
  ]
});
