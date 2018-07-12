<template>
  <div>
    <van-sku v-if="good"
      v-model="show"
      :sku="sku"
      :goods="sku.goods"
      :goods-id="sku.goods_id"
      :hide-stock="sku.hide_stock"
      reset-stepper-on-hide
      reset-selected-sku-on-hide
      :close-on-click-overlay="true"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked">
      <template v-if="showSelf" slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions" v-if="next">
          <van-button bottom-action @click="props.skuEventBus.$emit('sku:buy')">{{$t('sku.next')}}</van-button>
        </div>
        <div class="van-sku-actions" v-if="!next">
          <van-button bottom-action @click="props.skuEventBus.$emit('sku:addCart')">{{$t('sku.confirm')}}</van-button>
        </div>
      </template>
    </van-sku>
  </div>
</template>

<script type="text/ecmascript=6">
import { Sku, Button, Toast } from 'vant';
import { mapState } from 'vuex';
import Vue from 'vue';
import Logger from 'chivy';
const log = new Logger('components/sku');
export default {
  data() {
    return {
      show: false,
      next: true,
      good: null,
      showSelf: false
    };
  },
  props: {
    confirm: {
      type: Boolean,
      default: false
    }
  },
  components: {
    [Sku.name]: Sku,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  computed: {
    ...mapState([
      'carts'
    ]),
    sku() {
      return this.SkuData(this.good);
    }
  },
  methods: {
    onBuyClicked(data) {
      //TODO 需要加一个loading，创建待付款订单中，这个有点慢
      log.debug('onBuyClicked' + JSON.stringify(data));
      this.$toast.loading('添加订单中...');
      this.Add2Cart(data).then(() => {
        log.warn('now jump to order page');
        this.$toast.success('添加订单成功');
        this.$router.push({name: 'order'});
        this.$toast.clear();
      }).catch(error => {
        log.error(error);
      });
    },
    onAddCartClicked(data) {
      log.debug('add carts');
      this.Add2SelectFoods(data).then(() => {
        this.show = false;
        this.$toast(this.$t('sku.success'));
      });
    },
    // 显示sku页面
    SkuShow(good) {
      this.ShowSku(good, false)
    },
    // 显示sku页面的Next和confirm
    NextOrConfirmShow(good, flag) {
      this.ShowSku(good, true)
      this.next = flag;
    },
    ShowSku(good, flag) {
      this.good = good;
      this.show = true;
      this.showSelf = flag;
    },
    Add2Cart(data) {
      return new Promise((resolve, reject) => {
        const good = data.selectedSkuComb.good;
        good.count = data.selectedNum;
        const carts = [good];
        this.$store.commit('update', {type: 'carts', value: carts});
        resolve();
      });
    },
    Add2SelectFoods(data) {
      return new Promise((resolve, reject) => {
        const good = data.selectedSkuComb.good;
        const count = data.selectedNum;
        this.$store.commit('addCount', {good, count});
        resolve();
      });
    },
    CountedGood(data) {
      let product = data.selectedSkuComb.good;
      product.count = data.selectedNum;
      return product;
    },
    SkuData(good) {
      const suk = {
        tree: [
          {
            k:  this.$t('sku.spec'),
            v: [
              {
                id: good.id,
                name: good.name
              }
            ],
            /* eslint-disable camelcase */
            k_s: 's1',
            count: 2
          }
        ],
        list: [ // 需要传递出去的数据
          {
            good: this.good,
            id: good.id,
            price: good.price * 100,
            name: good.name,
            code: good.code,
            stock_num: 1000,
            s1: good.id,
            goods_id: good.id
          }
        ],
        goods: {
          title: good.name,
          picture: this.$tools.resizeImage(good.imageUrl, 400),
          price: good.price
        },
        price: good.price,
        /* eslint-disable camelcase */
        stock_num: 1000, // 默认库存是1000个
        hide_stock: true // 是否隐藏剩余库存
      };
      return suk;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
