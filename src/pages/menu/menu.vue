<template>
  <div class="menu">
    <logo></logo>
    <banner
      title="所有商品">
    </banner>
    <div class="cards" v-for="(product, index) in 10" :key="index">
      <div class="product" @click="showdetail(product)">
        <product :showcheckbox="false">
          <template slot="right-bottom">
            <van-button class="button" type="default" size="mini" @click="buy(product)">购买</van-button>
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
      good: {
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
        memberPrice: 87,
        name: '动物饼干',
        objClass: 'com.xdt.ums.shop.common.entity.ProductImpl',
        price: 88,
        slider: true
      }
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
      // vm.$store.dispatch('getGoods');
    });
  },
  computed: {
    ...mapGetters([
      'sliders',
      'products'
    ])
  },
  methods: {
    buy(product) {
      log.debug('buy');
      this.$refs.sku.showit(true, product);
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
