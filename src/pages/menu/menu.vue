<template>
  <div class="menu">
    <logo></logo>
    <banner
      title="所有商品">
    </banner>
    <div class="cards" v-for="(product, index) in products" :key="index">
      <product :showcheckbox="false">
        <template slot="right-bottom">
          <van-button class="button" type="default" size="mini" @click="buy">购买</van-button>
        </template>
      </product>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Button, List } from 'vant';
import { mapGetters } from 'vuex';
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
    product
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
@import '../../common/stylus/mixin.styl'
.menu
  background-color rgb(244, 244, 244)
  margin-bottom 50px
  .cards
    .button
      font-size 18px
      price-color()
</style>
