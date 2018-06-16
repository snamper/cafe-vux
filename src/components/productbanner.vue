<template>
  <div class="product-banner">
    <van-cell-swipe :right-width="rightwidth">
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
export default {
  data() {
    return {
      checked: false,
      good: {
        canBook: true,
        classifyId: 69,
        code: 'd519d09e-3bbd-4e5e-b044-715b02e75805',
        creatPeriod: '',
        createTime: 1521645341000,
        createTimeAsString: '2018-03-21 23:15:41',
        creatorId: -1,
        defaultEntity: false,
        description: '是肯定分离焦虑斯柯达据了解是开机地方了撒娇的就sad拉开就打算冷风机老大说封口胶辽阔的书法家辽阔的设计费辽阔的设计费鲁大师就发流口水当减肥离开的时间流口水当减肥李松快当减肥流口水当减肥离开的时间发连接的斯洛伐克就电视了开发借了时代峻峰了开机但是飞',
        id: 268,
        imageSliderUrl: '/upload/dongwubinggan-1521645338239.jpg',
        imageUrl: '/upload/dongwubinggan-1521645338239.jpg',
        memberPrice: 88,
        name: '动物饼干',
        objClass: 'com.xdt.ums.shop.common.entity.ProductImpl',
        price: 88,
        slider: true,
        count: 1
      }
    };
  },
  props: {
    showcheckbox: {
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
    Onchecked() {
      this.checked = !this.checked;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../common/stylus/mixin.styl'
.product-banner
  margin 10px
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
