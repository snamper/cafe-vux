const getters = {
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
};

export default getters;
