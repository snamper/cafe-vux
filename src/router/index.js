import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/page/main/main';
import Menu from '@/page/menu/menu';
import New from '@/page/new/new';
import Order from '@/page/menu/order/order';
import Pay from '@/page/menu/pay/pay';
import OrderList from '@/page/orderlist/orderlist';
import Login from '@/page/login/login';
import Member from '@/page/member/member';
import modPwd from '@/page/member/modifyPasswd';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      component: Main,
      children: [{
        path: 'menu',
        component: Menu,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/new',
        component: New
      },
      {
        path: '/orderlist',
        component: OrderList
      },
      {
        path: '/member',
        component: Member
      },
      {
        // 登陆页面
        path: '/login',
        component: Login
      }]
    },
    {
      // 订单详情
      path: '/order',
      component: Order
    },
    {
      // 支付页面
      path: '/pay',
      component: Pay
    },
    {
      path: '/modifyPasswd',
      component: modPwd
    }
  ]
});
