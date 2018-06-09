import Vue from 'vue';
import { init, member, clearmember } from '../common/js/storage';
import Logger from 'chivy';
const log = new Logger('vuex/mutations');
export default {
  // 初始化UUID
  init(state) {
    state.User = init();
  },
  addCount(state, payload) {
    state.goods.forEach((category) => {
      category.list.forEach((good) => {
        if (payload === good) {
          if (!good.count) {
            Vue.set(good, 'count', 1);
          } else {
            good.count++;
            log.debug('good count is ' + good.count);
          }
        }
      });
    });
  },
  subCount(state, payload) {
    state.goods.forEach((category) => {
      category.list.forEach((good) => {
        if (payload === good) {
          good.count--;
        }
      });
    });
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
  }
};
