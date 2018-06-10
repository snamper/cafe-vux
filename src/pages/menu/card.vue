<template>
  <div class="card">
    <div class="thumb">
      <img :src="url(product.imageUrl)" class="img">
    </div>
    <div class="content">
      <div class="title" v-if="product.name">{{product.name}}</div>
      <div class="desc van-ellipsis" v-if="product.description">{{product.description}}</div>
      <div class="footer">
        <span class="price">
          <span class="normal">￥{{product.price}}</span>
          <span class="member" v-if="product.price !== product.memberPrice">￥{{product.memberPrice}}</span>
        </span>
        <van-button class="button" type="default" size="mini" @click="buy">购买</van-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Button } from 'vant';
import { getImageUrl } from '../../common/js/util.js'
export default {
  components: {
    [Button.name]: Button
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
  &:not(:first-child)
    margin-top 10px
  display flex
  background-color rgb(255, 255, 255)
  .thumb
    align-items center
    justify-content center
    margin 5px
    padding 5px
    border 1px sloid red
    width 30%
    img
      width 100px
      height 100px
      max-width 100%
      max-height 100%
  .content
    width 70%
    display flex
    flex-direction column
    .title
      padding-top 10px
      font-size 20px
    .desc
      margin 5px
    .footer
      margin-top auto
      margin-bottom 10px
      display flex
      .price,.button
        price-color()
        font-size 16px
      .button
        margin-left auto
        margin-right 10px
</style>
