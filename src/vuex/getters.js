import Logger from 'chivy';
const log = new Logger('cafe/getters');

export const getter = {
    selectFoods(state) {
        log.info('run selectFoods');
        log.debug('show categorys' + JSON.stringify(state.categorys));
        let foods = [];
        for (let index in state.categorys) {
            this.categorys[index].forEach((product) => {
                if (product.count) {
                    log.debug('add ' + product.name + ' to selectfoold');
                    foods.push(product);
                }
            });
        }
        return foods;
    },
    totalPrice(state, getters) {
        let total = 0;
        getters.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
    }
};
