<template>
  <div class="active">
    <banner
      :title="$t('activity.productlist')"
      :subtitle="$t('activity.subtitle')">
    </banner>
    <div class="products" >
      <div class="product" v-for="(product, index) in sliders" :key="index">
        <orderdetail :fontSize="12" :product="product" @click.native="jump2FoodPage(product)"></orderdetail>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { mapGetters } from 'vuex';
import banner from '@/components/banner';
import orderdetail from '@/components/desc';
import { isObjEmpty } from '@/utils/utils';
import Logger from 'chivy';
const log = new Logger('views/main/activity');
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
    jump2FoodPage(product) {
      this.$router.push({name: 'food', params: {good: product}});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../styles/mixin.styl';
.active
  bgcolor()
  bottom()
  .products
    display flex
    flex-wrap wrap
    .product
      width 50%
</style>
