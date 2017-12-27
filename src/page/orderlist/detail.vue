<template>
  <transition name="move">
      <div v-show="showFlag" class="food" ref="food" v-if="list">
        <x-header :title="list.code" :left-options="{showBack: true, preventGoBack: true}" @on-click-back="back"></x-header>
        <div class="detail-desciption">
          <span class="title">结算时间</span>
          <span class="time">{{buyDateTime(list.createTime)}}</span>
        </div>
        <divider>详情</divider>
        <div class="detail-wrapper" ref="detailWrapper">
          <ul>
            <li v-for="(good,index) in list.details" :key="index">
                <div class="detail">
                    <div class="avator">
                        <avator :img="good.imageUrl" size='35' radius='50'></avator>
                    </div>
                    <div class="content">
                        <div class="name">{{good.productName}}</div>
                        <div class="number">x{{good.number}}</div>
                        <div class="total">￥{{good.amount}}</div>
                    </div>
                </div>
            </li>
          </ul>
          <split></split>
        </div>
        <div class="summary">
              <div class="title">总价</div><div class="price">￥{{list.amount}}</div>
          </div>
      </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import split from '../../components/split/split';
import avator from '../../components/avator/avator';
import { XHeader, Divider } from 'vux';
import util from '../../common/js/util';
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
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.detailWrapper, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      back() {
        this.showFlag = false;
      },
      buyDateTime(date) {
            let format = util.formatDate(date);
            let result = format.Year + '-' + format.Month + '-' + format.Day + ' ' + format.Hour + ':' + format.Minute;
            return result;
      }
    },
    components: {
      split,
      XHeader,
      Divider,
      avator
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
    .detail-desciption
      height 30px
      display flex
      align-items center
      .title,.time
        font-size 16px
        padding-top 5px
        padding-bottom 5px
      .title
        flex-grow 1
        padding-left 20px
      .time
        flex-grow 1
        text-align right
        padding-right 10px
    .detail-wrapper
      position absolute
      width 100%
      top 108px
      bottom 40px
      overflow hidden
      .time
          padding 0.3rem 0
      .detail
          width 100%
          height 60px
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
    .summary
      position absolute
      bottom 0px
      right 0px
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
          padding-right 2rem
</style>
