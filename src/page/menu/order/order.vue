<template>
    <div class="order">
        <x-header title="" :left-options="{showBack: true, preventGoBack: true}" @on-click-back="back"></x-header>
        <loginbar :image="image" v-show="!memberInfo"></loginbar>
        <memberbar :image="image" :memberInfo="memberInfo" v-show="memberInfo"></memberbar>
        <divider>您的订单</divider>
        <div class="listwrapper" ref="listwrapper">
            <list :list="selectFoods" size='50' radius='20'></list>
        </div>
        <ordercart></ordercart>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import ordercart from './ordercart/ordercart';
import loginbar from '../../../components/loginbar/loginbar';
import memberbar from '../../../components/loginbar/memberbar';
import list from '../../../components/list/list';
import avator from '../../../components/avator/avator';
import { Divider, XHeader, Group, XSwitch } from 'vux';
import { mapGetters, mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('page/menu/order');
export default {
    data() {
        return {
            show: true,
            image: '../../../../static/img/avator.jpg'
        };
    },
    created() {
        log.debug('created');
        // 当购物车为空的时候，返回到主页面
        if (this.selectFoods.length === 0) {
            this.$router.push({path: '/menu'});
        }
    },
    mounted() {
        log.info('mounted');
        if (this.selectFoods.length > 0) {
            log.debug('scroll show orderListShow');
            this.$nextTick(() => {
                if (!this.scroll) {
                    log.debug('created scroll');
                    this.scroll = new BScroll(this.$refs.listwrapper, {});
                } else {
                    log.debug('refresh scroll');
                    this.scroll.refresh();
                }
            });
        }
    },
    computed: {
        ...mapGetters([
            'selectFoods',
            'totalPrice',
            'totalMemberPrice',
            'products'
        ]),
        ...mapState([
            'memberInfo'
        ])
    },
    methods: {
        loginPage() {
            this.$router.push({ path: '/login' });
        },
        back() {
            this.$router.push({ path: '/menu' });
        }
    },
    components: {
        Divider,
        XHeader,
        ordercart,
        Group,
        XSwitch,
        loginbar,
        memberbar,
        avator,
        list
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../common/stylus/mixin.styl"

.order
    height 100%
    .login-wrapper,.member-wrapper
        width 100%
        height 100px
        display flex
        justify-content center
        align-items center
        background-color rgb(238, 234, 232)
        .avator
            flex-grow 1
            display inline-block
            text-align center
            img
                border-radius:50%;
        .text
            flex-grow 4
            display inline-block
            font-size 1.3rem
    .member-wrapper
        width 100%
        height 100px
        display flex
        justify-content center
        align-items center
        background-color rgb(238, 234, 232)
        .avator
            flex-grow 1
            display inline-block
            text-align center
            img
                border-radius:50%;
        .text
            flex-grow 4
            display inline-block
            margin-left 0.3rem
            font-size 1rem
    .listwrapper
        position absolute
        top 182px
        bottom 100px
        width 100%
        overflow  hidden
    .order-wrapper
        position absolute
        width 100%
        top 182px
        bottom 50px
        overflow: hidden
        .order-list
            width 100%
            height 70px
            display flex
            justify-content center
            align-items center
            .avator, .content
                display inline-block
            .avator
                flex-grow 1
                text-align center
            .content 
                flex-grow 3
                display flex
                .name, .number,.total
                    display inline-block
                    width 100%
                .name
                    text-align left
                .number
                    text-align right
                .total
                    text-align center
        .totalprice-wrapper,.memberprice-wrapper
            width 100%
            height 2rem
            display flex
            justify-content center
            align-items center
            .title,.price
                width 100%
                line-height 18px
            .title
                text-align left
                padding-left 3rem 
            .price
                text-align right
                padding-right 1.7rem

</style>
