import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/page/login/login';
import Member from '@/page/member/member';
import Menu from '@/page/menu/menu';
import New from '@/page/new/new';
import Comfirm from '@/page/order/confirm/confirm';
import Detail from '@/page/order/detail/detail';
import History from '@/page/order/history/history';
import Pay from '@/page/pay/pay';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/home/home'
    },
    {
      path: '/menu',
      component: Menu
    },
    {
      path: '/member',
      component: Member
    },
    {
      path: '/new',
      component: New
    },
    {
      path: '/pay',
      component: Pay
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/order',
      redirect: '/order/confirm',
      chindren: [{
          path: 'comfirm',
          component: Comfirm
        },
        {
          path: 'detail',
          component: Detail
        },
        {
          path: 'history',
          component: History
        }
      ]
    }
  ]
});
