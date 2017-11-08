<template>
    <div>
        <logo></logo>
        <div class="swiper-wrapper" v-if="sliders.length>0">
            <divider>新品推荐</divider>
            <div class="swiper">
                <swiper :list="sliders" auto loop style="width:100%;height:auto;" dots-class="custom-bottom" dots-position="center"></swiper>
            </div>
        </div>
        <div class="hot-wrapper" v-if="hots.length>0">
            <divider>热销商品</divider>
            <grid :cols="2">
                <grid-item v-for="(product,i) in hots" :key="i">
                    <img width="165" height="165" :src="product.img">
                    <div class="detail-wrapper">
                        <span class="title">{{product.name}}</span>
                        <span class="price">￥{{product.price}}</span>
                    </div>
                </grid-item>
            </grid>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Swiper, Divider, Grid, GridItem } from 'vux';
import logo from '../../components/logo/logo';
export default {
    computed: {
        sliders() {
            return this.$store.getters.sliders;
        },
        hots() {
            return this.$store.getters.hots;
        }
    },
    components: {
        logo,
        Swiper,
        Divider,
        Grid,
        GridItem
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.swiper-wrapper
    .swiper
        margin 1rem 0
.hot-wrapper
    .weui-grids
        .weui-grid
            margin 0.2rem 0
            padding 0.2rem
            text-align center
            .detail-wrapper
                display flex
                justify-content space-between
                .title, .price
                    margin 0.3rem
                .title
                    color red
                .price
                    color red
</style>
