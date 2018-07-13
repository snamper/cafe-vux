import { ajax } from '@/store/utils/ajax';
import { url } from '@/store/utils/consts';
import { initStorage } from '@/utils/storage';
import { getMemberInfo, setModifyData } from '@/store/utils/utils';
// import Utils from '@/utils/MyUtils';
import Logger from 'chivy';
const log = new Logger('store/actions');
export default {
  // 获取分类产品数据
  getGoods(context) {
    return new Promise(resolve => {
      ajax(url.getCategoriedProducts).then(data => {
        context.commit('update', {type: 'goods', value: data});
        resolve();
      });
    });
  },
  // 提交订单
  submitRecord(context, payload) {
    return new Promise((resolve, reject) => {
      ajax(url.saveRecordList, payload).then(data => {
        data.status ? resolve(data.entityCode) : reject(new Error('submit record failed'));
      });
    });
  },
  // 获取订单信息
  getRecords(context, payload) {
    return new Promise(resolve => {
      ajax(url.getRecordList, payload).then(data => {
        context.commit('update', {type: 'records', value: data});
        resolve();
      });
    });
  },
  // 保存配送地址
  saveAddress(context, payload) {
    return new Promise(resolve => {
      ajax(url.saveAddresses, payload).then(data => {
        resolve(data.status);
      });
    });
  },
  // 删除配送地址
  deleteAddress(context, payload) {
    return new Promise(resolve => {
      ajax(url.deleteAddresses, payload).then(data => {
        resolve(data.status);
      });
    });
  },
  // 获取配送地址
  getAddress(context, payload) {
    return new Promise(resolve => {
      ajax(url.getAddresses, payload).then(data => {
        context.commit('update', {type: 'addresses', value: data});
        context.commit('setDefaultAddress');
        resolve();
      });
    });
  },
  setcartsgoods(context, payload) {
    return new Promise(resolve => {
      context.commit('update', {type: 'carts', value: payload});
      resolve();
    });
  },
  alterStatus(context, payload) {
    return new Promise(resolve => {
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
          /* eslint-disable */
          // debugger
          const member = getMemberInfo(data);
          log.warn('member is ' + JSON.stringify(member));
          context.commit('update', {type: 'login', value: member});
          context.commit('update', {type: 'address', value: null});
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
      context.commit('update', {type: 'logout'});
      context.commit('update', {type: 'address', value: null});
      resolve();
    });
  },
  modifyInfo(context, payload) {
    const param = setModifyData(payload);
    return new Promise(resolve => {
      ajax(url.modifyBasicInfo, param).then(data => {
        resolve(data.status);
      });
    });
  },
  initUser(context, payload) {
    return new Promise(resolve => {
      initStorage().then(resp => {
        context.commit('update', {type: 'uuid', value: resp.uuid});
        context.commit('update', {type: 'member', value: resp.member});
        resolve();
      });
    });
  },
  clearCarts(context, payload) {
    return new Promise(resolve => {
      context.commit('update', {type: 'carts', value: []});
    });
  }
};
