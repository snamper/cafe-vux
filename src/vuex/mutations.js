import { init, member, clearmember } from '../common/js/storage';
import Vue from 'vue';
import Logger from 'chivy';
const log = new Logger('vuex/mutations');
export default {
  // 初始化UUID
  init(state) {
    state.User = init();
  },
  update(state, payload) {
    if (payload.type === 'goods') {
      state.goods = payload.value;
    } else if (payload.type === 'memberinfo') {
      member(state, payload.value);
    } else if (payload.type === 'loginout') {
      clearmember(state);
    } else if (payload.type === 'records') {
      state.records = payload.value;
    } else if (payload.type === 'carts') {
      state.carts = payload.value;
    } else if (payload.type === 'address') {
      log.debug('now update the address');
      log.debug('print value [' + JSON.stringify(payload.value) + ']');
      state.address = payload.value;
    } else if (payload.type === 'addresses') {
      state.addresses = payload.value;
    }
  },
  clear(state) {
    state.goods.forEach(category => {
      category.list.forEach(good => {
        if (good.count) {
          good.count = 0;
        }
      });
    });
  },
  // 添加
  addCount(state, payload) {
    log.debug('payload is ' + JSON.stringify(payload));
    state.goods.forEach((category) => {
      category.list.forEach((good) => {
        if (payload.good === good) {
          if (!good.count) {
            Vue.set(good, 'count', payload.count);
          } else {
            log.info('before good.count is ' + good.count);
            good.count += payload.count;
            log.info('after good.count is ' + good.count);
          }
        }
      });
    });
  },
  subCount(state, payload) {
    log.debug('payload is ' + JSON.stringify(payload));
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
    log.debug('payload is ' + JSON.stringify(payload));
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
  },
  updateLoadingStatus(state, payload) {
    state.isLoading = payload.isLoading;
  }
};
