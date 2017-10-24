// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import router from './router';
import App from './App';
import AnimatedVue from 'animated-vue';
import { ToastPlugin, AjaxPlugin } from 'vux';
import { store } from './vuex/vuex';
import '@/common/css/animate.css';
import '@/common/stylus/index.styl';

Vue.use(AjaxPlugin);
Vue.use(ToastPlugin);
Vue.use(AnimatedVue);

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
