<template>
  <div class="detail">
    <div class="banner">
      <van-row>
        <van-col class="orderid" span="16">
          订单编号:<span>{{order.id}}</span>
          </van-col>
        <van-col class="status" span="8">{{orderstatus}}</van-col>
      </van-row>
      <!-- <van-panel title="title" :desc="orderId" :status="orderstatus"></van-panel> -->
    </div>
    <div class="product-wrapper" @click="showRecord">
      <product :good="order.details[0]" ></product>
    </div>
    <div v-if="order.details.length > 1" class="showmore" @click="showRecord">{{recordsCount}}</div>
    <div class="total van-hairline--top-bottom">
      合计:<span>￥{{order.amount}}</span>
    </div>
    <div class="ops-warpper" v-if="orderstatus === status.NOTPAY.status">
      <van-cell-group>
        <van-cell>
          <div class="ops">
            <van-button class="cancel" type="default" size="small" @click.native="onclickCancel">取消订单</van-button>
            <van-button class="confirm" type="default" size="small" @click.native="onclickConfirm">确认付款</van-button>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Cell, CellGroup, Row, Col, Button, Toast } from 'vant';
import product from '@/components/good';
import banner from '@/components/banner';
import { status } from '@/utils/products';
import Logger from 'chivy';
const log = new Logger('views/records/one');
export default {
  data() {
    return {
      status,
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
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    product,
    banner
  },
  computed: {
    orderstatus() {
      // debugger
      switch(this.order.status) {
        case this.status.NOTPAY.key:
          return this.status.NOTPAY.status;
        case this.status.WAIT4DELIVERY.key:
          return this.status.WAIT4DELIVERY.status;
        case this.status.ALREADYDELIVERY.key:
          return this.status.ALREADYDELIVERY.status;
        case this.status.FINISH.key:
          return this.status.FINISH.status;
        case this.status.CLOSED.key:
          return this.status.CLOSED.status;
      }
    },
    recordsCount() {
      return this.order.details.length > 0 ? '查看全部' + this.order.details.length + '件商品' : '';
    }
  },
  methods: {
    showRecord() {
      this.$router.push({name: 'record', params: {detail: this.order}});
    },
    onclickCancel() {
      const param = {entityId: this.order.id, status: this.status.CLOSED.key};
      this.$store.dispatch('alterStatus', param).then(() => {
        this.$router.push({name: 'order'});
      }).catch(error => {
        log.error('error is ' + JSON.stringify(error));
        this.$toast('取消错误');
      });
    },
    onclickConfirm() {
      this.$store.dispatch('setCartsgoods',this.order.details).then(() => {
        this.$router.push({name: 'pay', params: {deliverType: this.order.deliverType}});
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../styles/mixin.styl';
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
  .ops-warpper
    .van-cell
      padding 10px 5px
    .ops
      display flex
      justify-content flex-end
      .cancel
        margin-right 10px
        price-color()
      .confirm
        price-color()
</style>
