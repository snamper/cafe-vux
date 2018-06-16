<template>
  <div class="orderdetail" v-if="product">
    <img :src="url(product.imageUrl)">
    <nameprice
      :name="product.name"
      :price="product.price"
      :memberPrice="product.memberPrice">
      <van-button class="button" size="mini" type="default" @click="buy">购买</van-button>
    </nameprice>
  </div>
</template>

<script type="text/ecmascript=6">
import { Button } from 'vant';
import nameprice from './nameprice';
import { getImageUrl } from '../common/js/util';
import Logger from 'chivy';
const log = new Logger('page/menu/product');
export default {
  components: {
    [Button.name]: Button,
    nameprice
  },
  data() {
    return {
      product: {
        canBook: true,
        classifyId: 69,
        code: 'd519d09e-3bbd-4e5e-b044-715b02e75805',
        creatPeriod: '',
        createTime: 1521645341000,
        createTimeAsString: '2018-03-21 23:15:41',
        creatorId: -1,
        defaultEntity: false,
        description: '是肯定分离焦虑斯柯达据了解是开机地方了撒娇的就sad拉开就打算冷风机老大说封口胶辽阔的书法家辽阔的设计费辽阔的设计费鲁大师就发流口水当减肥离开的时间流口水当减肥李松快当减肥流口水当减肥离开的时间发连接的斯洛伐克就电视了开发借了时代峻峰了开机但是飞',
        id: 268,
        imageSliderUrl: '/upload/dongwubinggan-1521645338239.jpg',
        imageUrl: '/upload/dongwubinggan-1521645338239.jpg',
        memberPrice: 88,
        name: '动物饼干',
        objClass: 'com.xdt.ums.shop.common.entity.ProductImpl',
        price: 88,
        slider: true
      }
    }
  },
  props: {
    product1: {
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
@import '../common/stylus/mixin.styl'
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
