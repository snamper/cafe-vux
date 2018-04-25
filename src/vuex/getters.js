export default {
    // 被选择的商品
    selectFoods(state, getters) {
        let foods = [];
        getters.products.forEach((food) => {
            if (food.count > 0) {
                foods.push(food);
            }
        });
        return foods;
    },
    // 所有的商品
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
    // 滑动显示的商品
    sliders(state, getters) {
        let sliders = [];
        getters.products.forEach((product) => {
            sliders.push({
                'img': product.imageSliderUrl
            });
        });
        return sliders;
    },
    // 总价,总会员价,总数量
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
        return total;
    }
};
