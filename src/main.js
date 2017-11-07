// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import App from './App';
import router from './router';
import { ToastPlugin, AjaxPlugin } from 'vux';
import store from './vuex/';
import './common/css/iconfont.css';
import './common/stylus/index.styl';

Vue.use(AjaxPlugin);
Vue.use(ToastPlugin);
Vue.config.productionTip = false;
FastClick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
