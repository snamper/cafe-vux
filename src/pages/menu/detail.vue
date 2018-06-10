<template>
  <div>
    <div class="content">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in silders(product.imageSliderUrl)" :key="index">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-goods-action>
      <van-goods-action-mini-btn icon="wap-home" text="首页" :to="{name: 'menu'}"></van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="cart" text="购物车" ></van-goods-action-mini-btn>
      <van-goods-action-big-btn text="加入购物车" ></van-goods-action-big-btn>
      <van-goods-action-big-btn text="立即购买" primary ></van-goods-action-big-btn>
    </van-goods-action>
  </div>
</template>

<script type="text/ecmascript=6">
import { GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn, Swipe, SwipeItem } from 'vant';
import { getImageUrl } from '../../common/js/util.js';
export default {
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  props: {
    product: {
      type: Object
    }
  },
  methods: {
    sliders(imageUrl) {
      const imageList = images.split(';');
      const result = [];
      imageList.forEach(image => {
        result.push({url: getImageUrl(image, 400)})
      });
      return result;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
