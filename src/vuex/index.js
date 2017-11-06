import Vue from 'vue';
import Vuex from 'vuex';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';
Vue.use(Vuex);

export const state = {
    categorys: '', // 商品分类信息
    memberInfo: '', // 会员信息
    recordList: '' // 会员购买商品记录
};

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
