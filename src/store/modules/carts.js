const carts = {
  state: {
    // 全部商品
    goods: [],
    // 订单
    records: [],
    // 提交的订单 需要在真正提交订单的时候去清空
    carts: [],
    // 配送地址
    address: null,
    // 填写的地址
    addresses: []
  },
  mutations: {

  },
  getters: {
    // 购物车选中的商品
    selectFoods(getters) {
      return getters.products.filter(food => food.count > 0);
    },
    // 所有的商品
    products(state) {
      const products = [];
      if (state.goods.length > 0) {
        state.goods.forEach((good) => {
          good.list.forEach((food) => {
            products.push(food);
          });
        });
      }
      return products;
    },
    // 滑动显示的商品
    sliders(getters) {
      return getters.products.filter(good => good.imageSliderUrl !== '');
    }
  },
  actions: {

  }
};
export default carts;
