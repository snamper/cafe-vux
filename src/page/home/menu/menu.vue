<template>
    <div class="menu-wrapper" v-if="categorys">
        <logo></logo>
        <divider>商品列表</divider>
        <div class="categorys" v-for="(category,key) in categorys" :key="key">
            <divider>{{key}}</divider>
            <div class="product" v-for="(product, index) in category" :key="index">
                <product-show :product="product"></product-show>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Divider } from 'vux';
import Logo from '@/components/logo/logo';
import ProductShow from '../menu/productshow';
export default {
    components: {
        Divider,
        Logo,
        ProductShow
    },
    computed: {
        categorys: function() {
            return this.$store.state.categorys;
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.menu-wrapper
    .categorys
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
                        background #58B7FF
                        color:#fff
</style>
