// import Logger from 'chivy';
// const log = new Logger('vuex/getters');
export default{
    selectFoods(state, getters) {
        let foods = [];
        getters.products.forEach((food) => {
            if (food.count > 0) {
                foods.push(food);
            }
        });
        return foods;
    },
    products(state) {
        let products = [];
        let categorys = state.categorys;
        if (categorys !== null) {
            categorys.forEach((category) => {
                category.list.forEach((food) => {
                    products.push(food);
                });
            });
        }
        return products;
    },
    sliders(state, getters) {
        let sliders = [];
        getters.products.forEach((product) => {
            sliders.push({
                'img': product.imageSliderUrl
            });
        });
        return sliders;
    },
    totalAttr(state, getters) {
        let normal = 0;
        let member = 0;
        let count = 0;
        getters.selectFoods.forEach((food) => {
            normal += food.price * food.count;
            member += food.memberPrice * food.count;
            count += food.count;
        });
        let total = {
            'normal': normal,
            'member': member,
            'count': count
        };
        // log.debug('totalAttr is ' + JSON.stringify(total));
        return total;
    }
};
