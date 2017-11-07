import Vue from 'vue';
import Vuex from 'vuex';
// import Logger from 'chivy';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
// const log = new Logger('cafe/index');
Vue.use(Vuex);

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
