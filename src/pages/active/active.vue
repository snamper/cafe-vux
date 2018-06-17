<template>
  <div class="active">
    <banner
      title="商品列表"
      subtitle="蛋糕手工打造">
    </banner>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad">
      <div class="products" >
        <div class="product" v-for="(product, index) in sliders" :key="index">
          <orderdetail :product="product" @click.native="showdetail(product)"></orderdetail>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script type="text/ecmascript=6">
import { List } from 'vant';
import { mapGetters } from 'vuex';
import banner from '../../components/banner';
import orderdetail from '../../components/orderdetail';
import Logger from 'chivy';
const log = new Logger('page/active/active');
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
  computed: {
    ...mapGetters([
      'sliders'
    ])
  },
  methods: {
    showdetail(product) {
      log.info('page will change to good');
      this.$router.push({name: 'good', params: {good: product}});
    },
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
    .product
      width 50%
</style>
