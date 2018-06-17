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
    } else if (payload.type === 'carts') {
      const good = payload.value;
      state.carts.push(good);
      /* const good = payload.value;
      if (state.carts.length === 0) {
        state.carts.push(good);
      } else {
        let flag = false;
        state.carts.forEach(product => {
          if (product.id === good.id) {
            product.count += good.count;
          } else {
            flag = true;
          }
        });
        if (flag) {
          state.carts.push(good);
        }
      } */
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
  test(state) {
    log.debug('测试数据 ' + JSON.stringify(state.carts));
  }
};
