<template>
  <div class="menu">
    <logo></logo>
    <description name="test" :price="10" :memberPrice="8">
      <span>test</span>
    </description>
    <banner
      title="商品列表"
      subtitle="蛋糕手工打造">
    </banner>
    <div class="products" v-if="products">
      <div class="product" v-for="(product, index) in sliders" :key="index">
        <product :product="product" @buy="buy"  @click.native="showdetail(product)"></product>
      </div>
    </div>
    <banner
      title="所有商品">
    </banner>
    <div class="cards" v-for="(product, index) in products" :key="index">
      <card
        @click.native="showdetail(product)"
        @buy="buy"
        :product="product">
      </card>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Button } from 'vant';
import { mapGetters } from 'vuex';
import logo from '../../components/logo';
import banner from '../../components/banner';
import product from './product';
import card from './card';
import description from './description';
import Logger from 'chivy';
const log = new Logger('page/menu/menu');
export default {
  data() {
    return {
    };
  },
  components: {
    [Button.name]: Button,
    logo,
    banner,
    product,
    card,
    description
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
    },
    showdetail(product) {
      log.info('page will change to good');
      this.$router.push({name: 'good', params: {good: product}});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.menu
  background-color rgb(244, 244, 244)
  margin-bottom 50px
  .products
    display flex
    flex-wrap wrap
  .product
    width 50%
  .cards
    .van-card__price
      color #f44
</style>
