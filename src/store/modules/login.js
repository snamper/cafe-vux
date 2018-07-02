import { setMember, setUuid } from '@/utils/storage';

const login = {
  state: {
    uuid: null,
    member: null
  },
  mutations: {
    update(state, payload) {
      switch (payload.type) {
        case 'uuid':
          state.uuid = payload.value;
          break;
        case 'member':
          state.member = payload.value;
          break;
        case 'login':
          state.uuid = null;
          state.member = payload.value;
          setMember(payload.value);
          break;
        case 'logout':
          state.member = null;
          const uuid = setUuid();
          state.uuid = uuid;
          break;
      }
    }
  },
  getters: {

  },
  actions: {
    // 登陆成功后
    login(context, payload) {
      return new Promise(resolve => {
      });
    }
    // 注销成功后
  }
};
export default login;
