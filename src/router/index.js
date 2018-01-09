import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/page/main/main';
import Menu from '@/page/menu/menu';
import New from '@/page/new/new';
import Order from '@/page/menu/order/order';
import Pay from '@/page/menu/pay/pay';
import OrderList from '@/page/orderlist/orderlist';
import OrderDetail from '@/page/orderlist/orderDetail';
import Login from '@/page/login/login';
import Member from '@/page/member/member';
import MemberInfo from '@/page/member/detail';
import Modify from '@/page/member/common';

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
        path: 'new',
        component: New
      },
      {
        path: 'orderlist',
        component: OrderList
      },
      {
        path: 'member',
        component: Member
      },
      {
        name: 'info',
        path: 'info',
        component: MemberInfo,
        props: true
      },
      {
        name: 'modify',
        path: 'modify',
        component: Modify,
        props: true
      },
      {
        // 登陆页面
        name: 'login',
        path: 'login',
        component: Login
      },
      {
        // 订单详情
        path: 'order',
        component: Order
      }]
    },
    {
      // 支付页面
      name: 'pay',
      path: '/pay',
      component: Pay,
      props: true
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: OrderDetail,
      props: true
    }
  ]
});
