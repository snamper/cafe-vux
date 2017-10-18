<template>
    <div class="cartlist-wrapper">
        <logo></logo>
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
                        <x-button @click.native="clear">清除</x-button>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button link="/buy">支付</x-button>
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
import { Cell, Group, Divider, Card, XButton, Flexbox, FlexboxItem } from 'vux';
import CartPanel from '../panel/cartpanel';
import Logo from '@/components/logo/logo';
export default {
    components: {
        Cell,
        Group,
        Divider,
        Card,
        XButton,
        Flexbox,
        FlexboxItem,
        'cartpanel': CartPanel,
        'logo': Logo
    },
    computed: {
        total: function() {
            return '￥' + this.$store.getters.totalPrice + '元';
        },
        totalMember: function() {
            return '￥' + this.$store.getters.totalMemberPrice + '元';
        },
        products: function() {
            return this.$store.getters.cartProducts;
        }
    },
    methods: {
        clear: function() {
            this.$store.commit('clearCount');
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartlist-wrapper
    .cart
        .button
            .vux-flexbox
                .vux-flexbox-item
                    .weui-btn
                        color: #fff
                        background-color: #58B7FF
</style>
