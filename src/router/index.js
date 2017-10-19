import Vue from 'vue';
import Router from 'vue-router';
import Member from '@/components/member/member';
import Menu from '@/components/menu/menu';
import Home from '@/components/home/home';
import Cart from '@/components/cart/cart';
import Buy from '@/components/cart/buy';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/member',
      name: 'Member',
      component: Member
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/buy',
      name: 'Buy',
      component: Buy
    }
  ]
});
