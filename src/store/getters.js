const getters = {
  // 所有的商品
  products: state => {
    const goods = [];
    if (state.product.goods.length > 0) {
      state.product.goods.forEach(good => {
        good.list.forEach(food => {
          goods.push(food);
        });
      });
    }
    return goods;
  },
  // 购物车选中的商品
  selectFoods: (state, getters) => {
    return getters.products.filter(food => food.count > 0);
  },
  // 滑动显示的商品
  sliders: (state, getters) => {
    return getters.products.filter(good => good.imageSliderUrl !== '');
  },
  // 计算购物车的商品数量
  info: (state, getters) => {
    let count = 0;
    getters.selectFoods.forEach(good => {
      count += good.count;
    });
    return count;
  }
};

export default getters;
