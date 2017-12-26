<template>
  <transition name="move">
      <div v-show="showFlag" class="food" ref="food">
        <x-header :title="food.name" :left-options="{showBack: true, preventGoBack: true}" @on-click-back="back"></x-header>
        <div class="food-content">
          <div class="image-header">
            <img :src="food.imageUrl">
          </div>
          <div class="content">
            <!-- <h1 class="title">{{food.name}}</h1> -->
            <!-- <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div> -->
            <div class="price">
              <span>会员价</span><span class="now">￥{{food.memberPrice}}</span><span>非会员价</span><span class="old" v-show="food.price">￥{{food.price}}</span>
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
      </div>
  </transition>
</template>

<script type="text/ecmascript-6">
// import BScroll from 'better-scroll';
import split from '../../components/split/split';
import { XHeader } from 'vux';
import Logger from 'chivy';
const log = new Logger('page/orderlist/detail');

export default {
    props: {
      list: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
        show() {
        log.debug('list');
        this.showFlag = true;
        // this.$nextTick(() => {
        //   if (!this.scroll) {
        //     this.scroll = new BScroll(this.$refs.food, {
        //       click: true
        //     });
        //   } else {
        //     this.scroll.refresh();
        //   }
        // });
      }
    },
    components: {
      split,
      XHeader
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 @import "../../common/stylus/mixin.styl"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      display flex
      justify-content center
      align-items center
      width 100%
      img
        width 70%
        height 70%
        padding 1rem 0
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff

    .content
      position: relative
      padding: 10px 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          font-size: 14px
          color: rgb(7, 17, 27)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 6px
      .buy
        position: absolute
        right: 18px
        bottom: 10px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
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
