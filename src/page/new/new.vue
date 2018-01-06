<template>
    <div class="new">
        <div class="swiper-wrapper" v-if="sliders.length>0">
            <divider>新品推荐</divider>
            <div class="swiper">
                <swiper :list="sliders" auto loop style="width:100%;height:auto;" dots-class="custom-bottom" dots-position="center"></swiper>
            </div>
        </div>
        <divider v-if="hots.length>0">热销商品</divider>
        <div class="hot-wrapper" v-if="hots.length>0" ref="hotWrapper">
            <grid :cols="2" >
                <grid-item class="vux-1px-b" v-for="(product,i) in hots" :key="i">
                    <img :src="product.img">
                    <div class="detail-wrapper">
                        <span class="title">{{product.name}}</span>
                    </div>
                </grid-item>
            </grid>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
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
    mounted() {
        this.$nextTick(() => {
            if (!this.scroll) {
                log.debug('created scroll');
                this.scroll = new BScroll(this.$refs.hotWrapper, {
                    click: true
            });
            } else {
                log.debug('refresh scroll');
                this.scroll.refresh();
            }
        });
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
        position absolute
        top 260px
        bottom 50px
        left 0px
        overflow hidden
        .weui-grid
            padding 10px 
        img
            width 100%
            height auto
        .detail-wrapper
            height 24px
            display flex
            justify-content center
            align-items center
            .title
                font-size 12px
                line-height 12px

</style>
