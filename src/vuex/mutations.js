import Vue from 'vue';
import Logger from 'chivy';
const log = new Logger('vuex/mutations');
export default {
    // 更新UUID
    updateUUID(state, payload) {
        state.UUID = payload;
    },
    // 更新登陆状态
    updateStateLogin(state, payload) {
        log.debug('function (updateStateLogin)' + 'get param is ' + payload);
        state.status.login = payload;
    },
    // 更新会员信息
    updatememberInfo(state, payload) {
        state.memberInfo = payload;
    },
    // 更新是否重名状态
    updateStateDuplicate(state, payload) {
        state.status.duplicate = payload;
    },
    // 增加购买商品
    addCount(state, payload) {
        state.categorys.forEach((category) => {
            category.list.forEach((product) => {
                if (payload === product) {
                    if (!product.count) {
                        Vue.set(product, 'count', 1);
                    } else {
                        product.count++;
                    }
                }
            });
        });
    },
    // 减少购买商品
    subCount(state, payload) {
        state.categorys.forEach((category) => {
            category.list.forEach((product) => {
                if (payload === product) {
                    product.count--;
                }
            });
        });
    },
    // 更新商品
    updateStateCategorys(state, payload) {
        state.categorys = payload;
    }
};
