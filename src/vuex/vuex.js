import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Logger from 'chivy';
const log = new Logger('cafe/Vuex');
Vue.use(Vuex);

const ApiCategorys = '/shop/category/show/ui/getCategoriedProducts.do';
const ApiGetRecordList = '/shop/product/show/ui/getRecordList.do';
export const store = new Vuex.Store({
  state: {
    categorys: '',
    member: '',
    buylist: ''
  },
  getters: {
    products: function (state) {
      let products = [];
      for (let category in state.categorys) {
        state.categorys[category].forEach((product) => {
          products.push(product);
        });
      }
      return products;
    },
    sliders: function (state, getters) {
      const sliders = [];
      getters.products.forEach((product) => {
        if (product.slider) {
          sliders.push({
            'img': product.imageSliderUrl
          });
        }
      });
      return sliders;
    },
    hots: function (state, getters) {
      const hots = [];
      getters.products.forEach((product) => {
        if (product.canBook) {
          hots.push({
            'img': product.imageUrl
          });
        }
      });
      return hots;
    },
    totalMemberPrice: function (state, getters) {
      let total = 0;
      getters.cartProducts.forEach((product) => {
        total = total + product.count * product.memberPrice;
      });
      return total;
    },
    totalPrice: function (state, getters) {
      let total = 0;
      getters.cartProducts.forEach((product) => {
        total = total + product.count * product.price;
      });
      return total;
    },
    cartProducts: function (state) {
      let products = [];
      for (let category in state.categorys) {
        state.categorys[category].forEach((product) => {
          if (product.count > 0) {
            products.push(product);
          }
        });
      }
      return products;
    },
    badgeNo: function (state, getters) {
      let badgeNo = 0;
      getters.cartProducts.forEach(product => {
        badgeNo = badgeNo + product.count;
      });
      if (badgeNo === 0) {
        return '';
      } else {
        return String(badgeNo);
      }
    },
    cartList: function (state, getters) {
      let products = [];
      getters.cartProducts.forEach(product => {
        let cartProduct = {
          'productId': product.id,
          'number': product.count,
          'amount': product.count * product.price
        };
        products.push(cartProduct);
      });
      return products;
    },
    cartMemberList: function (state, getters) {
      let products = [];
      getters.cartProducts.forEach(product => {
        let cartProduct = {
          'productId': product.id,
          'count': product.count,
          'amount': product.count * product.memberPrice
        };
        products.push(cartProduct);
      });
      return products;
    }
  },
  mutations: {
    initCategorys: function (state) {
      log.debug('Now get the AJAX to API(' + ApiCategorys + ')');
      axios.get(ApiCategorys).then(function (response) {
          let categorys = response.data;
          log.debug('AJAX API(' + ApiCategorys + ')response is ' + JSON.stringify(categorys));
          state.categorys = categorys;
        })
        .catch(function (error) {
          log.error(error);
        });
    },
    countCategorys: function (state, param) {
      log.debug('setting count attr in product: ' + JSON.stringify(param));
      for (let category in state.categorys) {
        state.categorys[category].forEach((product) => {
          if (param === product) {
            if (!product.count) {
              Vue.set(product, 'count', 1);
            } else {
              product.count++;
            }
          }
        });
      }
    },
    clearCount: function (state) {
      log.info('Now clear count');
      for (let category in state.categorys) {
        state.categorys[category].forEach((product) => {
          product.count = 0;
        });
      }
      log.info('Clear count finished');
    },
    saveMember: function (state, payload) {
      log.debug('before save member, the member is ' + JSON.stringify(state.member));
      let member = {
        'balance': payload.balance,
        'id': payload.id,
        'name': payload.name
      };
      state.member = member;
      log.debug('After save member, the member is ' + JSON.stringify(state.member));
    },
    getMember: function (state) {
      state.member = JSON.parse(sessionStorage.getItem('member'));
      log.debug('Get member from sesionstorage is ' + JSON.stringify(state.member));
    },
    getBuyList: function (state, payload) {
      log.debug('Now get the AJAX to API(' + ApiGetRecordList + ')');
      axios.post(ApiGetRecordList, payload).then((response) => {
        let result = response.data;
        log.debug('AJAX API(' + ApiGetRecordList + ') response is ' + JSON.stringify(result));
        state.buylist = result;
      });
    },
    loginout: function(state) {
      state.member = '';
      state.buylist = '';
      sessionStorage.removeItem('member');
    }
  },
  actions: {
  }
});
