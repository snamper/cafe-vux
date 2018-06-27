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
          <van-button bottom-action @click="props.skuEventBus.$emit('sku:buy')">下一步</van-button>
        </div>
        <div class="van-sku-actions" v-if="!next">
          <van-button bottom-action @click="props.skuEventBus.$emit('sku:addCart')">确定</van-button>
        </div>
      </template>
    </van-sku>
  </div>
</template>

<script type="text/ecmascript=6">
import { Sku, Button, Toast } from 'vant';
import { getImageUrl } from '../common/js/util';
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
    },
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
      // log.debug('sku');
      return this.__sku(this.good);
    }
  },
  methods: {
    onBuyClicked(data) {
      log.debug('onBuyClicked' + JSON.stringify(data));
      this.__add2cart(data).then(() => {
        this.$router.push({name: 'pay'});
      });
    },
    onAddCartClicked(data) {
      log.debug('add carts');
      this.__add2cart(data).then(() => {
        this.__showAndToast();
      });
    },
    onPointClicked() {
      log.debug('积分兑换');
    },
    showit(good) {
      log.debug('showit');
      this.good = good;
      this.show = true;
      this.showSelf = false;
    },
    shownext(good, flag) {
      log.debug('shownext');
      this.good = good;
      this.show = true;
      this.showSelf = true;
      this.next = flag;
    },
    nextstep(data) {
      log.debug('data is' + JSON.stringify(data));
      this.$router.push({name: 'pay'});
    },
    __add2cart(data) {
      return new Promise((resolve, reject) => {
        const good = data.selectedSkuComb.good;
        const count = data.selectedNum;
        this.$store.commit('addCount', {good, count});
        resolve();
      });
    },
    __data(data) {
      let product = data.selectedSkuComb.good;
      product.count = data.selectedNum;
      return product;
    },
    __submit(data) {
      this.$store.dispatch('add2cart', this.__data(data)).then(result => {
        if (result) {
          this.__showAndToast();
        }
      });
    },
    __showAndToast() {
      this.show = false;
      Toast({
        message: '添加购物车成功~',
        forbidClick: true,
        duration: 1000
      });
    },
    __sku(good) {
      // log.debug('__sku good is ' + JSON.stringify(good));
      const suk = {
        tree: [
          {
            k: '规格',
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
          picture: getImageUrl(good.imageUrl, 400),
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
