<template>
    <div class="cartpanel-wrapper">
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
                                    <x-number button-style="round" v-model="product.count"></x-number>
                                </group>
                            </div>
                        </flexbox-item>
                    </flexbox>
                </div>
            </flexbox-item>
        </flexbox>
    </div>
</template>

<script type="text/ecmascript-6">
import { Flexbox, FlexboxItem, XNumber, Group } from 'vux';
export default {
    props: {
        product: {
            type: Object
        }
    },
    components: {
        Flexbox,
        FlexboxItem,
        XNumber,
        Group
    },
    computed: {
        value: function() {
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartpanel-wrapper
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
                        font-size 10px
                        padding 5px 2px
                    .memberprice
                        display inline-block
                        font-size 14px
                        padding 5px 2px
                        color: red
                        font-weight bold
            .buy-wrapper
                .weui-cell
                    margin-right 2px
                    padding 2px
</style>
