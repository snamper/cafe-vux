import Vue from 'vue';
import { type, session } from '../common/js/values';
import { setSessionStorage } from '../common/js/util';
import Logger from 'chivy';
const log = new Logger('vuex/mutations');
export default {
    // 更新UUID
    updateUUID(state, payload) {
        state.UUID = payload;
    },
    // 更新会员信息
    updatememberInfo(state, payload) {
        state.memberInfo = payload;
        // memberInfo有改变的时候更新
        setSessionStorage(session.memberInfo, state.memberInfo);
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
    // 购物订单
    updateRecordID(state, payload) {
        state.recordID = payload;
    },
    // 清空购物车
    clearCars(state) {
        if (state.categorys !== null) {
            state.categorys.forEach((category) => {
                category.list.forEach((food) => {
                    food.count = 0;
                });
            });
        }
    },
    // 订单列表
    updateRecords(state, payload) {
        state.records = payload;
    },
    // 更新某一项会员信息
    updateOneMemberInfo(state, payload) {
        log.debug('modify type is ' + payload.type);
        if (payload.type === type.name) {
            state.memberInfo.name = payload.name;
        } else if (payload.type === type.mobile) {
            state.memberInfo.phone = payload.mobile;
        } else if (payload.type === type.gender) {
            state.memberInfo.gender = payload.gender;
        } else if (payload.type === type.email) {
            state.memberInfo.email = payload.email;
        } else if (payload.type === type.address) {
            state.memberInfo.area = payload.address;
        } else if (payload.type === type.detailAddress) {
            state.memberInfo.address = payload.detailAddress;
        }
        // memberInfo有改变的时候更新
        setSessionStorage(session.memberInfo, state.memberInfo);
    },
    // 更新showbutton中的confirm状态
    updateShowButtonConfirmStatus(state, payload) {
        state.showbutton.confirm = payload;
    },
    // 更新showbutton中的already状态
    updateShowButtonAlreadyStatus(state, payload) {
        state.showbutton.already = payload;
    }
};
