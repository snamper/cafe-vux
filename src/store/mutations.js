import { setMember, setUuid } from '@/utils/storage';
import Vue from 'vue';
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
  },
    // 添加
    addCount(state, payload) {
      state.goods.forEach((category) => {
        category.list.forEach((good) => {
          if (payload.good === good) {
            if (!good.count) {
              Vue.set(good, 'count', payload.count);
            } else {
              good.count += payload.count;
            }
          }
        });
      });
    },
    subCount(state, payload) {
      state.goods.forEach((category) => {
        category.list.forEach((good) => {
          if (payload.good === good) {
            if (payload.good.count === 0) {
              good.count = 0;
            } else if (good.count - payload.good.count >= 0) {
              good.count = good.count - payload.good.count;
            } else {
              good.count = 0;
            }
          }
        });
      });
    },
    setCount(state, payload) {
      state.goods.forEach((category) => {
        category.list.forEach((good) => {
          if (payload.good === good) {
            good.count = payload.count;
            return;
          }
        });
      });
    },
    clearCarts(state, payload) {
      state.goods.forEach(category => {
        category.list.forEach(good => {
          good.count = 0;
        });
      });
    }
};

