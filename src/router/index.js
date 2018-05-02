import Vue from 'vue';
import Router from 'vue-router';
/* import Main from '@/pages/main/main';
import Menu from '@/pages/menu/menu';
import News from '@/pages/news/news';
import Login from '@/pages/login/login';
import Order from '@/pages/order/order';
import Pay from '@/pages/order/pay';
import Records from '@/pages/record/records';
import Record from '@/pages/record/record';
import Member from '@/pages/member/member';
import MemberInfo from '@/pages/member/detail';
import PWD from '@/pages/member/pwd';
import Modify from '@/pages/member/modify'; */

Vue.use(Router);

export default new Router({
  routes: [
      {
      path: '/',
      // component: Main,
      // component: resolve => require(['../pages/main/main.vue'], resolve),
      component: () => import('../pages/main/main.vue').then(m => m.default),
      redirect: '/menu',
      children: [{
        name: 'menu',
        path: 'menu',
        component: () => import('../pages/menu/menu.vue').then(m => m.default),
        // component: resolve => require(['../pages/menu/menu.vue'], resolve),
        // component: Menu,
        meta: {
          keepAlive: true
        }
      },
      {
        // 新品推荐
        name: 'news',
        path: 'news',
        // component: News
        // component: resolve => require(['../pages/news/news.vue'], resolve)
        component: () => import('../pages/news/news.vue').then(m => m.default)
      },
      {
        // 登陆页面
        name: 'login',
        path: 'login',
        component: () => import('../pages/login/login.vue').then(m => m.default)
        // component: resolve => require(['../pages/login/login.vue'], resolve)
        // component: Login
      },
      {
        // 购买清单页面
        name: 'order',
        path: 'order',
        // component: Order
        component: () => import('../pages/order/order.vue').then(m => m.default)
        // component: resolve => require(['../pages/order/order.vue'], resolve)
      },
      {
        // 订单详情
        name: 'records',
        path: 'records',
        // component: Records
        component: () => import('../pages/record/record.vue').then(m => m.default)
        // component: resolve => require(['../pages/record/records.vue'], resolve)
      },
      {
        // 会员信息页
        name: 'member',
        path: 'member',
        component: () => import('../pages/member/member.vue').then(m => m.default)
        // component: resolve => require(['../pages/member/member.vue'], resolve)
        // component: Member
      },
      {
        // 会员详情页
        name: 'memberinfo',
        path: 'memberinfo',
        // component: MemberInfo
        component: () => import('../pages/member/detail.vue').then(m => m.default)
        // component: resolve => require(['../pages/member/detail.vue'], resolve)
      },
      {
        // 密码修改页
        name: 'pwd',
        path: 'pwd',
        // component: PWD
        component: () => import('../pages/member/pwd.vue').then(m => m.default)
        // component: resolve => require(['../pages/member/pwd.vue'], resolve)
      },
      {
        // 会员信息修改页
        name: 'modify',
        path: 'modify',
        // component: Modify,
        component: () => import('../pages/member/modify.vue').then(m => m.default),
        // component: resolve => require(['../pages/member/modify.vue'], resolve),
        props: true
      }]
    },
    {
      // 付款页面
      name: 'pay',
      path: '/pay',
      // component: Pay,
      component: () => import('../pages/order/pay.vue').then(m => m.default),
      // component: resolve => require(['../pages/order/pay.vue'], resolve),
      props: true
    },
    {
      name: 'record',
      path: '/record',
      // component: Record,
      component: () => import('../pages/record/records.vue').then(m => m.default),
      // component: resolve => require(['../pages/record/records.vue'], resolve),
      props: true
    }
  ]
});
