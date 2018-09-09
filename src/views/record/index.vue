<template>
  <div v-if="detail">
    <van-nav-bar
      title="交易完成的订单"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <div class="content">
      <van-steps
        v-if="orderstatus !== payStatus.NOTPAY.status"
        :active="active"
        :icon="stepicon"
        :title="orderstatus"
        :description="orderstatus">
        <van-step>买家下单</van-step>
        <van-step>买家付款</van-step>
        <van-step>卖家发货</van-step>
        <van-step>交易完成</van-step>
      </van-steps>
      <status
        v-else
        :icon="stepicon"
        :title="orderstatus"
        :description="orderstatus">
      </status>
      <addr :address="address" :editable="false"></addr>
      <div>
        <div class="products" v-for="(product, index) in detail.details" :key="index">
          <product :good="product"></product>
        </div>
      </div>
      <van-cell-group>
        <van-cell title="配送方式" :value="delivertype"/>
        <van-field
          label="买家留言"
          placeholder="无"
          disabled>
        </van-field>
        <van-cell title="合计" :value="`￥` + detail.amount"/>
      </van-cell-group>
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <div>商品金额</div>
            <div>运费</div>
          </template>
          <div>￥{{detail.amount}}</div>
          <div> ￥{{deliverPrice}}</div>
        </van-cell>
        <van-cell title="应付金额" :value="`￥` + detail.amount"/>
      </van-cell-group>
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <div class="order">订单编号: {{detail.id}}</div>
            <div class="order">创建时间: {{detail.createTimeAsString}}</div>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="ops-warpper" v-if="orderstatus === payStatus.NOTPAY.status">
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
  </div>
</template>

<script type="text/ecmascript=6">
import { Cell, CellGroup, NavBar, Icon, ContactCard, Field, Step, Steps, Button, Toast } from 'vant';
import { mapState } from 'vuex';
import product from '@/components/good';
import addr from '@/components/address';
import status from '@/components/status';
import Logger from 'chivy';
const log = new Logger('views/record');
export default {
  name: 'Record',
  data() {
    return {
      payStatus: this.$tools.payStatus
    };
  },
  beforeRouteEnter(to, from, next) {
    log.debug('to path is ' + to.path);
    log.debug('from path is ' + from.path);
    next(vm => {
      if (from.path !== '/records') {
        vm.$router.push({name: 'member'});
      }
    });
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [ContactCard.name]: ContactCard,
    [Field.name]: Field,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Button.name]: Button,
    addr,
    product,
    status
  },
  props: {
    detail: {
      type: Object
    }
  },
  computed: {
    ...mapState({
      'deliverPrice': state => state.product.deliverPrice
    }),
    active() {
      switch (this.detail.status) {
        case 'NOTPAY' || 'PAYERROR':
          return 0;
        case 'SUCCESS':
          return 1;
        case 'DISPATCHED':
          return 2;
        case 'REFUND' || 'CLOSED' || 'FINISHED':
          return 3;
      }
    },
    address() {
      return {
        name: this.detail.userName,
        tel: this.detail.deliveryMobile,
        address: this.detail.deliveryLocation
      };
    },
    delivertype() {
      return '自提';
    },
    orderstatus() {
      return this.$tools.getPaymentStatusValue(this.detail.status, this.payStatus);
    },
    stepicon() {
      switch (this.detail.status) {
        case 'NOTPAY' || 'PAYERROR':
          return 'pending-payment';
        case 'SUCCESS':
          return 'pending-deliver';
        case 'DISPATCHED':
          return 'logistics';
        case 'REFUND' || 'CLOSED' || 'FINISHED':
          return 'completed';
      }
    }
  },
  methods: {
    back() {
      this.$router.push({name: 'records', params: {order: this.detail}});
    },
    cancelOrder() {
      const param = {entityId: this.detail.id, status: this.payStatus.CLOSED.key};
      this.$store.dispatch('alterStatus', param).then((resp) => {
        this.$router.push({name: 'records'});
      }).catch(error => {
        log.error('error is ' + JSON.stringify(error));
        this.$toast('取消错误');
      });
    },
    confirmOrder() {
      this.$store.dispatch('setcartsgoods',this.detail.details).then(() => {
        this.$router.push({name: 'pay', params: {orderid: this.detail.id}});
      });
    },
    onclickConfirm() {

    },
    onclickCancel() {

    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../styles/mixin.styl';
.van-nav-bar
  position fixed
  left 0px
  top 0px
  width 100%
.content
  margin-top 46px
  .icon
    height 40px
    font-size 40px
    line-height 40px
  .status
    padding-left 10px
    font-size 18px
    line-height 40px
  .order
    font-size 10px
    gray-color()
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
