import { status } from '../common/js/consts';
import Logger from 'chivy';
const log = new Logger('vuex/getters');
export default {
  // 被选择的商品
  selectFoods(state, getters) {
    const foods = [];
    getters.products.forEach((food) => {
      if (food.count > 0) {
        foods.push(food);
      }
    });
    return foods;
  },
  // 总价,总会员价,总数量
  totalAttr(state, getters) {
    const total = {
      normal: 0,
      member: 0,
      count: 0
    };
    getters.selectFoods.forEach((food) => {
      total.normal += food.price * food.count;
      total.member += food.memberPrice * food.count;
      total.count += food.count;
    });
    return total;
  },
  // 所有的商品
  products(state) {
    const products = [];
    if (state.goods !== null) {
      state.goods.forEach((good) => {
        good.list.forEach((food) => {
          products.push(food);
        });
      });
    }
    return products;
  },
  // 滑动显示的商品
  sliders(state, getters) {
    const sliders = [];
    getters.products.forEach((good) => {
        if (good.imageSliderUrl !== '') {
            sliders.push(good);
        }
    });
    return sliders;
  },
  notpay(state) {
    const result = [];
    state.records.forEach(record => {
      if (record.status === status.NOTPAY.key) {
        result.push(record);
      }
    });
    return result;
  },
  success(state) {
    const result = [];
    state.records.forEach(record => {
      if (record.status === status.SUCCESS.key) {
        result.push(record);
      }
    });
    return result;
  },
  refund(state) {
    const result = [];
    state.records.forEach(record => {
      if (record.status === status.REFUND.key) {
        result.push(record);
      }
    });
    return result;
  },
  closed(state) {
    const result = [];
    state.records.forEach(record => {
      if (record.status === status.CLOSED.key) {
        result.push(record);
      }
    });
    return result;
  },
  username(state) {
    log.debug('reserve');
    if (state.User.uuid !== null) {
      return '游客';
    } else if (state.User.member === null) {
      return '游客';
    } else {
      if (state.User.member.nick !== '') {
        return state.User.member.nick;
      } else if (state.User.member.name !== '') {
        return state.User.member.name;
      } else if (state.User.member.phone !== '') {
        return state.User.member.phone;
      } else if (state.User.member.email !== '') {
        return state.User.member.email;
      }
    }
  },
  addressList(state) {
    const result = [];
    state.addresses.forEach(address => {
      result.push({
        id: address.id,
        name: address.name,
        tel: address.mobile,
        address: address.province + address.city + address.county + address.address
      });
    });
    return result;
  }
};
