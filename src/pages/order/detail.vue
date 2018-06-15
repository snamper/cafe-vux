<template>
  <div class="detail">
    <van-panel title="TianBakery" desc="订单号: E12932908409823098340" status="交易关闭"></van-panel>
    <order></order>
    <banner title="查看全部4件商品"></banner>
    <van-cell-group>
      <van-cell title=" " value="合计: ￥127.00"></van-cell>
    </van-cell-group>
  </div>
</template>

<script type="text/ecmascript=6">
import { Cell, CellGroup, Panel } from 'vant';
import order from '../cart/order';
import banner from '../../components/banner';
export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Panel.name]: Panel,
    order,
    banner
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.more
  border 1px solid red
.van-cell__label
  font-size 10px
</style>
