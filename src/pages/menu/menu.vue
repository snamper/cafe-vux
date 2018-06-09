<template>
  <div class="menu">
    <logo></logo>
    <tipsbar
      title="商品列表"
      subtitle="蛋糕手工打造">
    </tipsbar>
    <products :products="sliders" @buy="buy"></products>
    <tipsbar
      title="所有商品">
    </tipsbar>
    <div class="cards" v-for="(product, index) in products" :key="index">
      <van-card
        :thumb="product.imageUrl"
        :title="product.name"
        :desc="product.description"
        :price="product.price">
        <div class="footer" slot="footer">
          <van-button size="mini" type="primary" @buy="buy(product)">购买</van-button>
        </div>
      </van-card>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Card, Button } from 'vant';
import { mapGetters } from 'vuex';
import logo from '../../components/logo';
import tipsbar from '../../components/tipsbar';
import products from './products';
import Logger from 'chivy';
const log = new Logger('page/menu/menu');
export default {
  data() {
    return {
    };
  },
  components: {
    [Card.name]: Card,
    [Button.name]: Button,
    logo,
    tipsbar,
    products
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('getGoods');
    });
  },
  computed: {
    ...mapGetters([
      'sliders',
      'products'
    ])
  },
  methods: {
    buy(paylod) {
      log.debug(paylod);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.menu
  margin-bottom 50px
  .cards
    .van-card__price
      color #f44
</style>
