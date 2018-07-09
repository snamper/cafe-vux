<template>
  <div class="product-banner">
    <van-cell-swipe :right-width="rightwidth" :on-close="onClose">
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <div class="title">
              <van-checkbox class="checkbox" v-if="showcheckbox" :name="good.id"></van-checkbox>
              <img :src="Resize400(good.imageUrl)" style="height:100px;width: 100px">
              <div class="product">
                <div class="name" v-if="edit">{{name(good)}}</div>
                <van-stepper
                  v-else
                  @change="OnStepperChange"
                  integer
                  :max="1000"
                  v-model="value" >
                </van-stepper>
                <div class="price-number">
                  <span class="price">￥{{good.price ? good.price : good.amount}}</span>
                  <span class="slot">
                    <slot name="right-bottom">
                      <span class="number">x{{value}}</span>
                    </slot>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <span slot="right">{{$t('good.delete')}}</span>
    </van-cell-swipe>
  </div>
</template>

<script type="text/ecmascript=6">
import { Checkbox, Icon, Cell, CellGroup, CellSwipe, Stepper } from 'vant';
import Logger from 'chivy';
const log = new Logger('components/good');
export default {
  data() {
    return {
      value: this.good.count
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
    edit: {
      type: Boolean,
      default: true
    }
  },
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [CellSwipe.name]: CellSwipe,
    [Checkbox.name]: Checkbox,
    [Stepper.name]: Stepper
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
    Resize400(image) {
      return this.$tools.resizeImage(image, 400);
    },
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'right':
          log.info('delete button clicked');
          this.good.count = 0
          this.$store.commit('setCount', this.good);
          break;
      }
    },
    OnStepperChange(value) {
      this.$store.commit('setCount', {good: this.good, count: this.value});
    },
    name(good) {
      return this.$tools.isNotEmpty(good.name) ? good.name : good.productName;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../styles/mixin.styl'
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
