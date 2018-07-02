import { ajax } from '@/store/utils/ajax';
import { url } from '@/store/utils/consts';
import { getMemberInfo, setModifyData } from '@/store/utils/utils';
export default {
  getGoods(context) {
    return new Promise(resolve => {
      ajax(url.getCategoriedProducts).then(data => {
        context.commit('update', {type: 'goods', value: data});
        resolve();
      });
    });
  },
  submitRecord(context, payload) {
    return new Promise((resolve, reject) => {
      ajax(url.saveRecordList, payload).then(data => {
        data.success ? resolve(data.entityCode) : reject(new Error('submit record failed'));
      });
    });
  },
  getRecords(context, payload) {
    return new Promise(resolve => {
      ajax(url.getRecordList, payload).then(data => {
        context.commit('update', {type: 'records', value: data});
        resolve();
      });
    });
  },
  saveAddress(context, payload) {
    return new Promise((resolve, reject) => {
      ajax(url.saveAddresses, payload).then(data => {
        resolve();
      });
    });
  },
  getAddress(context, payload) {
    return new Promise((resolve, reject) => {
      ajax(url.getAddresses, payload).then(data => {
        context.commit('update', {type: 'addresses', value: data});
        resolve();
      });
    });
  },
  setcartsgoods(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('update', {type: 'carts', value: payload});
      resolve();
    });
  },
  alterStatus(context, payload) {
    return new Promise((resolve, reject) => {
      ajax(url.alterStatus, payload).then(resp => {
        resolve(resp.status);
      });
    });
  },
  // 登陆成功后
  login(context, payload) {
    return new Promise((resolve, reject) => {
      ajax(url.memberLogin, payload).then(data => {
        if (data.status) {
          // TODO  可能会有两次请求
          const member = getMemberInfo(data);
          context.commit('update', {type: 'login', value: member});
          resolve();
        } else {
          reject(new Error('login failed'));
        }
      });
    });
  },
  // 用户名是否重复
  duplicate(context, payload) {
    return new Promise(resolve => {
      ajax(url.isExistUserName, payload).then(data => {
        resolve(data.status);
      });
    });
  },
  // 注册新用户
  resigter(context, payload) {
    return new Promise((resolve, reject) => {
      ajax(url.createMember, payload).then(data => {
        if (data.status) {
          const memberinfo = getMemberInfo(data);
          context.commit('update', {type: 'member', value: memberinfo});
          resolve();
        } else {
          reject(new Error('resigter failed'));
        }
      });
    });
  },
  // 注销
  logout(context) {
    return new Promise(resolve => {
      context.commit('update', {type: 'loginout'});
      resolve();
    });
  },
  modifyInfo(context, payload) {
    const param = setModifyData(payload);
    return new Promise(resolve => {
      ajax(url.modifyBasicInfo, param).then(data => {
        resolve(data.success);
      });
    });
  }
};
