<template>
  <div class="menu" v-if="!isLoading">
    <logo></logo>
    <banner
      :title="$t('menu.allProduct')">
    </banner>
    <div class="cards" v-for="(product, index) in products" :key="index">
      <div class="product" @click="jump2FoodPage(product)">
        <product :showcheckbox="false" :good="product">
          <template slot="right-bottom">
            <van-button class="button" type="default" size="mini" @click.native.stop.prevent="onBuyClicked(product)">{{$t('menu.buyit')}}</van-button>
          </template>
        </product>
      </div>
    </div>
    <sku ref="sku"></sku>
  </div>
</template>

<script type="text/ecmascript=6">
import { Button, List } from 'vant';
import { mapGetters, mapState } from 'vuex';
import sku from '@/components/sku';
import logo from '@/components/logo';
import banner from '@/components/banner';
import product from '@/components/good';
import Logger from 'chivy';
const log = new Logger('views/main/menu');
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
  created() {
    this.$store.commit('updateLoadingStatus', {isLoading: true});
    this.$store.dispatch('getGoods').then(() => {
      this.$store.commit('updateLoadingStatus', {isLoading: false});
    });
  },
  computed: {
    ...mapGetters([
      'products'
    ]),
    ...mapState([
      'isLoading'
    ])
  },
  methods: {
    onBuyClicked(product) {
      log.info('buy product');
      this.$refs.sku.SkuShow(product);
    },
    // 点击显示good页面
    jump2FoodPage(product) {
      log.info('showdetail product');
      this.$router.push({name: 'food', params: {good: product}});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../styles/mixin.styl';
.menu
  bgcolor()
  bottom()
  .cards
    .product
      margin 5px
      .button
        font-size 18px
        price-color()
</style>
