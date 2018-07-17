import Vue from '../node_modules/_vue@2.5.16@vue';
import FastClick from 'fastclick';
import { Toast, Lazyload } from '../node_modules/_vant@1.1.13@vant';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './lang';
import Tools from '@/utils/tools';
import '@/icon/iconfont.css';
import '@/styles/index.styl';

FastClick.attach(document.body);
Vue.config.productionTip = false;
Vue.prototype.$tools = Tools;
Vue.use(Toast);
Vue.use(Lazyload);
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
});
