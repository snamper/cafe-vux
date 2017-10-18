// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import router from './router';
import App from './App';
import '@/common/stylus/index.styl';
import { ToastPlugin, AjaxPlugin } from 'vux';
import { store } from './vuex/vuex';

Vue.use(AjaxPlugin);
Vue.use(ToastPlugin);

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
