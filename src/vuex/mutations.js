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
            good.count += payload.count;
          }
          log.debug('count is ' + payload.good.count);
        }
      });
    });
  }
};
