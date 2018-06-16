<template>
  <div class="active">
    <banner
      title="商品列表"
      subtitle="蛋糕手工打造">
    </banner>
    <!-- <div class="products" v-if="products">
      <div class="product" v-for="(product, index) in sliders" :key="index">
        <orderdetail></orderdetail>
        <product :product=" product" @buy="buy"  @click.native="showdetail(product)"></product>
      </div>
    </div> -->
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad">
      <div class="products" >
        <orderdetail v-for="(product, index) in 10" :key="index"></orderdetail>
      </div>
    </van-list>
  </div>
</template>

<script type="text/ecmascript=6">
import { List } from 'vant';
import banner from '../../components/banner';
import orderdetail from '../../components/orderdetail';
export default {
  data() {
    return {
      loading: false,
      finished: true
    }
  },
  components: {
    [List.name]: List,
    orderdetail,
    banner
  },
  methods: {
    onLoad() {

    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.active
  background-color rgb(244, 244, 244)
  .products
    display flex
    flex-wrap wrap
    .orderdetail
      width 50%
</style>
