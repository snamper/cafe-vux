<template>
    <div class="cart-wrapper">
        <div class="cartlist-wrapper">
            <cartlist :categorys="categorys"></cartlist>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import CartList from '@/components/cart/cartlist';
export default {
    props: {
        categorys: {
            type: Object
        },
        member: {
            type: Object
        }
    },
    components: {
        'cartlist': CartList
    },
    computed: {
        total: function() {
            let total = 0;
            this.products.forEach((product) => {
                total = total + product.count * product.price;
            });
            return '￥' + total + '元';
        },
        totalMember: function() {
            let total = 0;
            this.products.forEach((product) => {
                total = total + product.count * product.memberPrice;
            });
            return '￥' + total + '元';
        },
        products: function() {
            let products = [];
            for (let category in this.categorys) {
                this.categorys[category].forEach((product) => {
                    if (product.count > 0) {
                       products.push(product);
                    }
                });
            }
            return products;
        }
    },
    methods: {
        clear: function() {
            for (let category in this.categorys) {
                this.categorys[category].forEach((product) => {
                    product.count = 0;
                });
            }
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
