import Vue from '../../node_modules/_vue@2.5.16@vue';
import Vuex from '../../node_modules/_vuex@2.5.0@vuex';
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
