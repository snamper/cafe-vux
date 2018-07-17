import Vue from 'vue';
import Vuex from 'vuex';
import member from './modules/member';
import product from './modules/product';
import getters from './getters';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    member,
    product
  },
  getters
});
