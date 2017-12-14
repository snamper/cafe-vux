// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import App from './App';
import router from './router';
import { ToastPlugin, AjaxPlugin, AlertPlugin } from 'vux';
import store from './vuex/';
import './common/css/iconfont.css';
import './common/stylus/index.styl';

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
// 然后使用vue-router的beforeEach和afterEach来更改loading状态
router.beforeEach(function(to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true});
  next();
});

router.afterEach(function(to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: false});
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
