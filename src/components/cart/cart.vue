<template>
    <div class="cart-wrapper">
        <div class="cart" v-if="products.length>0">
            <group></group>
            <cell title="总价" :value="total"></cell>
            <cell title="会员价" :value="totalMember"></cell>
            <divider>购物车明细</divider>
            <div class="cartlist" v-for="(product, item) in products" :key="item">
                <cartpanel :product="product"></cartpanel>
            </div>
            <divider>结算</divider>
            <div class="button">
                <flexbox>
                    <flexbox-item>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button type="primary" @click.native="clear">clear</x-button>
                    </flexbox-item>
                    <flexbox-item>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button type="primary" link="/member">buy</x-button>
                    </flexbox-item>
                    <flexbox-item>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <div class="no-cart" v-else>
            <card :header="{title:'尚未购买商品，请先选择商品购买'}"></card>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Badge, Cell, Group, Divider, Card, XButton, Flexbox, FlexboxItem } from 'vux';
import CartPanel from '../panel/cartpanel';
export default {
    props: {
        categorys: {
            type: Object
        }
    },
    components: {
        Badge,
        Cell,
        Group,
        Divider,
        Card,
        XButton,
        Flexbox,
        FlexboxItem,
        'cartpanel': CartPanel
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
