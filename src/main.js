import Vue from 'vue';
import FastClick from 'fastclick';
import App from './App.vue';
import router from './router';
import store from './vuex/';
import './common/css/iconfont.css';
import './common/stylus/index.styl';

FastClick.attach(document.body);
Vue.config.productionTip = false;
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
