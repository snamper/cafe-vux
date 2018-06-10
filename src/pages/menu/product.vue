<template>
  <div class="card" v-if="product">
    <img :src="url(product.imageUrl)">
    <div class="title">{{product.name}}</div>
    <div class="price">
      <span class="normal">${{product.price}}</span>
      <span class="member" v-if="product.price !== product.memberPrice">${{product.memberPrice}}</span>
      <van-button class="button" size="mini" type="default" @click="buy">购买</van-button>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Button } from 'vant';
import avator from '../../components/avator';
import { getImageUrl } from '../../common/js/util';
import Logger from 'chivy';
const log = new Logger('page/menu/product');
export default {
  components: {
    [Button.name]: Button,
    avator
  },
  props: {
    product: {
      type: Object
    }
  },
  methods: {
    url(imageUrl) {
      // log.debug(imageUrl);
      return getImageUrl(imageUrl, 400);
    },
    buy() {
      this.$emit('buy',{product: this.product});
    }
  }

};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.card
  background-color rgb(255, 255, 255)
  width 100%
  :not(:first-child)
    margin 5px
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
