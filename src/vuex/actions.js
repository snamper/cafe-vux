import { getCategoriedProducts, memberLogin, isExistUserName, createMember, modifyBasicInfo, saveRecordList, getRecordList } from '../common/js/ajax';
import { getMemberInfo, setModifyMemberData } from '../common/js/util';
import logger from '../common/js/logger';
import Logger from 'chivy';
const log = new Logger('vuex/actions');
export default {
  getGoods(context) {
    return new Promise((resolve, reject) => {
      getCategoriedProducts().then((data) => {
        context.commit('update', {type: 'goods', value: data});
        resolve();
      });
    });
  },
  login(context, payload) {
    return new Promise((resolve, reject) => {
      memberLogin(payload).then(data => {
        if (data.status) {
          const memberinfo = getMemberInfo(data);
          log.debug('reorganization data is ' + logger(memberinfo));
          context.commit('update', {type: 'memberinfo', value: memberinfo});
          resolve(data.status);
        } else {
          reject(new Error('login failed'));
        }
      });
    });
  },
  duplicate(context, payload) {
    return new Promise((resolve, reject) => {
      isExistUserName(payload).then(data => {
          resolve(data.status);
      });
    });
  },
  resigter(context, payload) {
    return new Promise((resolve, reject) => {
      createMember(payload).then((data) => {
        if (data.status) {
          const memberinfo = getMemberInfo(data);
          context.commit('update', {type: 'memberinfo', value: memberinfo});
          resolve();
        }
      });
    });
  },
  modifyInfo(context, payload) {
    log.debug('modifyInfo payload is ' + JSON.stringify(payload));
    const param = setModifyMemberData(payload);
    log.debug('modifyInfo param is ' + JSON.stringify(param));
    return new Promise((resolve, reject) => {
      modifyBasicInfo(param).then((data) => {
        resolve(data.success);
      });
    });
  },
  // 清除member
  loginout(context, paylod) {
    return new Promise((resolve, reject) => {
      context.commit('update', {type: 'loginout'});
      resolve(true);
    });
  },
  submitRecord(context, payload) {
    return new Promise((resolve, reject) => {
      saveRecordList(payload).then(data => {
        if (data.success) {
          resolve(data.entityCode);
        } else {
          reject(new Error('submit record failed'));
        }
      });
    });
  },
  getRecords(context, payload) {
    return new Promise((resolve, reject) => {
      getRecordList(payload).then(data => {
        context.commit('update', {type: 'records', value: data});
        resolve();
      });
    });
  },
  add2cart(context, payload) {
    return new Promise(resolve => {
      context.commit('update', {type: 'carts', value: payload});
      resolve(true);
    });
  }
};
