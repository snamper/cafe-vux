import Vue from 'vue';
import { getCategoriedProducts, getRecordList, saveRecordList, alterStatus } from '@/api/product';
const product = {
  state: {
    // 全部商品
    goods: [],
    // 订单
    records: [],
    // 提交的订单 需要在真正提交订单的时候去清空
    carts: [],
    // 是否显示loading页面
    isLoading: false,
    // 快递价格
    deliverPrice: 25
  },
  mutations: {
    UPDATE_GOODS: (state, payload) => {
      state.goods = payload;
    },
    UPDATE_RECORDS: (state, payload) => {
      state.records = payload;
    },
    UPDATE_CARTS: (state, payload) => {
      state.carts = payload;
    },
    UPDATE_LOADING_STATUS: (state, payload) => {
      state.isLoading = payload.isLoading;
    },
    ADD_COUNT: (state, payload) => {
      state.goods.forEach(category => {
        category.list.forEach(good => {
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
    SUB_COUNT: (state, payload) => {
      state.goods.forEach(category => {
        category.list.forEach(good => {
          if (payload.id === good.id) {
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
    SET_COUNT: (state, payload) => {
      state.goods.forEach(category => {
        category.list.forEach(good => {
          if (payload.good.id === good.id) {
            good.count = payload.count;
            return;
          }
        });
      });
    },
    CLEAR_CARTS: state => {
      state.goods.forEach(category => {
        category.list.forEach(good => {
          good.count = 0;
        });
      });
    }
  },
  actions: {
    // 获取分类产品数据
    getGoods: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getCategoriedProducts().then(data => {
          commit('UPDATE_GOODS', data);
          resolve();
        });
      });
    },
    // 提交订单
    submitRecord: ({ commit }, record) => {
      return new Promise((resolve, reject) => {
        saveRecordList(record.amount, record.userId, record.userCode, record.cashOrBalance, record.details).then(data => {
          data.status ? resolve(data.entityCode) : reject(new Error('submit record failed'));
        });
      });
    },
    // 获取订单信息
    getRecords: ({ commit }, userInfo) => {
      return new Promise(resolve => {
        getRecordList(userInfo.userId, userInfo.userCode, userInfo.needDetail).then(data => {
          commit('UPDATE_RECORDS', data);
          resolve();
        });
      });
    },
    // 设置实际选中购物商品
    setCartsgoods({ commit }, payload) {
      return new Promise(resolve => {
        commit('update', {type: 'carts', value: payload});
        resolve();
      });
    },
    // 更新订单状态
    alterStatus({ commit }, status) {
      return new Promise(resolve => {
        alterStatus(status.entityId, status.status).then(data => {
          resolve(data.status);
        });
      });
    },
    // 清空选中的购物车
    clearCarts({ commit }) {
      return new Promise(resolve => {
        commit('UPDATE_CARTS', []);
      });
    }
  }
};

export default product;
