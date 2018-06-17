<template>
  <div>
    <van-sku v-if="sku"
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
      <template v-if="next" slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <van-button bottom-action @click="nextstep">下一步</van-button>
        </div>
      </template>
    </van-sku>
  </div>
</template>

<script type="text/ecmascript=6">
import { Sku, Button, Toast } from 'vant';
import { getImageUrl } from '../common/js/util';
import Logger from 'chivy';
const log = new Logger('components/sku');
export default {
  data() {
    return {
      show: false,
      next: false,
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
            stock_num: 100, // 当前 sku 组合对应的库存
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
        stock_num: 1000, // 商品总库存
        none_sku: false, // 是否无规格商品,
        hide_stock: true // 是否隐藏剩余库存
      },
      good: null
    };
  },
  components: {
    [Sku.name]: Sku,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
/*   props: {
    good: {
      type: Object
    }
  }, */
  computed: {
    sku1() {
      log.debug('sku');
      return this.__sku(this.good);
    }
  },
  methods: {
    onBuyClicked(data) {
      log.debug('onBuyClicked' + JSON.stringify(data));
      this.$router.push({name: 'pay'});
    },
    onAddCartClicked(data) {
      log.debug('onAddCartClicked' + JSON.stringify(data));
      this.show = false;
      Toast('添加购物车成功~');
    },
    onPointClicked() {
      log.debug('积分兑换');
    },
    showit(flag, good) {
      log.debug('show sku is ' + flag);
      this.good = good;
      this.show = flag;
    },
    shownext(flag, good) {
      log.debug('show next is ' + flag);
      this.good = good;
      this.show = flag;
      this.next = true;
    },
    nextstep() {
      log.debug('next');
      this.$router.push({name: 'pay'});
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
