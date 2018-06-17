<template>
  <div class="good">
    <div class="content" v-if="good">
      <van-nav-bar
        title="商品详情"
        left-arrow
        @click-left="back">
      </van-nav-bar>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in sliders(good.imageUrl)" :key="index">
          <img :src="image.url" />
        </van-swipe-item>
      </van-swipe>
      <nameprice class="nameprice" :name="good.name" :price="good.price" :memberPrice="good.memberPrice"></nameprice>
      <div class="desc">{{good.description}}</div>
    </div>
    <van-goods-action>
      <van-goods-action-mini-btn icon="wap-home" text="首页" :to="{name: 'menu'}"></van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="cart" text="购物车" ></van-goods-action-mini-btn>
      <van-goods-action-big-btn text="加入购物车" @click="add2cart"></van-goods-action-big-btn>
      <van-goods-action-big-btn text="立即购买" primary @click="buyit" ></van-goods-action-big-btn>
    </van-goods-action>
    <sku ref="sku"></sku>
  </div>
</template>

<script type="text/ecmascript=6">
import { GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn, Swipe, SwipeItem, NavBar } from 'vant';
import { getImageUrl, isObjEmpty } from '../../common/js/util.js';
import nameprice from '../../components/nameprice';
import sku from '../../components/sku';
import Logger from 'chivy';
const log = new Logger('page/menu/good');
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
    }
  },
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NavBar.name]: NavBar,
    sku,
    nameprice
  },
  props: {
    good1: {
      type: Object
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (isObjEmpty(vm.good)) {
        vm.$router.push({name: 'menu'});
      }
    });
  },
  methods: {
    sliders(images) {
      const imageList = images.split(';');
      const result = [];
      imageList.forEach(image => {
        result.push({url: getImageUrl(image, 400)})
      });
      log.debug('silders is ' + JSON.stringify(result));
      return result;
    },
    back() {
      this.$router.push({name: 'menu'});
    },
    add2cart() {
      this.$refs.sku.showit(true, this.good);
    },
    buyit() {
      this.$refs.sku.shownext(true, this.good);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.good
  background-color rgb(244, 244, 244)
  margin-bottom 50px
  .content
    .desc
      text-indent 32px
      font-size 16px
      line-height 1.5
      margin 8px 0
      padding 0px 5px
</style>
