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
        log.debug('login post data is ' + JSON.stringify(payload));
        return new Promise((resolve, reject) => {
            Vue.http.post(url.userLogin, payload).then((response) => {
                let result = response.data;
                log.debug('login response is ' + JSON.stringify(result));
                if (result.status) {
                    if (payload.valid) {
                        log.debug('check pwd');
                        // 校验密码用
                        context.commit('updateStatusOld', true);
                        resolve();
                    } else {
                        log.debug('normal login');
                        let memberInfo = {
                            'id': result.id,
                            'nick': result.nick,
                            'name': result.name,
                            'point': result.point,
                            'balance': result.balance,
                            'gender': gender(result.gender),
                            'phone': result.mobile,
                            'email': result.email,
                            'area': result.area,
                            'address': result.address,
                            'createTime': result.createTime
                        };
                        context.commit('updatememberInfo', memberInfo);
                        resolve();
                    }
                } else {
                    reject(new Error('login failed'));
                }
            });
        });
    },
    // 注册动作,成功后返回数据存入memberInfo中
    resigter(context, payload) {
        log.debug('resigter post data is ' + JSON.stringify(payload));
        return new Promise((resolve, reject) => {
            Vue.http.post(url.userRegister, payload).then((response) => {
                let result = response.data;
                log.debug('resigter response is ' + JSON.stringify(result));
                if (result.status) {
                    log.debug('resigter response is ' + result.status);
                    let memberInfo = {
                        'id': result.id,
                        'nick': '',
                        'name': '',
                        'point': 0,
                        'balance': 0,
                        'gender': '',
                        'phone': result.mobile,
                        'email': '',
                        'area': '',
                        'address': '',
                        'createTime': result.createTime
                    };
                    context.commit('updatememberInfo', memberInfo);
                    // 存储到sessionStorage中
                    log.info('Save register user to sessionStorage');
                    setSessionStorage(session.memberInfo, memberInfo);
                    resolve();
                } else {
                    reject(new Error('resigter failed'));
                }
            });
        });
    },
    // 是否有重复的用户名或者邮箱名
    duplicate(context, payload) {
        log.debug('duplicate post data is ' + JSON.stringify(payload));
        return new Promise((resolve, reject) => {
            Vue.http.post(url.existUser, payload).then((response) => {
                let result = response.data;
                log.debug('duplicate response is ' + JSON.stringify(result));
                if (result.status) {
                    resolve();
                } else {
                    reject(new Error('not duplicate name found'));
                }
            });
        });
    },
    // 获取商品分类数据
    getCategorys(context) {
        return new Promise((resolve, reject) => {
            Vue.http.get(url.categorysList).then((response) => {
                let result = response.data;
                log.debug('getCategorys response is ' + JSON.stringify(result));
                if (result != null) {
                    log.debug('updateStateCategorys');
                    context.commit('updateStateCategorys', result);
                    resolve();
                } else {
                    reject(new Error('get Categorys failed'));
                }
            });
        });
    },
    // 购买商品提交
    submitRecord(context, payload) {
        log.debug('submitRecord post data is ' + JSON.stringify(payload));
        return new Promise((resolve, reject) => {
            Vue.http.post(url.buyGoods, payload).then((response) => {
                let result = response.data;
                log.debug('submitRecord response is ' + JSON.stringify(result));
                if (result.success) {
                    log.debug('response recordId is ' + result.entityId);
                    context.commit('updateRecordID', result.entityId);
                    resolve();
                } else {
                    reject(new Error('submit record failed'));
                }
            });
        });
    },
    // 提醒卖家
    alertStatus(context, payload) {
        log.debug('alertStatus post data is ' + JSON.stringify(payload));
        return new Promise((resolve, reject) => {
            Vue.http.post(url.recordStatus, payload).then((response) => {
                let result = response.data;
                log.debug('alertStatus response is ' + JSON.stringify(result));
                if (result.success) {
                    resolve();
                } else {
                    reject(new Error('alert record status failed'));
                }
            });
        });
    },
    // 获取订单信息
    getRecordList(context, payload) {
        log.debug('getRecordList post data is ' + JSON.stringify(payload));
        return new Promise((resolve, reject) => {
            Vue.http.post(url.recordList, payload).then((response) => {
                let result = response.data;
                log.debug('getRecordList response is ' + JSON.stringify(result));
                if (result.length !== 0) {
                    context.commit('updateRecords', result);
                    resolve();
                } else {
                    reject(new Error('record list is empty'));
                }
            });
        });
    },
    // 注销用户
    logout(context) {
        return new Promise((resolve, reject) => {
            // 清空MemberInfo内容
            context.commit('updatememberInfo', null);
            // 清空Session中的内容
            removeSessionStorage(session.memberInfo);
            resolve();
        });
    },
    // 修改信息
    modifyMemberInfo(context, payload) {
        log.debug('modifyMemberInfo post data is ' + JSON.stringify(payload));
        return new Promise((resolve, reject) => {
            let data = null;
            if (payload.type === type.name) {
                data = {
                    userId: payload.userId,
                    name: payload.name
                };
            } else if (payload.type === type.nick) {
                data = {
                    userId: payload.userId,
                    nick: payload.nick
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
                log.debug('modifyMemberInfo response is ' + JSON.stringify(result));
                if (result.success) {
                    resolve();
                } else {
                    reject(new Error('modify member info failed'));
                }
            });
        });
    },
    modifyPwd(context, payload) {
        log.debug('modifyPwd post data is ' + JSON.stringify(payload));
        return new Promise((resolve, reject) => {
            Vue.http.post(url.modifypwd, payload).then((response) => {
                let result = response.data;
                log.debug('modifyPwd response is ' + JSON.stringify(result));
                if (result.success) {
                    resolve();
                } else {
                    reject(new Error('modify password failed'));
                }
            });
        });
    }
};
