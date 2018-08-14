<template>
  <div v-if="detail">
    <van-nav-bar
      title="交易完成的订单"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <div class="content">
      <van-steps
        v-if="orderstatus !== status.NOTPAY.status"
        :active="active"
        :icon="stepicon"
        :title="orderstatus"
        :description="setpdesc">
        <van-step>买家下单</van-step>
        <van-step>商家接单</van-step>
        <van-step>买家提货</van-step>
        <van-step>交易完成</van-step>
      </van-steps>
      <orderstatus
        v-else
        :icon="stepicon"
        :title="orderstatus"
        :description="setpdesc">
      </orderstatus>
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
  </div>
</template>

<script type="text/ecmascript=6">
import { Cell, CellGroup, NavBar, Icon, ContactCard, Field, Step, Steps, Button, Toast } from 'vant';
import { mapState } from 'vuex';
import product from '@/components/good';
import addr from '@/components/address';
import orderstatus from '@/components/status';
import { status } from '@/utils/products';
import Logger from 'chivy';
const log = new Logger('views/record');
export default {
  name: 'Record',
  data() {
    return {
      active: 2,
      status
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
    orderstatus
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
    address() {
      return {
        name: this.detail.userName,
        tel: this.detail.deliveryMobile,
        address: this.detail.deliveryLocation
        /* name: '11',
        tel: '13333333333',
        address: 'xxxxxxxxxxxxx' */
      };
    },
    delivertype() {
      return '自提';
    },
    orderstatus() {
      switch(this.detail.status) {
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
    showsteps() {
      return false;
    },
    stepicon() {
      return 'logistics';
    },
    setpdesc() {
      return '超时关闭';
    },
    onclickConfirm() {

    },
    onclickCancel() {

    }
  },
  methods: {
    back() {
      this.$router.push({name: 'records', params: {order: this.detail}});
    },
    cancelOrder() {
      const param = {entityId: this.detail.id, status: this.status.CLOSED.key};
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
