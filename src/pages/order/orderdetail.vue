<template>
  <div>
    <van-nav-bar
      title="交易完成的订单"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <div class="content">
      <van-cell-group class="van-hairline--bottom">
        <van-cell>
          <template slot="title">
            <span class="status">交易完成</span>
          </template>
          <template slot="icon">
            <div class="icon">
              <van-icon name="completed" />
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <addr></addr>
      <div class="products" v-for="(product, index) in 2" :key="index">
        <product></product>
      </div>
      <van-cell-group>
        <van-cell title="配送方式" :value="delivertype"/>
        <van-field
          label="买家留言"
          placeholder="无"
          disabled>
        </van-field>
        <van-cell title="合计" value="￥420.00"/>
      </van-cell-group>
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <div>商品金额</div>
            <div>运费</div>
          </template>
          <div>￥420.00</div>
          <div>+ ￥25.00</div>
        </van-cell>
        <van-cell title="应付金额" value="￥420.00"/>
      </van-cell-group>
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <div class="order">订单编号: E12932908409823098340</div>
            <div class="order">创建时间: 2018-06-18 13:24:25</div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Cell, CellGroup, NavBar, Icon, ContactCard, Field } from 'vant';
import product from '../../components/productbanner';
import addr from '../../components/orderaddress';
export default {
  data() {
    return {
      delivertype: '自提'
    };
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [ContactCard.name]: ContactCard,
    [Field.name]: Field,
    addr,
    product
  },
  methods: {
    back() {

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
