import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/page/home/main';
import Menu from '@/page/home/menu/menu';
import Home from '@/page/home/home/home';
import Cart from '@/page/home/cart/cart';
import CartShow from '@/page/home/cart/cart/cartList';
import Pay from '@/page/home/cart/pay/pay';
import Record from '@/page/home/record/record';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/home'
    },
    {
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
    }
  ]
});
