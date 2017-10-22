import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Logger from 'chivy';
const log = new Logger('cafe/Vuex');
Vue.use(Vuex);

const ApiCategorys = '/shop/category/show/ui/getCategoriedProducts.do';
const ApiMemberLogin = '/shop/member/show/ui/memberLogin.do';
const ApiCreateMember = '/shop/member/show/ui/createMember.do';
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
          'count': product.count,
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
      log.info('Now get the AJAX to API(' + ApiCategorys + ')');
      axios.get(ApiCategorys).then(function (response) {
          let categorys = response.data;
          log.debug('AJAX response is ' + JSON.stringify(categorys));
          state.categorys = categorys;
        })
        .catch(function (error) {
          log.error(error);
        });
    },
    countCategorys: function (state, param) {
      log.debug('setting count attr in products');
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
      // log.info('Now Clear count');
      for (let category in state.categorys) {
        state.categorys[category].forEach((product) => {
          product.count = 0;
          // log.debug('clear product(' + product.name + ') count  to ' + product.count);
        });
      }
    },
    login: function (state, playload) {
      log.info('Now get the AJAX to API(' + ApiMemberLogin + ')');
      axios.post(ApiMemberLogin, playload).then((response) => {
        let result = response.data;
        log.debug('ajax response is ' + JSON.stringify(result));
        if (result !== null) {
          state.member = result;
          log.debug('state member data is ' + JSON.stringify(state.member));
          log.info('Save login user to sessionStorage');
          sessionStorage.setItem('member', JSON.stringify(state.member));
        }
      });
    },
    getMember: function (state) {
      state.member = JSON.parse(sessionStorage.getItem('member'));
    },
    register: function (state, payload) {
      log.info('Now get the AJAX to API(' + ApiCreateMember + ')');
      axios.post(ApiCreateMember, payload).then((response) => {
        let result = response.data;
        log.debug('response data is ' + JSON.stringify(result));
        if (result !== null) {
          let member = {
            'balance': 0,
            'ID': result.entityid,
            'name': result.entityName
          };
          state.member = member;
        }
      });
    },
    getBuyList: function (state, payload) {
      log.info('Now get the AJAX to API(' + ApiGetRecordList + ')');
      axios.post(ApiGetRecordList, payload).then((response) => {
        let result = response.data;
        state.buylist = result;
      });
    }
  },
  actions: {
    loginin: function (context, payload) {
      context.commit('login', payload);
    },
    registerit: function(context, payload) {
      context.commit('register', payload);
    }
  }
});
