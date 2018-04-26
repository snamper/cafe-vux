import { url } from '../common/js/consts';
import { ajaxPost, ajaxGet, setMemberInfo, setModifyMemberData } from '../common/js/util';
import Logger from 'chivy';
const log = new Logger('vuex/actions');

export default {
    // 获取商品分类数据
    getCategorys(context) {
        return new Promise((resolve, reject) => {
            ajaxGet(url.getCategoriedProducts).then((data) => {
                log.info('updateStateCategorys');
                context.commit('updateStateCategorys', data);
                resolve();
            });
        });
    },
    login(context, payload) {
        log.debug('start login action');
        return new Promise((resolve, reject) => {
            ajaxPost(url.memberLogin, payload).then((data) => {
                if (data.status) {
                    if (payload.valild) {
                        log.debug('just check pwd for');
                    } else {
                        log.debug('login success and return memberinfo');
                        context.submit('updatememberInfo', setMemberInfo(data, false));
                    }
                    resolve();
                } else {
                    reject(new Error('login failed'));
                }
            });
        });
    },
    resigter(context, payload) {
        log.debug('start resigter action');
        return new Promise((resolve, reject) => {
            ajaxPost(url.createMember, payload).then((data) => {
                if (data.status) {
                    log.debug('resigter success and return memberinfo');
                    context.submit('updatememberInfo', setMemberInfo(data, false));
                    resolve();
                } else {
                    reject(new Error('resigter failed'));
                }
            });
        });
    },
    duplicate(context, payload) {
        log.debug('start check duplicate user action');
        return new Promise((resolve, reject) => {
            ajaxPost(url.isExistUserName, payload).then((data) => {
                resolve(data.status);
            });
        });
    },
    submitRecord(context, payload) {
        log.debug('start submitRecord action');
        return new Promise((resolve, reject) => {
            ajaxPost(url.saveRecordList, payload).then((data) => {
                if (data.success) {
                    resolve(data.entityId);
                } else {
                    reject(new Error('submit record failed'));
                }
            });
        });
    },
    getRecordList(context, payload) {
        log.debug('start getRecordList action');
        return new Promise((resolve, reject) => {
            ajaxPost(url.getRecordList, payload).then((data) => {
                if (data.length !== 0) {
                    resolve(data);
                } else {
                    reject(new Error('record list is empty'));
                }
            });
        });
    },
    modifyMemberInfo(context, payload) {
        log.debug('start modifyMemberInfo action');
        let param = setModifyMemberData(payload);
        return new Promise((resolve, reject) => {
            ajaxPost(url.modifyBasicInfo, param).then((data) => {
                resolve(data.success);
            });
        });
    },
    modifyPwd(context, payload) {
        log.debug('start modifyPwd action');
        return new Promise((resolve, reject) => {
            ajaxPost(url.modifyPassword, payload).then((data) => {
                resolve(data.success);
            });
        });
    },
    get3rdInfo(context, payload) {
        log.debug('start get3rdInfo action');
        return new Promise((resolve, reject) => {
            ajaxPost(url.getMemberById, payload).then((data) => {
                if (data.status) {
                    resolve(setMemberInfo(data, true));
                } else {
                    reject(new Error('can not get 3rd account info'));
                }
            });
        });
    }
};
