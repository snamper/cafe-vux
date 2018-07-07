import Vue from 'vue';
import FastClick from 'fastclick';
import { Toast } from 'vant';
import App from './App.vue';
import router from './router';
import store from './store/';
import i18n from './lang';
import MyUtils from '@/utils/myUtils';
import '@/icon/iconfont.css';
import '@/styles/index.styl';

FastClick.attach(document.body);
Vue.config.productionTip = false;
Vue.prototype.$tools = MyUtils;
Vue.use(Toast);
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
});
