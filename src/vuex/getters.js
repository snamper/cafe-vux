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
  }
};
