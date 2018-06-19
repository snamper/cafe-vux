<template>
  <div class="product-banner">
    <van-cell-swipe :right-width="rightwidth" :on-close="onClose">
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <div class="title">
              <van-checkbox class="checkbox" v-model="checked" v-if="showcheckbox"></van-checkbox>
              <img :src="good.imageUrl" style="height:100px;width: 100px">
              <div class="product">
                <div class="name">{{good.name}}</div>
                <div class="price-number">
                  <span class="price">￥{{good.price}}</span>
                  <span class="slot">
                    <slot name="right-bottom">
                      <span class="number">x{{good.count}}</span>
                    </slot>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <span slot="right">删除</span>
    </van-cell-swipe>
  </div>
</template>

<script type="text/ecmascript=6">
import { Checkbox, Icon, Cell, CellGroup, CellSwipe } from 'vant';
import Logger from 'chivy';
const log = new Logger('page/menu/productbanner');
export default {
  data() {
    return {
    };
  },
  props: {
    showcheckbox: {
      type: Boolean,
      default: false
    },
    good: {
      type: Object
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [CellSwipe.name]: CellSwipe,
    [Checkbox.name]: Checkbox
  },
  computed: {
    rightwidth() {
      if (this.showcheckbox) {
        return 65;
      } else {
        return 0;
      }
    }
  },
  methods: {
    onClose(clickPosition, instance) {
      log.debug('onclose');
      switch (clickPosition) {
        case 'right':
          log.debug('right click');
          this.good.count = 0
          this.$store.commit('subCount', this.good);
          break;
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../common/stylus/mixin.styl'
.product-banner
  padding 0px
  .van-cell
    padding 5px
  .van-cell-swipe
    .van-cell-swipe__right
      span
        color: #FFFFFF;
        font-size: 15px;
        width: 65px;
        height: 120px;
        display: inline-block;
        text-align: center;
        line-height: 100px;
        background-color: #F44;
    .title
      display flex
      height 100px
      align-items center
      .checkbox
        padding 40px 10px
      .product
        flex-grow 1
        height 100px
        display flex
        flex-direction column
        .name
          font-size 18px
          font-weight 900
          padding 10px
        .price-number
          margin auto 0px 5px 10px
          display flex
          font-size 18px
          price-color()
          .slot
            margin-left auto
            margin-right 10px
</style>
