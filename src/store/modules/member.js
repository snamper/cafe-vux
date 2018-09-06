import { memberLogin, isExistUserName, createMemberWithBasic, modifyBasicInfo, getMemberById } from '@/api/member';
import { saveAddresses, deleteAddresses, getAddresses, updateAddresses } from '@/api/product';
import { initStorage, setUuid, setMember } from '@/utils/storage';
import { toast } from '@/utils/toast';
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
    /**
     * 1.登陆成功后需要把uuid变为null
     * 2.更新member信息
     * 3.把单个的address设置为null
     */
    LOGIN_IN: (state, payload) => {
      state.uuid = null;
      state.member = payload;
      state.address = null;
      setMember(payload);
    },
    /**
     * 1. 重新设置uuid
     * 2. 重新更新member为null
     * 3. 更新addresses为null
     */
    LOGIN_OUT: state => {
      state.member = null;
      state.addresses = null;
      state.uuid = setUuid();
    },
    SET_DEFAULT_ADDRESS: state => {
      log.info('SET_DEFAULT_ADDRESS');
      log.debug('addresses length is ' + state.addresses.length);
      if (state.addresses.length > 0) {
        log.info('address is more than 0');
        // 遍历看是否存在默认地址
        state.addresses.forEach(address => {
          log.debug('address data in this.addresses is ' + JSON.stringify(address));
          if (address.defaultEntity) {
            log.info('addresses is have default address');
            state.address = address;
          }
        });
        if (Tools.isEmpty(state.address)) {
          log.info('addresses is not set default');
          // 如果没有默认地址，则为地址中的第一个
          state.address = state.addresses[0];
        }
      }
    }
  },
  actions: {
    // 登陆成功后
    /**
     * 登陆成功后需要获取用户基本信息并填充到数据中
     */
    login({commit}, user) {
      return new Promise(resolve => {
        memberLogin(user).then(data => {
          log.debug('memberLogin get response data is ' + JSON.stringify(data));
          const member = Tools.getMemberInfo(data);
          commit('LOGIN_IN', member);
          toast('登陆成功', 'success');
          resolve();
        });
      });
    },
    // 用户名是否重复
    duplicate({commit}, name) {
      log.debug('name is ' + name);
      return new Promise((resolve, reject) => {
        isExistUserName(name).then(data => {
          log.debug('data is ' + JSON.stringify(data));
          if (data.success) {
            log.debug('用户名已重复');
            toast('用户名已重复');
            reject();
          } else {
            log.debug('用户名可以使用');
            resolve();
          }
        });
      });
    },
    // 注册新用户
    resigter({commit}, user) {
      log.debug('user is ' + JSON.stringify(user));
      return new Promise((resolve, reject) => {
        createMemberWithBasic(user).then(data => {
          log.debug('after register return data is ' + JSON.stringify(data));
          const member = Tools.getMemberInfo(data);
          commit('LOGIN_IN', member);
          resolve();
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
      // loading('初始化中....');
      return new Promise((resolve, reject) => {
        /**
       * 从storage中读取用户，并从服务器中获取用户的信息填入到state中
       */
        log.info('initing...');
        const user = initStorage();
        if (Tools.isEmpty(user.member)) {
          commit('UPDATE_UUID', user.uuid);
          commit('UPDATE_MEMBER', user.member);
        } else {
          log.info('get user info from server');
          // 先获取用户
          getMemberById({entityId: user.member.id}).then(data => {
            // log.debug(data);
            const member = Tools.getMemberInfo(data);
            log.debug('member is ' + JSON.stringify(member));
            commit('LOGIN_IN', member);
          }).catch(error => {
            log.error(error);
            commit('UPDATE_MEMBER', user.member);
          });
        }
        resolve();
      });
    },
    // 获取第三方用户登录的账户信息
    getMemberInfo({commit}, user) {
      getMemberById(user).then(data => {
          const member = Tools.getMemberInfo(data);
          log.debug('member is ' + JSON.stringify(member));
          commit('LOGIN_IN', member);
      }).catch(error => {
        log.error(error);
        commit('UPDATE_MEMBER', user.member);
      });
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
          if (Array.isArray(data)) {
            commit('UPDATE_ADDRESSES', data);
          } else {
            commit('UPDATE_ADDRESSES', [data]);
          }
          commit('SET_DEFAULT_ADDRESS');
          resolve();
        });
      });
    }
  }
};

export default member;
