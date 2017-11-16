import Vue from 'vue';
import Router from 'vue-router';
import Menu from '@/page/menu/menu';
import New from '@/page/new/new';
import Order from '@/page/menu/order/order';
import Pay from '@/page/menu/pay/pay';
import OrderList from '@/page/orderlist/orderlist';
import Login from '@/page/login/login';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/menu'
    },
    {
      // 主页
      path: '/menu',
      component: Menu
    },
    {
      // 新品推荐
      path: '/new',
      component: New
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
      // 历史订单
      path: '/orderlist',
      component: OrderList
    },
    {
      // 登陆页面
      path: '/login',
      component: Login
    }
  ]
});
