import { getSessionStorage, setSessionStorage, removeSessionStorage } from '../common/js/util';
import { session, expressType } from '../common/js/consts';
import Logger from 'chivy';
import Vue from 'vue';
const log = new Logger('vuex/mutations');
const uuidv4 = require('uuid/v4');
export default {
    // 初始化UUID
    initUUID(state) {
        /**
         * 1. 读取LocalStoage是否存在MemberInfo数据，如果有则保存到state中
         * 2. 没有数据则生成UUID数据并写入到LocalStoage中
         */
        let memberInfo = getSessionStorage(session.memberInfo);
        if (memberInfo !== null) {
            log.debug('memberInfo is ' + memberInfo);
            log.debug(typeof (memberInfo));
            // 保存到state中
            state.currentUser.memberInfo = memberInfo;
        } else {
            let uuid = getSessionStorage(session.uuid);
            if (uuid === null) {
                uuid = uuidv4();
                log.debug('UUID is ' + uuid);
                // 写入到LocalStorage
                setSessionStorage(session.uuid, uuid);
            }
            // 保存到uuid到state中
            state.currentUser.UUID = uuid;
        }
    },
    clearUUID(state) {
        state.currentUser.UUID = '';
        removeSessionStorage(session.uuid);
    },
    // 注销用户
    logout(state) {
        state.currentUser.memberInfo = null;
        removeSessionStorage(session.memberInfo);
    },
    // 更新商品
    updateStateCategorys(state, payload) {
        state.categorys = payload;
    },
    // 更新loading状态
    updateLoadingStatus(state, payload) {
        state.isLoading = payload.isLoading;
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
    // 更新会员信息
    updatememberInfo(state, payload) {
        state.currentUser.memberInfo = payload;
        // memberInfo有改变的时候更新
        setSessionStorage(session.memberInfo, state.currentUser.memberInfo);
    },
    // 更新某一项会员信息
    updateOneMemberInfo(state, payload) {
        log.debug('develier param is ' + JSON.stringify(payload));
        log.debug('modify type is ' + payload.type);
        if (payload.type === expressType.name) {
            state.currentUser.memberInfo.name = payload.name;
        } else if (payload.type === expressType.mobile) {
            state.currentUser.memberInfo.phone = payload.mobile;
        } else if (payload.type === expressType.gender) {
            state.currentUser.memberInfo.gender = payload.gender;
        } else if (payload.type === expressType.email) {
            state.currentUser.memberInfo.email = payload.email;
        } else if (payload.type === expressType.address) {
            state.currentUser.memberInfo.area = payload.address;
        } else if (payload.type === expressType.detailAddress) {
            state.currentUser.memberInfo.address = payload.detailAddress;
        } else if (payload.type === expressType.nick) {
            state.currentUser.memberInfo.nick = payload.nick;
        }
        // memberInfo有改变的时候更新
        setSessionStorage(session.memberInfo, state.memberInfo);
    },
    // 订单列表
    updateRecords(state, payload) {
        state.recordInfo.records = payload;
    },
    // 购物订单
    updateRecordID(state, payload) {
        state.recordInfo.recordID = payload;
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
    // 更新showbutton中的confirm状态
    updateShowButtonConfirmStatus(state, payload) {
        state.showbutton.confirm = payload;
    },
    // 更新showbutton中的already状态
    updateShowButtonAlreadyStatus(state, payload) {
        state.showbutton.already = payload;
    }
};
