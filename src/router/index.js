import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/pages/main/main';
import Login from '@/pages/login/login';

Vue.use(Router);

export default new Router({
  routes: [
      {
      path: '/',
      component: Main,
      redirect: '/login',
      children: [{
        path: 'login',
        component: Login
      }]
    }
  ]
});
