<template>
  <div class="products" v-if="products">
    <div class="product" v-for="(product, index) in products" :key="index">
      <product :product="product" @buy="buy"></product>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import product from './product';
import Logger from 'chivy';
const log = new Logger('page/menu/products');
export default {
  data() {
    return {
    };
  },
  props: {
    products: {
      type: Array
    }
  },
  components: {
    product
  },
  methods: {
    buy(payload) {
      this.$emit('buy', {product: payload.product});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.products
  display flex
  flex-wrap wrap
  .product
    width 50%
</style>
