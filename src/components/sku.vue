<template>
  <div>
    <van-sku v-if="sku"
      v-model="showBase"
      :sku="sku"
      :goods="sku.goods"
      :goods-id="sku.goods_id"
      reset-stepper-on-hide
      reset-selected-sku-on-hide
      :close-on-click-overlay="true"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked">
    </van-sku>
  </div>
</template>

<script type="text/ecmascript=6">
import { Sku, Button } from 'vant';
import { getImageUrl } from '../common/js/util';
import Logger from 'chivy';
const log = new Logger('components/sku');
export default {
  data() {
    return {
      showBase: false,
      sku: {
        tree: [
          {
            k: '规格',
            v: [
              {
                id: 946755,
                name: '6寸'
              }
            ],
            k_s: 's1',
            count: 2
          }
        ],
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            code: '',
            s1: '946755',  // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: 10, // 当前 sku 组合对应的库存
            goods_id: 946755
          }
        ],
        goods: {
          // 商品标题
          title: '测试商品',
          // 默认商品 sku 缩略图
          picture: 'https://img.yzcdn.cn/upload_files/2017/03/16/Fs_OMbSFPa183sBwvG_94llUYiLa.jpeg?imageView2/2/w/100/h/100/q/75/format/jpg',
          price: 1,
          origin: 2
        },
        collection_id: 946755,
        goods_id: 946755,
        price: '1.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        none_sku: false // 是否无规格商品
      }
    };
  },
  components: {
    [Sku.name]: Sku,
    [Button.name]: Button
  },
  props: {
    good: {
      type: Object
    }
  },
  computed: {
    sku1() {
      log.debug('sku');
      return this.__sku(this.good);
    }
  },
  methods: {
    onBuyClicked(data) {
      log.debug('onBuyClicked' + JSON.stringify(data));
    },

    onAddCartClicked(data) {
      log.debug('onAddCartClicked' + JSON.stringify(data));
    },

    onPointClicked() {
      log.debug('积分兑换');
    },
    show(flag) {
      log.debug('show sku is ' + flag);
      this.showBase = flag;
    },
    __sku(good) {
      log.debug('__sku good is ' + JSON.stringify(good));
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
            id: good.id,
            price: good.price * 100,
            name: good.name,
            code: good.code,
            stock_num: 10,
            s1: good.code,
            goods_id: good.id
          }
        ],
        goods_info: {
          title: good.name,
          picture: getImageUrl(good.imageUrl, 400),
          price: good.price
        },
        price: good.price,
        /* eslint-disable camelcase */
        stock_num: 10
      };
      return suk;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
