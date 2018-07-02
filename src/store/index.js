import Vue from 'vue';
import Vuex from 'vuex';
import carts from './modules/carts';
import login from './modules/login';

Vue.use(Vuex);

const app = {
  state: {
    // loading页面
    isLoading: false
  },
  mutations: {
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading;
    }
  }
};

export default new Vuex.Store({
  modules: {
    carts,
    login
  },
  app,
  strict: true
});
