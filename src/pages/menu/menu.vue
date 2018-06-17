<template>
  <div class="menu">
    <logo></logo>
    <banner
      title="所有商品">
    </banner>
    <div class="cards" v-for="(product, index) in products" :key="index">
      <div class="product" @click="showdetail(product)">
        <product :showcheckbox="false" :good="product">
          <template slot="right-bottom">
            <van-button class="button" type="default" size="mini" @click.stop.prevent="buy(product)">购买</van-button>
          </template>
        </product>
      </div>
    </div>
    <sku ref="sku"></sku>
  </div>
</template>

<script type="text/ecmascript=6">
import { Button, List } from 'vant';
import { mapGetters } from 'vuex';
import sku from '../../components/sku';
import logo from '../../components/logo';
import banner from '../../components/banner';
import product from '../../components/productbanner';
import Logger from 'chivy';
const log = new Logger('page/menu/menu');
export default {
  data() {
    return {
    };
  },
  components: {
    [Button.name]: Button,
    [List.name]: List,
    logo,
    banner,
    product,
    sku
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('getGoods');
    });
  },
  computed: {
    ...mapGetters([
      'products'
    ])
  },
  methods: {
    buy(product) {
      log.debug('buy');
      this.$refs.sku.showit(product);
    },
    showdetail(product) {
      log.info('page will change to good');
      this.$router.push({name: 'good', params: {good: product}});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.menu
  background-color rgb(244, 244, 244)
  margin-bottom 50px
  .cards
    .product
      margin 5px
      .button
        font-size 18px
        price-color()
</style>
