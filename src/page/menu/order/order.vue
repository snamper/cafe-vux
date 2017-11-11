<template>
    <div class="order">
        <x-header title="use prop:title" :left-options="{showBack: true, preventGoBack: true}" @on-click-back="showmenu"></x-header>
        <div class="login-wrapper">
            <div class="avator">
                <img src="../../../../static/img/avator.jpg" width="70px" height="70px">
            </div>
            <div class="text">
                <h1>登陆/注册</h1>
            </div>
        </div>
        <divider>您的订单</divider>
        <div class="order-wrapper" ref="orderList">
            <ul>
                <li class="order-list border-1px" v-for="(food,item) in selectFoods" :key="item">
                    <div class="avator">
                        <img :src="food.imageUrl" width="35px" height="35px">
                    </div>
                    <div class="content">
                        <div class="name">{{food.name}}</div>
                        <div class="number">x{{food.count}}</div>
                        <div class="total">￥{{food.count*food.price}}</div>
                    </div>
                </li>
            </ul>
            <div class="totalprice">
                <div class="price">总价￥{{totalPrice}}</div><div class="member">会员价￥{{totalMemberPrice}}</div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import { Divider, XHeader } from 'vux';
import { mapGetters } from 'vuex';
import Logger from 'chivy';
const log = new Logger('page/menu/order');
export default {
    computed: {
        ...mapGetters([
            'selectFoods',
            'totalPrice',
            'totalMemberPrice'
        ])
    },
    created() {
        log.debug('created');
    },
    mounted() {
        log.debug('mounted');
        this.$nextTick(() => {
            log.debug('init scroll');
            this._initScroll();
        });
    },
    components: {
        Divider,
        XHeader
    },
    methods: {
        _initScroll() {
            this.orderList = new BScroll(this.$refs.orderList, {
                click: true
            });
        },
        showmenu() {
            this.$store.commit('showOrder', false);
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../common/stylus/mixin.styl"

.order
    height 100%
    .login-wrapper
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
        .totalprice
            width 100%
            height 2rem
            display flex
            justify-content center
            align-items center
            .price,.member
                display inline-block
                width 100%
                font-size 1rem
            .price
                text-align center
            .member
                text-align center
</style>
