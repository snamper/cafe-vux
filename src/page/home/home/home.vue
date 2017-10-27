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
                    <img width="100%" height="auto" :src="product.imageUrl">
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
import { mapGetters } from 'vuex';
import Logo from '@/components/logo/logo';
export default {
    computed: {
        ...mapGetters({
            sliders: 'sliders',
            hots: 'hots'
        })
    },
    components: {
        Swiper,
        Divider,
        Grid,
        GridItem,
        Logo
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
