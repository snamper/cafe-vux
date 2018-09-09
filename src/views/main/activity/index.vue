<template>
  <div class="active">
    <banner
      title="商品列表"
      subtitle="蛋糕手工打造">
    </banner>
    <div class="products" >
      <div class="product" v-for="(product, index) in sliders" :key="index">
        <orderdetail :fontSize="12" :product="product" @click.native="jump2FoodPage(product)"></orderdetail>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { mapGetters } from 'vuex';
import banner from '@/components/banner';
import orderdetail from '@/components/desc';
import Logger from 'chivy';
const log = new Logger('views/main/activity');
export default {
  name: 'Activity',
  data() {
    return {
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 检查是否有商品，如果没有商品则跳转到menu页面
      if (vm.$store.state.product.goods.length === 0 ) {
        vm.$router.push({name: 'menu'});
      }
    });
  },
  components: {
    orderdetail,
    banner
  },
  computed: {
    ...mapGetters([
      'sliders'
    ])
  },
  methods: {
    jump2FoodPage(product) {
      this.$router.push({name: 'food', params: {good: product}});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../styles/mixin.styl';
.active
  bgcolor()
  bottom()
  .products
    display flex
    flex-wrap wrap
    .product
      width 50%
</style>
