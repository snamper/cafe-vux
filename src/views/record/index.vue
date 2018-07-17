<template>
  <div v-if="detail">
    <van-nav-bar
      :title="$t('record.finishOrder')"
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
        <van-step>{{$t('record.buyer')}}</van-step>
        <van-step>{{$t('record.accept')}}</van-step>
        <van-step>{{$t('record.getGood')}}</van-step>
        <van-step>{{$t('record.finish')}}</van-step>
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
        <van-cell :title="$t('record.deliveryType')" :value="delivertype"/>
        <van-field
          :label="$t('record.buyerMessage')"
          :placeholder="$t('record.none')"
          disabled>
        </van-field>
        <van-cell title="合计" :value="`￥` + detail.amount"/>
      </van-cell-group>
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <div>{{$t('record.amount')}}</div>
            <div>{{$t('record.deliveryPrice')}}</div>
          </template>
          <div>￥{{detail.amount}}</div>
          <div> ￥{{deliverPrice}}</div>
        </van-cell>
        <van-cell :title="$t('record.payAmount')" :value="`￥` + detail.amount"/>
      </van-cell-group>
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <div class="order">{{$t('record.orderId')}}{{detail.id}}</div>
            <div class="order">{{$t('record.createTime')}}{{detail.createTimeAsString}}</div>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="ops-warpper" v-if="orderstatus === status.NOTPAY.status">
        <van-cell-group>
          <van-cell>
            <div class="ops">
              <van-button class="cancel" type="default" size="small" @click.native="onclickCancel">{{$t('record.cancelOrder')}}</van-button>
              <van-button class="confirm" type="default" size="small" @click.native="onclickConfirm">{{$t('record.confirmOrder')}}</van-button>
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
  data() {
    return {
      active: 2,
      delivertype: '自提',
      address: {
        name: '张三',
        mobile: '13333333333',
        province: '四川省',
        city: '成都市',
        county: '成华区',
        address: '昭觉市南路33号'
      },
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
    ...mapState([
      'deliverPrice'
    ]),
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
      return this.$t('record.timeout');
    }
  },
  methods: {
    back() {
      this.$router.push({name: 'records', params: {order: this.detail}});
    },
    cancelOrder() {
      const param = {entityId: this.detail.id, status: this.status.CLOSED.key};
      this.$store.dispatch('alterStatus', param).then((resp) => {
        if (resp) {
          this.$router.push({name: 'records'});
        } else {
          this.$toast(this.$t('record.tips1'));
        }
      }).catch(error => {
        this.$toast(this.$t('record.tips1'));
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
