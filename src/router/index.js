import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/pages/main/main';
import Login from '@/pages/login/login';
import Menu from '@/pages/menu/menu';

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
      }]
    }
  ]
});
