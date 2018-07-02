import { setMember, setUuid } from '@/utils/storage';
export default {
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
    case 'goods':
      state.goods = payload.value;
      break;
    case 'records':
      state.records = payload.value;
      break;
    case 'carts':
      state.carts = payload.value;
      break;
    case 'address':
      state.address = payload.value;
      break;
    case 'addresses':
      state.addresses = payload.value;
      break;
    }
  },
  updateLoadingStatus(state, payload) {
    state.isLoading = payload.isLoading;
  }
};

