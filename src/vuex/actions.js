import { setSessionStorage, getSessionStorage, gender, removeSessionStorage } from '../common/js/util';
import { session, url, type } from '../common/js/values';
import Vue from 'vue';
import { AjaxPlugin } from 'vux';
import Logger from 'chivy';
const log = new Logger('vuex/actions');
const uuidv4 = require('uuid/v4');
Vue.use(AjaxPlugin);

export default {
    // 初始化uuid
    initUUID(context) {
        return new Promise((resolve, reject) => {
            // 读取sessionStorage中是否存在UUID，如果存在则写入state中，如果不存在，则生成并写入sessionStorage中
            let uuid = getSessionStorage(session.uuid);
            if (uuid === null) {
                log.debug('cannot get uuid from sessionStorage');
                uuid = uuidv4();
                setSessionStorage(session.uuid, uuid);
            }
            log.debug('uuid is ' + JSON.stringify(uuid));
            context.commit('updateUUID', uuid);
            resolve();
        });
    },
    // 登陆动作,提交到服务端后,存入数据的到SessionStorage,并更新state的状态
    // state状态用于判断是否登陆成功用dispatch().then()来操作
    login(context, payload) {
        return new Promise((resolve, reject) => {
            Vue.http.post(url.userLogin, payload).then((response) => {
                let result = response.data;
                // log.debug(JSON.stringify(result));
                if (result.status) {
                    let memberInfo = {
                        'id': result.id,
                        'name': result.name,
                        'point': result.point,
                        'balance': result.balance,
                        'gender': gender(result.gender),
                        'phone': result.phone,
                        'email': result.email,
                        'area': result.area,
                        'address': result.address,
                        'createTime': result.createTime
                    };
                    context.commit('updatememberInfo', memberInfo);
                    // 存储到sessionStorage中
                    log.info('Save register user to sessionStorage');
                    setSessionStorage(session.memberInfo, memberInfo);
                    // 更新登陆状态
                    context.commit('updateStatusLogin', true);
                    resolve();
                } else {
                    // 更新登陆状态
                    context.commit('updateStatusLogin', false);
                    resolve();
                }
            });
        });
    },
    // 注册动作,成功后返回数据存入memberInfo中
    resigter(context, payload) {
        return new Promise((resolve, reject) => {
            Vue.http.post(url.userRegister, payload).then((response) => {
                let result = response.data;
                log.debug(JSON.stringify(result));
                if (result.status) {
                    let memberInfo = {
                        'id': result.entityId,
                        'name': '',
                        'point': 0,
                        'balance': 0,
                        'gender': '',
                        'phone': result.entityName,
                        'email': '',
                        'area': '',
                        'address': '',
                        'createTime': result.createTime
                    };
                    context.commit('updatememberInfo', memberInfo);
                    // 存储到sessionStorage中
                    log.info('Save register user to sessionStorage');
                    setSessionStorage(session.memberInfo, memberInfo);
                    // 更新登陆状态
                    context.commit('updateStatusLogin', true);
                    resolve();
                } else {
                    context.commit('updateStatusLogin', false);
                    resolve();
                }
            });
        });
    },
    // 是否有重复的用户名或者邮箱名
    duplicate(context, payload) {
        return new Promise((resolve, reject) => {
            Vue.http.post(url.userRegister, payload).then((response) => {
                let result = response.data;
                // 检测是否重名
                context.commit('updateStatusDuplicate', result.status);
                resolve();
            });
        });
    },
    // 获取商品分类数据
    getCategorys(context) {
        return new Promise((resolve, reject) => {
            Vue.http.get(url.categorysList).then((response) => {
                let result = response.data;
                if (result != null) {
                    log.debug('updateStateCategorys');
                    context.commit('updateStateCategorys', result);
                    resolve();
                }
            });
        });
    },
    // 购买商品提交
    submitRecord(context, payload) {
        return new Promise((resolve, reject) => {
            Vue.http.post(url.buyGoods, payload).then((response) => {
                let result = response.data;
                if (result.success) {
                    context.commit('updateRecordID', result.entityId);
                    context.commit('updateStatusRecord', true);
                } else {
                    log.error('submitRecord failed');
                    context.commit('updateStatusRecord', false);
                }
                resolve();
            });
        });
    },
    // 提醒卖家
    alertStatus(context, payload) {
        return new Promise((resolve, reject) => {
            Vue.http.post(url.recordStatus, payload).then((response) => {
                let result = response.data;
                if (result.success) {
                    context.commit('updateStatusAlert', true);
                    resolve();
                } else {
                    context.commit('updateStatusAlert', false);
                    resolve();
                }
            });
        });
    },
    // 获取订单信息
    getRecordList(context, payload) {
        return new Promise((resolve, reject) => {
            Vue.http.post(url.recordList, payload).then((response) => {
                let result = response.data;
                if (result.length !== 0) {
                    context.commit('updateRecordList', result);
                    resolve();
                }
            });
        });
    },
    // 注销用户
    logout(context) {
        return new Promise((resolve, reject) => {
            // 重置登陆标志位
            context.commit('updateStatusLogin', false);
            // 清空MemberInfo内容
            context.commit('updatememberInfo', null);
            // 清空Session中的内容
            removeSessionStorage(session.memberInfo);
        });
    },
    // 修改信息
    modifyMemberInfo(context, payload) {
        return new Promise((resolve, reject) => {
            let data = null;
            if (payload.type === type.name) {
                data = {
                    userId: payload.userId,
                    name: payload.name
                };
            } else if (payload.type === type.mobile) {
                data = {
                    userId: payload.userId,
                    mobile: payload.mobile
                };
            } else if (payload.type === type.gender) {
                data = {
                    userId: payload.userId,
                    gender: payload.gender
                };
            } else if (payload.type === type.email) {
                data = {
                    userId: payload.userId,
                    email: payload.email
                };
            } else if (payload.type === type.address) {
                data = {
                    userId: payload.userId,
                    address: payload.address
                };
            } else if (payload.type === type.detailAddress) {
                data = {
                    userId: payload.userId,
                    detailAddress: payload.detailAddress
                };
            }
            log.debug(JSON.stringify(data));
            Vue.http.post(url.basicInfo, payload).then((response) => {
                let result = response.data;
                if (result.success) {
                    context.commit('updateStatusInfo', true);
                    resolve();
                } else {
                    context.commit('updateStatusInfo', false);
                    resolve();
                }
            });
        });
    }
};
