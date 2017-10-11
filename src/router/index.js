import Vue from 'vue';
import Router from 'vue-router';
import Member from '@/components/member/member';
import Menu from '@/components/menu/menu';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/menu'
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
    }
  ]
});
