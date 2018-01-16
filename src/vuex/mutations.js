import Vue from 'vue';
import { url } from '../common/js/values';
import Logger from 'chivy';
const log = new Logger('vuex/mutations');
export default {
    // 更新UUID
    updateUUID(state, payload) {
        state.UUID = payload;
    },
    // 更新登陆状态
    updateStatusLogin(state, payload) {
        log.debug('function (updateStatusLogin)' + 'get param is ' + payload);
        state.status.login = payload;
    },
    // 更新会员信息
    updatememberInfo(state, payload) {
        state.memberInfo = payload;
    },
    // 更新是否重名状态
    updateStatusDuplicate(state, payload) {
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
    },
    getCategorys(state) {
        Vue.http.get(url.categorysList).then((response) => {
            let result = response.data;
            if (result != null) {
                log.debug('updateStateCategorys');
                state.categorys = result;
            }
        });
    },
    // 更新购买物品返回状态
    updateStatusRecord(state, payload) {
        state.status.record = payload;
    },
    // 更新提醒卖家返回状态
    updateStatusAlert(state, payload) {
        state.status.alert = payload;
    },
    // 购物订单
    updateRecordID(state, payload) {
        state.recordID = payload;
    },
    // 清空购物车
    clearCars(state) {
        state.categorys.forEach((category) => {
            category.list.forEach((food) => {
                food.count = 0;
            });
        });
    },
    // 订单列表
    updateRecordList(state, payload) {
        state.recordList = payload;
    }
};
