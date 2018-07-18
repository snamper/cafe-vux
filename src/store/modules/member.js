import { memberLogin, isExistUserName, createMember, modifyBasicInfo, saveAddresses, deleteAddresses, getAddresses } from '@/api/member';
import { setMember, setUuid, initStorage } from '@/utils/storage';
import { getMemberInfo, setModifyData } from '@/utils/memberInfo';
import Logger from 'chivy';
const log = new Logger('store/modules/member');
const member = {
  state: {
    // UUID
    uuid: null,
    // 会员信息
    member: null,
    // 当前使用的地址
    address: null,
    // 记录的收货人地址 非会员就是一个，会员则是多个
    addresses: []
  },
  mutations: {
    UPDATE_UUID: (state, payload) => {
      state.uuid = payload;
    },
    UPDATE_MEMBER: (state, payload) => {
      state.member = payload;
    },
    UPDATE_ADDRESS: (state, payload) => {
      state.address = payload;
    },
    UPDATE_ADDRESSES: (state, payload) => {
      state.addresses = payload;
    },
    LOGIN_IN: (state, payload) => {
      state.uuid = null;
      state.member = payload;
      setMember(payload);
    },
    LOGIN_OUT: state => {
      state.member = null;
      state.uuid = setUuid();
    },
    SET_DEFAULT_ADDRESS: state => {
      // 遍历看是否存在默认地址
      state.addresses.forEach(address => {
        if (address.defaultEntity) {
          state.address = address;
        }
      });
      // 如果没有默认地址，则为地址中的第一个
      state.address = state.addresses[0];
    }
  },
  actions: {
    // 登陆成功后
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        memberLogin(user.name, user.passWd).then(data => {
          if (data.status) {
            const member = getMemberInfo(data);
            commit('LOGIN_IN', member);
            commit('UPDATE_ADDRESS', null);
            resolve();
          } else {
            reject(new Error('login failed'));
          }
        });
      });
    },
    // 用户名是否重复
    duplicate({commit}, name) {
      return new Promise(resolve => {
        isExistUserName(name).then(data => {
          resolve(data.status);
        });
      });
    },
    // 注册新用户
    resigter({commit}, user) {
      return new Promise((resolve, reject) => {
        createMember(user.mobile, user.passWd).then(data => {
          log.debug('RESPONSE DATA IS ' + JSON.stringify(data));
          if (data.status) {
            const memberinfo = getMemberInfo(data);
            commit('UPDATE_MEMBER', memberinfo);
            commit('LOGIN_IN', memberinfo);
          }
          resolve(data.status);
        });
      });
    },
    // 注销
    logout({commit}) {
      return new Promise(resolve => {
        commit('LOGIN_OUT');
        commit('UPDATE_ADDRESS', null);
        resolve();
      });
    },
    // 修改会员信息
    modifyInfo({commit}, user) {
      const param = setModifyData(user);
      return new Promise(resolve => {
        modifyBasicInfo(param.userId, param.name, param.mobile, param.gender, param.email, param.address, param.detailAddress).then(data => {
          resolve(data.status);
        });
      });
    },
    // 初始化用户
    initUser({commit}, payload) {
      return new Promise(resolve => {
        initStorage().then(resp => {
          commit('UPDATE_UUID', resp.uuid);
          commit('UPDATE_MEMBER', resp.member);
          resolve();
        });
      });
    },
    // 保存配送地址
    saveAddress({commit}, address) {
      return new Promise(resolve => {
        saveAddresses(address.memberId, address.name, address.province, address.city, address.county, address.address, address.mobile, address.code, address.defaultEntity).then(data => {
          resolve(data.status);
        });
      });
    },
    // 删除配送地址
    deleteAddress({commit}, address) {
      return new Promise(resolve => {
        deleteAddresses(address.entityId).then(data => {
          resolve(data.status);
        });
      });
    },
    // 获取配送地址
    getAddress({commit}, user) {
      return new Promise(resolve => {
        getAddresses(user.entityId).then(data => {
          commit('UPDATE_ADDRESSES', data);
          commit('SET_DEFAULT_ADDRESS');
          resolve();
        });
      });
    }
  }
};

export default member;
