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
      <van-goods-action-mini-btn icon="cart" text="购物车" :to="{name: 'cart'}" :info="info"></van-goods-action-mini-btn>
      <van-goods-action-big-btn text="加入购物车" @click="add2cart"></van-goods-action-big-btn>
      <van-goods-action-big-btn text="立即购买" primary @click="buyit" ></van-goods-action-big-btn>
    </van-goods-action>
    <sku ref="sku" confirm></sku>
  </div>
</template>

<script type="text/ecmascript=6">
import { GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn, Swipe, SwipeItem, NavBar } from 'vant';
import { mapGetters } from 'vuex';
import { getImageUrl, isObjEmpty } from '../../common/js/util.js';
import nameprice from '../../components/nameprice';
import sku from '../../components/sku';
import Logger from 'chivy';
const log = new Logger('page/menu/good');
export default {
  data() {
    return {
      to: ''
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
    good: {
      type: Object
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      log.debug('beforeRouteEnter to path is ' + to.path);
      // 保存这个路由是从那个地方来的
      vm.to = to.path;
      if (isObjEmpty(vm.good)) {
        vm.$router.push({name: 'menu'});
      }
    });
  },
  computed: {
    ...mapGetters([
      'selectFoods'
    ]),
    info() {
      if (this.selectFoods.length === 0) {
        return '';
      } else {
        let result = 0;
        this.selectFoods.forEach(good => {
          result += good.count;
        });
        return result;
      }
    },
    url() {
      if (to === '/menu') {
        return true;
      } else if(to === '/active') {
        return false;
      } else {
        return null;
      }
    }
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
      if(this.url) {
        this.$router.push({name: 'menu'});
      } else {
        this.$router.push({name: 'active'});
      }
    },
    add2cart() {
      this.$refs.sku.shownext(this.good, false);
    },
    buyit() {
      this.$refs.sku.shownext(this.good, true);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.good
  background-color rgb(244, 244, 244)
  margin-bottom 50px
  .content
    .van-nav-bar
      position fixed
      left 0px
      top 0px
      width 100%
    .desc
      text-indent 32px
      font-size 16px
      line-height 1.5
      margin 8px 0
      padding 0px 5px
</style>
