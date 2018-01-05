<template>
    <div class="new">
        <div class="swiper-wrapper" v-if="sliders.length>0">
            <divider>新品推荐</divider>
            <div class="swiper">
                <swiper :list="sliders" auto loop style="width:100%;height:auto;" dots-class="custom-bottom" dots-position="center"></swiper>
            </div>
        </div>
        <div class="hot-wrapper" v-if="hots.length>0" >
            <divider>热销商品</divider>
            <grid :cols="4" >
                <grid-item v-for="(product,i) in hots" :key="i">
                    <img width="100%" height="auto" :src="product.img">
                    <div class="detail-wrapper">
                        <span class="title">{{product.name}}</span>
                    </div>
                </grid-item>
            </grid>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Swiper, Divider, Grid, GridItem, Flexbox, FlexboxItem } from 'vux';
import Logger from 'chivy';
const log = new Logger('cafe/new');
export default {
    created() {
        if (this.$store.state.categorys === '') {
            this.$router.push({path: '/menu'});
        }
        log.debug('created');
    },
    computed: {
        sliders() {
            return this.$store.getters.sliders;
        },
        hots() {
            return this.$store.getters.hots;
        }
    },
    components: {
        Swiper,
        Divider,
        Grid,
        GridItem,
        Flexbox,
        FlexboxItem
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .swiper-wrapper
        .swiper
            margin 5px 3px
    .hot-wrapper
        position relative
        top 0px
        bottom 50px
        left 0px
        // overflow hidden
        .weui-grids
            .weui-grid
                margin 0.2rem 0
                padding 0.2rem
                text-align center
                .detail-wrapper
                    display flex
                    justify-content center
                    height 24px
                    .title
                        margin 0.3rem
                        font-size 12px
                        line-height 12px
                        color black
</style>
