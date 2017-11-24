<template>
    <div class="order">
        <x-header title="" :left-options="{showBack: true, preventGoBack: false}"></x-header>
        <div class="login-wrapper" v-show="!memberInfo">
            <div class="avator">
                <avator img="../../../../static/img/avator.jpg" size='70' radius='50'></avator>
            </div>
            <div class="text">
                <h1 @click="loginPage">登陆/注册</h1>
            </div>
        </div>
        <div class="member-wrapper" v-show="memberInfo">
            <div class="avator">
                <avator img="../../../../static/img/avator.jpg" size='70' radius='50'></avator>
            </div>
            <div class="text">
                <h1>{{memberInfo.name}},您的会员卡余额是￥{{memberInfo.balance}}</h1>
            </div>
        </div>
        <divider>您的订单</divider>
        <div class="order-wrapper" ref="orderList">
            <ul>
                <li class="order-list border-1px" v-for="(food,item) in selectFoods" :key="item">
                    <div class="avator">
                        <avator :img="food.imageUrl" size='50' radius='20'></avator>
                    </div>
                    <div class="content">
                        <div class="name">{{food.name}}</div>
                        <div class="number">x{{food.count}}</div>
                        <div class="total">￥{{food.count*food.price}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <ordercart></ordercart>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import ordercart from './ordercart/ordercart';
import avator from '../../../components/avator/avator';
import { Divider, XHeader, Group, XSwitch } from 'vux';
import { mapGetters } from 'vuex';
import Logger from 'chivy';
const log = new Logger('page/menu/order');
export default {
    data() {
        return {
            show: true
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
                    this.scroll = new BScroll(this.$refs.orderList, {});
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
        memberInfo() {
            return this.$store.state.memberInfo;
        }
    },
    components: {
        Divider,
        XHeader,
        ordercart,
        Group,
        XSwitch,
        avator
    },
    methods: {
        loginPage() {
            this.$router.push({ path: '/login' });
        }
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
    .order-wrapper
        position absolute
        width 100%
        top 182px
        bottom 100px
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
