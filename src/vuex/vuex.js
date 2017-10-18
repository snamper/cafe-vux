import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Logger from 'chivy';
const log = new Logger('cafe/Vuex');
Vue.use(Vuex);

const ApiCategorys = '/shop/category/show/ui/getCategoriedProducts.do';
const ApiMemberLogin = '/shop/member/show/ui/memberLogin.do';
const ApiCreateMember = '/shop/member/show/ui/createMember.do';

export const store = new Vuex.Store({
  state: {
    categorys: '',
    member: ''
  },
  getters: {
    products: function(state) {
      let products = [];
      for (let category in state.categorys) {
        state.categorys[category].forEach((product) => {
          products.push(product);
        });
      }
      return products;
    },
    sliders: function(state, getters) {
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
    hots: function(state, getters) {
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
    totalMemberPrice: function(state, getters) {
      let total = 0;
      getters.cartProducts.forEach((product) => {
        total = total + product.count * product.memberPrice;
      });
      return total;
    },
    totalPrice: function(state, getters) {
      let total = 0;
      getters.cartProducts.forEach((product) => {
        total = total + product.count * product.price;
      });
      return total;
    },
    cartProducts: function(state) {
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
    badgeNo: function(state, getters) {
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
    cartList: function(state, getters) {
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
    cartMemberList: function(state, getters) {
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
          let categorys = response.data.data;
          log.debug('AJAX response is ' + JSON.stringify(categorys));
          state.categorys = categorys;
        })
        .catch(function (error) {
          log.error(error);
        });
    },
    countCategorys: function (state, param) {
      log.info('setting count attr in products');
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
      for (let category in this.categorys) {
        this.categorys[category].forEach((product) => {
          product.count = 0;
        });
      }
    },
    login: function(state, playload) {
        log.info('Now get the AJAX to API(' + ApiMemberLogin + ')');
        axios.get(ApiMemberLogin, playload).then((response) => {
            let result = response.data.data;
            log.debug('ajax response is ' + JSON.stringify(result));
            if (result !== null) {
                state.member = result;
                log.debug('state member data is ' + JSON.stringify(state.member));
                log.info('Save login user to sessionStorage');
                sessionStorage.setItem('member', JSON.stringify(state.member));
            }
        });
    },
    getMember: function(state) {
        state.member = JSON.parse(sessionStorage.getItem('member'));
    },
    register: function(state, playload) {
        log.info('Now get the AJAX to API(' + ApiCreateMember + ')');
        axios.get(ApiCreateMember, playload).then((response) => {
            let result = response.data.data;
            log.debug(result);
        });
    },
    testClear: function(state) {
        state.member = '';
    }
  },
  actions: {}
});
