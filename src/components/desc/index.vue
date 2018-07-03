<template>
  <div class="orderdetail" v-if="product">
    <img :src="url(product.imageUrl)">
    <nameprice
      :name="product.name"
      :price="product.price"
      :memberPrice="product.memberPrice">
      <van-button style="color:rgb(255, 97, 25)" class="button" size="mini" type="default" @click="buy">购买</van-button>
    </nameprice>
  </div>
</template>

<script type="text/ecmascript=6">
import { Button } from 'vant';
import nameprice from './nameprice';
import { resizeImage } from '@/utils/utils';
import Logger from 'chivy';
const log = new Logger('page/menu/product');
export default {
  components: {
    [Button.name]: Button,
    nameprice
  },
  data() {
    return {
    }
  },
  props: {
    product: {
      type: Object
    }
  },
  methods: {
    url(imageUrl) {
      // log.debug(imageUrl);
      return resizeImage(imageUrl, 400);
    },
    buy() {
      this.$emit('buy',{product: this.product});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../styles/mixin.styl'
.orderdetail
  background-color rgb(255, 255, 255)
  width 100%
  img
    padding 5px
    width 95%
    height auto
  .title
    padding 0 0 0 10px
    font-size 16px
  .price
    display flex
    margin-top 5px
    padding 5px 0 5px 10px
    .member, .normal,.button
      price-color()
      font-size 16px
    .member, .normal
      line-height 32px
    .member
      padding-left 3px
    .button
      margin-left auto
      margin-right 10px
</style>
