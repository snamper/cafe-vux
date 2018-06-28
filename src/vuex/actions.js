import * as AJAX from '../common/js/ajax';
import { getMemberInfo, setModifyMemberData } from '../common/js/util';
import logger from '../common/js/logger';
import Logger from 'chivy';
const log = new Logger('vuex/actions');
export default {
  getGoods(context) {
    return new Promise(resolve => {
      AJAX.getCategoriedProducts().then((data) => {
        context.commit('update', {type: 'goods', value: data});
        resolve();
      });
    });
  },
  login(context, payload) {
    return new Promise((resolve, reject) => {
      AJAX.memberLogin(payload).then(data => {
        if (data.status) {
          const memberinfo = getMemberInfo(data);
          log.debug('reorganization data is ' + logger(memberinfo));
          context.commit('update', {type: 'memberinfo', value: memberinfo});
          data.status ? resolve() : reject(new Error('login failed'));
        } else {
          reject(new Error('login failed'));
        }
      });
    });
  },
  duplicate(context, payload) {
    return new Promise(resolve => {
      AJAX.isExistUserName(payload).then(data => {
        resolve(data.status);
      });
    });
  },
  resigter(context, payload) {
    return new Promise((resolve, reject) => {
      AJAX.createMember(payload).then((data) => {
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
      AJAX.modifyBasicInfo(param).then((data) => {
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
      AJAX.saveRecordList(payload).then(data => {
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
      AJAX.getRecordList(payload).then(data => {
        context.commit('update', {type: 'records', value: data});
        resolve(true);
      });
    });
  },
  saveAddress(context, payload) {
    return new Promise((resolve, reject) => {
      AJAX.saveAddresses(payload).then(data => {
        resolve();
      });
    });
  },
  getAddress(context, payload) {
    return new Promise((resolve, reject) => {
      AJAX.getAddresses(payload).then(data => {
        context.commit('update', {type: 'addresses', value: data});
        resolve();
      });
    });
  },
  setcartsgoods(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('update', {type: 'records', value: payload});
      resolve();
    });
  }
};
