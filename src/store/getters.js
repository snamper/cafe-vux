export default {
  // 购物车选中的商品
  selectFoods(state, getters) {
    /* eslint-disable */
    // debugger
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
  sliders(state, getters) {
    return getters.products.filter(good => good.imageSliderUrl !== '');
  },
  // 计算购物车的商品数量
  info(state, getters) {
    let count = 0;
    getters.selectFoods.forEach(good => {
      count += good.count;
    });
    return count;
  }
};
