<template>
  <div class="card" v-if="product">
    <img :src="url(product.imageUrl)">
    <div class="title">{{product.name}}</div>
    <div class="price">
      <span class="normal">${{product.price}}</span>
      <span class="member" v-if="product.price !== product.memberPrice">${{product.memberPrice}}</span>
      <van-button class="button" size="mini" type="primary" @click="buy">购买</van-button>
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
.card
  margin 5px 0
  width 100%
  img
    padding 5px
    width 95%
    height auto
  .title
    padding 0 0 0 10px
  .price
    display flex
    margin-top 5px
    padding 0 0 0 10px
    .member
      padding-left 3px
      font-size 18px
      line-height 18px
    .normal
      color red
      font-size 18px
      line-height 18px
    .button
      font-size 18px
      margin-left auto
      margin-right 10px
</style>
