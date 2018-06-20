import { getCategoriedProducts, memberLogin, isExistUserName, createMember, modifyBasicInfo, saveRecordList, getRecordList, saveAddresses } from '../common/js/ajax';
import { getMemberInfo, setModifyMemberData } from '../common/js/util';
import logger from '../common/js/logger';
import Logger from 'chivy';
const log = new Logger('vuex/actions');
export default {
  getGoods(context) {
    return new Promise(resolve => {
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
    return new Promise(resolve => {
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
        } else {
          reject(new Error('resigter failed'));
        }
      });
    });
  },
  modifyInfo(context, payload) {
    log.debug('modifyInfo payload is ' + JSON.stringify(payload));
    const param = setModifyMemberData(payload);
    log.debug('modifyInfo param is ' + JSON.stringify(param));
    return new Promise(resolve => {
      modifyBasicInfo(param).then((data) => {
        resolve(data.success);
      });
    });
  },
  // 清除member
  loginout(context) {
    return new Promise(resolve => {
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
    return new Promise(resolve => {
      getRecordList(payload).then(data => {
        context.commit('update', {type: 'records', value: data});
        resolve();
      });
    });
  },
  saveAddress(context, payload) {
    return new Promise((resolve, reject) => {
      saveAddresses(payload).then(data => {
        resolve();
      });
    });
  }
};
