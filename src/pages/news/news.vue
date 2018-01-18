<template>
    <div class="new">
        <logo></logo>
        <div class="swiper-wrapper" v-if="sliders.length>0">
            <divider>新品推荐</divider>
            <div class="swiper">
                <swiper :list="sliders" auto loop style="width:100%;height:auto;" dots-class="custom-bottom" dots-position="center"></swiper>
            </div>
        </div>
        <div class="introduce">
            <divider>本店简介</divider>
            <p class="detail">Tian' Bakery主营点心、蛋糕、面包。店内环境温馨雅致，琳琅满目的面包、蛋糕，品种丰富多样，新鲜美味。每一个糕点都是上等选材经过细心烘烤而成的，口感细腻，处处散发着香醇的感觉，力求把健康、美味、营养、高品质的产品奉献给大家</p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import logo from '../../components/logo';
import { Swiper, Divider } from 'vux';
import { mapGetters } from 'vuex';
import Logger from 'chivy';
const log = new Logger('cafe/new');
export default {
    created() {
        // if (this.$store.state.categorys === '') {
        //     this.$router.push({path: '/menu'});
        // }
        log.debug('created');
    },
    computed: {
        ...mapGetters([
            'sliders'
        ])
    },
    components: {
        Swiper,
        Divider,
        logo
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .swiper-wrapper
        .swiper
            margin 5px 3px
    .introduce
        padding 5px
        .detail
            padding 0px 10px
            text-indent 40px
            font-size 16px
            line-height 1.5

    .hot-wrapper
        position absolute
        top 260px
        bottom 50px
        left 0px
        overflow hidden
        .weui-grid
            padding 10px
            border 1px solid red
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
