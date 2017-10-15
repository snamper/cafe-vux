<template>
    <div class="home-wrapper">
        <logo></logo>
        <div class="swiper-wrapper" v-if="sliders.length>0">
            <divider>新品推荐</divider>
            <swiper :list="sliders" auto loop style="width:100%;height:auto;" dots-class="custom-bottom" dots-position="center"></swiper>
        </div>
        <div class="hot-wrapper" v-if="hots.length>0">
            <divider>热销商品</divider>
            <grid :cols="2">
                <grid-item v-for="(product,i) in hots" :key="i">
                    <img width="100%" height="auto" :src="product.img">
                    <div class="detail-wrapper">
                        <span class="title">商品1</span>
                        <span class="price">￥20</span>
                    </div>
                </grid-item>
            </grid>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Swiper, Divider, Grid, GridItem } from 'vux';
import Logo from '@/components/logo/logo';
export default {
    props: {
        categorys: {
            type: Object
        }
    },
    computed: {
        /* calcation the silder arry from categorys */
        sliders: function() {
            const sliders = [];
            for (let category in this.categorys) {
                this.categorys[category].forEach((product) => {
                    if (product.slider) {
                        sliders.push({ 'img': product.imageSliderUrl });
                    }
                });
            }
            // console.log(sliders);
            // console.log(sliders.length);
            return sliders;
        },
        hots: function() {
            const hots = [];
            for (let category in this.categorys) {
                this.categorys[category].forEach((product) => {
                    if (product.canBook) {
                        // console.log(product.imageUrl);
                        hots.push({ 'img': product.imageUrl });
                    }
                });
            }
            return hots;
        }
    },
    methods: {
    },
    components: {
        Swiper,
        Divider,
        Grid,
        GridItem,
        'logo': Logo
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .home-wrapper
        .swiper-wrapper
            font-size 24px
        .hot-wrapper
            font-size 24px
            .weui-grids
                padding-bottom 5px
                .weui-grid
                    padding 25px 
                .detail-wrapper
                    display flex
                    justify-content space-between
                    .title
                        font-size 18px
                        padding 5px 0
                        font-weight 700
                        color black
                    .price
                        font-size 18px
                        color red
                        padding 5px 0
                        font-weight 700
</style>
