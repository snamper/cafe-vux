// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import App from './App';
import router from './router';
import { ToastPlugin, AjaxPlugin, AlertPlugin } from 'vux';
import store from './vuex/';

Vue.use(AjaxPlugin);
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
Vue.config.productionTip = false;
FastClick.attach(document.body);

// 注册一个module来保存状态
store.registerModule('vux', {
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
