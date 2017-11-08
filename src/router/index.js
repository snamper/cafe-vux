import Vue from 'vue';
import Router from 'vue-router';
import Menu from '@/page/menu/menu';
import New from '@/page/new/new';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/menu'
    },
    {
      path: '/menu',
      component: Menu
    },
    {
      path: '/new',
      component: New
    }
  ]
});
