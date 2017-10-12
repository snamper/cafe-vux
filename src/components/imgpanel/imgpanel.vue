<template>
    <div class="category-wrapper">
        <flexbox :gutter="5">
            <flexbox-item :span="1/4">
                <div class="img-wrapper">
                    <img :src="product.imageUrl" width="100%" height="auto">
                </div>
            </flexbox-item>
            <flexbox-item :span="3/4">
                <div class="detail-wrapper">
                    <div class="name">{{product.name}}</div>
                    <div class="description">
                        <span class="title">商品详情:</span>
                        <span class="detail">{{product.description}}</span>
                    </div>
                    <div class="price-wrapper">
                        <span class="price">￥{{product.price}}</span>
                        <span class="member">会员价:</span>
                        <span class="cart">￥{{product.memberPrice}}</span>
                        <span class="buy">
                            <x-button v-show="true" :mini="true">购买</x-button>
                        <group v-show="false">
                            <x-number v-model="value"></x-number>
                        </group>
                        </span>
                    </div>
                </div>
            </flexbox-item>
        </flexbox>
    </div>
</template>

<script type="text/ecmascript-6">
import { Panel, Flexbox, FlexboxItem, Group, XNumber, XButton } from 'vux';
export default {
    props: {
        product: {
            type: Object
        },
        value: {
            type: Number
        }
    },
    components: {
        Panel,
        Flexbox,
        FlexboxItem,
        Group,
        XNumber,
        XButton
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .category-wrapper 
        // width 100%            
        .img-wrapper 
            width 100%
            display flex
            justify-content center
            margin 0 10px
            img
                width 100px
                height 100px
        .detail-wrapper
            width 100%
            height 100px
            flex 1
            .name
                display inline-block
                margin 0 20px 5px 20px
                padding 5px 5px 0
                line-height 18px
                width 100%
                font-size 18px
                height 18px
                font-weight bold
            .description
                margin 0 20px
                .title
                    display inline-block
                    font-size 12px
                    width 100%
                    font-weight 500
                    padding 5px
                    height 12px
                .detail
                    display flex
                    align-items center
                    vertical-align middle
                    width 90%
                    line-height 15px
                    font-size 10px
                    padding 0 10px 0 40px
                    height 30px
                    overflow hidden
                    text-overflow ellipsis
            .price-wrapper
                width 83%
                line-height 18px
                margin 5px 20px
                .price 
                    position relative
                    left 0
                    top 0
                    font-size 12px
                    width 50px
                    padding 5px 0 0 5px
                    color: gray
                .cart,.member
                    position relative
                    left 0
                    top 0
                    font-size 15px
                    padding-top 5px
                    font-weight 900
                .cart
                    color red
                .member
                    color black
                .buy 
                    float right
                    .weui-btn
                        background #20A0FF
                        color:#fff
</style>