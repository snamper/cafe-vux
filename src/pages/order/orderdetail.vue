<template>
  <div v-if="detail">
    <van-nav-bar
      title="交易完成的订单"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <div class="content">
      <van-steps
        :active="active"
        icon="logistics"
        title="交易关闭"
        description="买家取消">
        <van-step>买家下单</van-step>
        <van-step>商家接单</van-step>
        <van-step>买家提货</van-step>
        <van-step>交易完成</van-step>
      </van-steps>
      <addr></addr>
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
          <div> ￥25.00</div>
        </van-cell>
        <van-cell title="应付金额" :value="`￥` + detail.amount"/>
      </van-cell-group>
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <div class="order">订单编号: E12932908409823098340</div>
            <div class="order">创建时间: {{detail.createTimeAsString}}</div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Cell, CellGroup, NavBar, Icon, ContactCard, Field, Step, Steps } from 'vant';
import product from '../../components/productbanner';
import addr from '../../components/addresscard';
import Logger from 'chivy';
const log = new Logger('vuex/member/orderdetail');
export default {
  data() {
    return {
      active: 2,
      delivertype: '自提'
    };
  },
  beforeRouteEnter(to, from, next) {
    log.debug('to path is ' + to.path);
    log.debug('from path is ' + from.path);
    next(vm => {
      if (from.path !== '/order') {
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
    addr,
    product
  },
  props: {
    detail: {
      type: Object
    }
  },
  methods: {
    back() {
      this.$router.push({name: 'order', params: {order: this.order}});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl';
.content
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
</style>
