import { memberLogin, isExistUserName, createMember, modifyBasicInfo, getMember, getBasicInfoList } from '@/api/member';
import { saveAddresses, deleteAddresses, getAddresses, updateAddresses } from '@/api/product';
import { initStorage } from '@/utils/storage';
import { toast, loading, clear } from '@/utils/toast';
import Tools from '@/utils/tools';
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
      // Tools.setMember(payload);
    },
    LOGIN_OUT: state => {
      state.member = null;
      state.addresses = null;
      state.uuid = Tools.setUuid();
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
    /**
     * 登陆成功后需要获取用户基本信息并填充到数据中
     */
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        memberLogin(user).then(data => {
          if (data.status) {
            const request = Tools.setSearchData(data.id);
            Promise.all([getMember(request), getBasicInfoList(request)]).then(resp => {
              const member = Tools.getMemberInfo(data);
              log.debug('member is ' + JSON.stringify(member));
              commit('LOGIN_IN', member);
              commit('UPDATE_ADDRESS', null);
              toast('登陆成功', 'success');
              resolve();
            });
          } else {
            toast('登陆失败', 'fail');
            reject();
          }
        });
      });
    },
    // 用户名是否重复
    duplicate({commit}, name) {
      log.debug('name is ' + name);
      loading('用户名查询中');
      return new Promise((resolve, reject) => {
        isExistUserName({name}).then(data => {
          if (data.status) {
            clear();
            toast('用户名已重复');
            reject();
          } else {
            clear();
            // toast('用户名未重复');
            resolve();
          }
        });
      });
    },
    // 注册新用户
    resigter({commit}, user) {
      log.debug('user is ' + JSON.stringify(user));
      const load = loading();
      return new Promise((resolve, reject) => {
        createMember(user).then(data => {
          if (data.status) {
            const memberinfo = Tools.getMemberInfo(data);
            commit('LOGIN_IN', memberinfo);
            load.clear();
            toast('新用户注册成功');
            resolve();
          } else {
            load.clear();
            toast('新用户注册失败');
            reject();
          }
        });
      });
    },
    // 注销
    logout({commit}) {
      return new Promise(resolve => {
        commit('LOGIN_OUT');
        resolve();
      });
    },
    // 修改会员信息
    modifyInfo({commit}, user) {
      const param = Tools.setModifyData(user);
      return modifyBasicInfo(param);
    },
    // 初始化用户
    initUser({commit}) {
      /**
       * 从storage中读取用户，并从服务器中获取用户的信息填入到state中
       */
      const user = initStorage();
      if (Tools.isEmpty(user.member)) {
        commit('UPDATE_UUID', user.uuid);
        commit('UPDATE_MEMBER', user.member);
      } else {
        return new Promise(resolve => {
          // 先获取用户
        });
      }
    },
    // 保存配送地址
    saveAddress({commit}, address) {
      return saveAddresses(address);
    },
    // 删除配送地址
    deleteAddress({commit}, address) {
      return deleteAddresses(address);
    },
    modifyAddress({commit}, address) {
      return updateAddresses(address);
    },
    // 获取配送地址
    getAddress({commit}, user) {
      return new Promise(resolve => {
        getAddresses(user).then(data => {
          commit('UPDATE_ADDRESSES', data);
          commit('SET_DEFAULT_ADDRESS');
          resolve();
        });
      });
    }
  }
};

export default member;
