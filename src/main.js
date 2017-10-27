// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import App from './App';
import router from './router';
import AnimatedVue from 'animated-vue';
import VueChatScroll from 'vue-chat-scroll';
import { ToastPlugin, AjaxPlugin } from 'vux';
import { store } from './vuex/vuex';
import './common/css/animate.css';
import './common/stylus/index.styl';

Vue.use(VueChatScroll);
Vue.use(AjaxPlugin);
Vue.use(ToastPlugin);
Vue.use(AnimatedVue);
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
