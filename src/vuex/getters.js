import Logger from 'chivy';
const log = new Logger('vuex/getters');
export default {
  selectFoods(state) {
    let foods = [];
    if (state.categorys !== '') {
        state.categorys.forEach((category) => {
            // log.debug('list is ' + JSON.stringify(category));
            category.list.forEach((food) => {
                if (food.count > 0) {
                    // log.debug('food is ' + JSON.stringify(food));
                    log.info('add ' + food.name + ' to selectFoods');
                    foods.push(food);
                }
            });
        });
    }
    return foods;
  },
  products(state) {
    let products = [];
    if (state.categorys !== '') {
        state.categorys.forEach((category) => {
            category.list.forEach((food) => {
                products.push(food);
            });
        });
    }
    return products;
  },
  sliders(state, getters) {
    const sliders = [];
    getters.products.forEach((product) => {
        if (product.slider && sliders.length < 10) {
            sliders.push({
                'img': product.imageSliderUrl
            });
        }
    });
    /* if (state.categorys !== '') {
        state.categorys.forEach((category) => {
            category.list.forEach((food) => {
                // 超过10个新品的时候就不再添加了
                if (food.slider && sliders.length < 10) {
                    sliders.push({
                        'img': food.imageSliderUrl
                    });
                }
            });
        });
    } */
    return sliders;
  },
  hots(state, getters) {
    const hots = [];
    getters.products.forEach((product) => {
        if (product.canBook) {
            hots.push({
                'img': product.imageSliderUrl,
                'name': product.name,
                'price': product.price
            });
        }
    });
    return hots;
  }
};
