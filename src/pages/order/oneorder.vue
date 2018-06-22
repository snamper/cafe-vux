<template>
  <div class="detail">
    <div class="banner">
      <van-row>
        <van-col class="orderid" span="16">
          订单号:<span>{{orderId}}</span>
          </van-col>
        <van-col class="status" span="8">{{status}}</van-col>
      </van-row>
      <van-panel title="title" :desc="orderId" :status="status"></van-panel>
    </div>
    <div class="product-wrapper">
      <product :good="order.details[0]" ></product>
    </div>
    <div v-if="order.details.length > 0" class="showmore" @click="showmore">查看全部{{order.details.length}}件商品</div>
    <div class="total van-hairline--top-bottom">
      合计:<span>￥{{order.amount}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Cell, CellGroup, Panel, Row, Col } from 'vant';
import product from '../../components/productbanner';
import banner from '../../components/banner';
import Logger from 'chivy';
const log = new Logger('vuex/member/oneorder');
export default {
  data() {
    return {
      status: '交易关闭',
      orderId: 'E12932908409823098340'
    };
  },
  props: {
    order: {
      type: Object
    }
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Panel.name]: Panel,
    [Row.name]: Row,
    [Col.name]: Col,
    product,
    banner
  },
  methods: {
    showmore() {
      this.$router.push({name: 'orderdetail', params: {detail: this.order}});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl';
.detail
  .banner
    height 60px
    .van-row
      background-color rgb(255, 255, 255)
      .orderid,.status
        font-size 14px
        line-height 60px
      .orderid
        padding-left 10px
        color rgb(206, 206, 206)
      .status
        padding-right 10px
        text-align right
        price-color()
  .product-wrapper
    .product
      .price-number
        border 1px solid green
        .price
          color black
  .showmore
    width 100%
    font-size 16px
    padding 10px 0
    display flex
    price-color()
    justify-content center
    align-items center
    background-color rgb(255, 255, 255)
  .total
    background-color rgb(255, 255, 255)
    font-size 16px
    padding 10px
    display flex
    justify-content flex-end
    span
      font-size 16px
      price-color()
</style>
