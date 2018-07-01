<template>
  <div class="active">
    <banner
      title="商品列表"
      subtitle="蛋糕手工打造">
    </banner>
    <div class="products" >
      <div class="product" v-for="(product, index) in sliders" :key="index">
        <orderdetail :product="product" @click.native="showdetail(product)"></orderdetail>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { mapGetters } from 'vuex';
import banner from '../../components/banner';
import orderdetail from '../../components/orderdetail';
import { isObjEmpty } from '../../common/js/util';
import Logger from 'chivy';
const log = new Logger('page/active/active');
export default {
  data() {
    return {
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit('updateLoadingStatus', {isLoading: true});
      vm.$store.dispatch('getGoods').then(() => {
        vm.$store.commit('updateLoadingStatus', {isLoading: false});
      });
    });
  },
  components: {
    orderdetail,
    banner
  },
  computed: {
    ...mapGetters([
      'sliders'
    ])
  },
  methods: {
    showdetail(product) {
      log.info('page will change to good');
      this.$router.push({name: 'good', params: {good: product}});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.active
  margin-bottom 50px
  background-color rgb(244, 244, 244)
  .products
    display flex
    flex-wrap wrap
    .product
      width 50%
</style>
