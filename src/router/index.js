import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/pages/main/main';
import Login from '@/pages/login/login';
import Menu from '@/pages/menu/menu';
import Order from '@/pages/order/order';
import Pay from '@/pages/order/pay';
import Records from '@/pages/record/records';
import Record from '@/pages/record/record';
import News from '@/pages/news/news';
import Member from '@/pages/member/member';
import MemberInfo from '@/pages/member/detail';
import PWD from '@/pages/member/pwd';
import Modify from '@/pages/member/modify';

Vue.use(Router);

export default new Router({
  routes: [
      {
      path: '/',
      component: Main,
      redirect: '/menu',
      children: [{
        name: 'menu',
        path: 'menu',
        component: Menu,
        meta: {
          keepAlive: true
        }
      },
      {
        // 新品推荐
        name: 'news',
        path: 'news',
        component: News
      },
      {
        // 登陆页面
        name: 'login',
        path: 'login',
        component: Login
      },
      {
        // 购买清单页面
        name: 'order',
        path: 'order',
        component: Order
      },
      {
        // 订单详情
        name: 'records',
        path: 'records',
        component: Records
      },
      {
        // 会员信息页
        name: 'member',
        path: 'member',
        component: Member
      },
      {
        // 会员详情页
        name: 'memberinfo',
        path: 'memberinfo',
        component: MemberInfo
      },
      {
        // 密码修改页
        name: 'pwd',
        path: 'pwd',
        component: PWD
      },
      {
        // 会员信息修改页
        name: 'modify',
        path: 'modify',
        component: Modify,
        props: true
      }]
    },
    {
      // 付款页面
      name: 'pay',
      path: '/pay',
      component: Pay,
      props: true
    },
    {
      name: 'record',
      path: '/record',
      component: Record,
      props: true
    }
  ]
});
