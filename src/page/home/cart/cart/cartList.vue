<template>
    <div class="cart-wrapper">
        <logo></logo>
        <div class="cart" v-if="products.length>0">
            <group></group>
            <cell title="总价" :value="total"></cell>
            <cell title="会员价" :value="totalMember"></cell>
            <divider>购物车明细</divider>
            <div class="cartlist" v-for="(product, item) in products" :key="item">
                <flexbox :gutter="1">
                <flexbox-item :span="1/5">
                    <div class="img-wrapper">
                        <img :src="product.imageUrl" width="100%" height="auto">
                    </div>
                </flexbox-item>
                <flexbox-item :span="4/5">
                    <div class="cart-wrapper">
                        <flexbox :gutter="1">
                            <flexbox-item :span="2/5">
                                <div class="info-wrapper">
                                    <div class="name">{{product.name}}</div>
                                    <div class="price-wrapper">
                                        <span class="price">￥{{product.price}}</span>
                                        <span class="memberprice">会员价: ￥{{product.memberPrice}}</span>
                                    </div>
                                </div>
                            </flexbox-item>
                            <flexbox-item :span="3/5">
                                <div class="buy-wrapper">
                                    <group>
                                        <x-number button-style="round" v-model="product.count" ></x-number>
                                    </group>
                                </div>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </flexbox-item>
            </flexbox>
            </div>
            <divider>结算</divider>
            <div class="button">
                <flexbox>
                    <flexbox-item>
                        <x-button @click.native="clear">清除</x-button>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button link="/home/cart/pay">支付</x-button>
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
import { Flexbox, FlexboxItem, XNumber, Group, Cell, Divider, Card, XButton } from 'vux';
import Logo from '@/components/logo/logo';
export default {
    data() {
        return {
            fillable: true
        };
    },
    components: {
        Flexbox,
        FlexboxItem,
        XNumber,
        Group,
        Cell,
        Divider,
        Card,
        XButton,
        Logo
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
            console.log('click clear button');
            this.$store.commit('clearCount');
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cart-wrapper
    .cart
        .cartlist
            .img-wrapper
                padding 5px
            .cart-wrapper
                width 100%
                display flex
                flex-direction roe
                flex-wrap nowrap
                justify-content space-between
                align-items center
                .info-wrapper
                    .name
                        font-size 20px
                        padding 5px
                        font-weight 700
                    .price-wrapper
                        margin: 5px
                        .price
                            display inline-block
                            font-size 9px
                            padding 5px 2px
                        .memberprice
                            display inline-block
                            font-size 13px
                            padding 5px 2px
                            color: red
                            font-weight bold
                .buy-wrapper
                    .weui-cell
                        margin-right 2px
                        padding 2px
        .button
            .vux-flexbox
                .vux-flexbox-item
                    .weui-btn
                        color: #fff
                        background-color: #58B7FF
</style>
