import { status } from '../common/js/consts';
import Logger from 'chivy';
const log = new Logger('vuex/getters');
export default {
  // 被选择的商品
  selectFoods(state, getters) {
    return getters.products.filter(food => food.count > 0);
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
  totalCarts(state) {
    const total = {
      normal: 0,
      member: 0,
      count: 0
    };
    state.carts.forEach(food => {
      total.normal += food.price * food.count;
      total.member += food.memberPrice ? food.memberPrice : 0 * food.count;
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
    return getters.products.filter(good => good.imageSliderUrl !== '');
  },
  success(state) {
    return state.records.filter(record => record.status === status.SUCCESS.key);
  },
  refund(state) {
    return state.records.filter(record => record.status === status.REFUND.key);
  },
  closed(state) {
    return state.records.filter(record => record.status === status.CLOSED.key);
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
