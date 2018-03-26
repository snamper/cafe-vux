<template>
    <transition name="move">
        <div v-show="showFlag" class="food food-content" ref="food">
            <div class="image-header">
                <img :src="food.imageUrl!==''?currentPath(food.imageUrl, 400):placeholder.size400">
                <div class="back" @click="hide">
                    <i class="iconfont icon-fanhui"></i>
                </div>
            </div>
            <div class="content">
                <div class="price">
                    <span v-if="food.memberPrice!==0"><span>会员价</span><span class="now">￥{{food.memberPrice}}</span><span v-if="false">非会员价</span></span><span class="old" v-if="false" v-show="food.price">￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
                <transition name="fade">
                    <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">
                    加入购物车
                    </div>
                </transition>
            </div>
            <split v-show="food.info"></split>
            <div class="info" v-show="food.description">
                <h1 class="title">简介</h1>
                <p class="text">{{food.description}}</p>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import Vue from 'vue';
import { placeholder } from '../../common/js/values';
import { renameImagePath } from '../../common/js/util';
import cartcontrol from './cartcontrol';
import split from '../../components/split';
export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false
        };
    },
    computed: {
        placeholder() {
            return placeholder;
        }
    },
    methods: {
        // 显示页面并滚动显示页面内容
        show() {
            this.showFlag = true;
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            });
        },
        hide() {
            this.showFlag = false;
        },
        // 第一次添加
        addFirst(event) {
            if (!event._constructed) {
                return;
            }
            this.$emit('add', event.target);
            Vue.set(this.food, 'count', 1);
        },
        addFood(target) {
            this.$emit('add', target);
        },
        currentPath(url, size) {
            return renameImagePath(url, size);
        }
    },
    components: {
        cartcontrol,
        split
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.food
    position: fixed
    left: 0
    top: 0
    bottom: 100px
    z-index: 30
    width: 100%
    background: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
        transition: all 0.2s linear
    &.move-enter, &.move-leave-active
        transform: translate3d(100%, 0, 0)
    .image-header
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
        .back
            position: absolute
            top: 10px
            left: 10px
            .icon-arrow_lift
                display: block
                padding: 10px
                font-size: 20px
                color: #fff
    .content
        position: relative
        padding: 10px 18px
        .price
            font-weight: 700
            line-height: 24px
            .now
                margin-right: 8px
                font-size: 14px
                color: rgb(240, 20, 20)
            .old
                font-size: 14px
                color: rgb(240, 20, 20)
        .cartcontrol-wrapper
            position: absolute
            right: 12px
            bottom: 6px
        .buy
            position: absolute
            right: 18px
            bottom: 12px
            z-index: 10
            height: 26px
            line-height: 24px
            padding: 0 12px
            box-sizing: border-box
            border-radius: 12px
            font-size: 10px
            color: #fff
            background: rgb(9, 187, 7)
            opacity: 1
            &.fade-enter-active, &.fade-leave-active
                transition: all 0.2s
            &.fade-enter, &.fade-leave-active
                opacity: 0
                z-index: -1
    .info
        padding: 18px
        .title
            line-height: 14px
            margin-bottom: 6px
            font-size: 14px
            color: rgb(7, 17, 27)
        .text
            line-height: 24px
            padding: 0 8px
            font-size: 12px
            color: rgb(77, 85, 93)
</style>
