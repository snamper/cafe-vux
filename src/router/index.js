import Vue from 'vue';
import Router from 'vue-router';
<<<<<<< HEAD
import Main from '@/page/home/main';
import Menu from '@/page/home/menu/menu';
import Home from '@/page/home/home/home';
import Cart from '@/page/home/cart/cart';
import CartShow from '@/page/home/cart/cart/cartList';
import Pay from '@/page/home/cart/pay/pay';
import Record from '@/page/home/record/record';
=======
import Menu from '@/page/menu/menu';
import New from '@/page/new/new';
import Order from '@/page/menu/order/order';
import Pay from '@/page/menu/pay/pay';
import OrderList from '@/page/orderlist/orderlist';
import Login from '@/page/login/login';
import Member from '@/page/member/member';
>>>>>>> shop

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/menu'
    },
    {
<<<<<<< HEAD
      path: '/home',
      component: Main,
      children: [{
        path: 'home',
        component: Home
      }, {
        path: 'menu',
        component: Menu
      }, {
        path: 'cart',
        component: Cart,
        children: [{
          path: 'pay',
          component: Pay
        }, {
          path: 'cartlist',
          component: CartShow
        }]
      }, {
        path: 'record',
        component: Record
      }]
=======
      // 主页
      path: '/menu',
      component: Menu,
      meta: {
        keepAlive: true // 需要被缓存
      }
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
    },
    {
      path: '/member',
      component: Member
>>>>>>> shop
    }
  ]
});
