<template>
 <div>
   <logo></logo>
   <div class="goods">
     <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li
            class="menu-item"
            ref="menuList"
            v-for="(item,index) in goods"
            :key="index"
            :class="{'current':currentIndex===index}"
            @click="selectMenu(index)">
            <!--TODO 暂时未解决高亮的问题 -->
            <span class="text border-1px">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list" ref="foodList" v-for="(item,index) in goods" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item" v-for="(good, index) in item.list" :key="index">
                <div class="product" @click="jump2FoodPage(good)">
                  <product :showcheckbox="false" :good="good">
                    <template slot="right-bottom">
                      <van-button class="button" type="default" size="mini" @click.native.stop.prevent="onBuyClicked(good)">{{$t('menu.buyit')}}</van-button>
                    </template>
                  </product>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
   </div>
   <sku ref="sku"></sku>
 </div>
</template>

<script>
import { Button } from 'vant';
import BScroll from 'better-scroll';
import logo from '@/components/logo';
import product from '@/components/good';
import sku from '@/components/sku';
import { mapState } from 'vuex';
/* import good from './test.js'; */
import Logger from 'chivy';
const log = new Logger('views/main/menu');
export default {
  data() {
    return {
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  components: {
    [Button.name]: Button,
    logo,
    sku,
    product
  },
  created() {
    this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: true});
    this.$store.dispatch('getGoods').then(() => {
      this.init();
      this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false});
    }).catch(error => {
      log.error(JSON.stringify(error));
      this.$router.push({name: '404'});
    });
    /* this.init(); */
  },
  computed: {
    ...mapState({
      'isLoading': state => state.product.isLoading,
      'goods': state => state.product.goods
    }),
    currentIndex() {
      /*eslint-disable */
      // debugger
      // log.error('this.listHeight.length = ' + this.listHeight.length);
      for (let i = 0; i < this.listHeight.length; i++) {
        // log.warn('i = ' + i);
        const height1 = this.listHeight[i];
        // log.warn('height1 = ' + height1);
        const height2 = this.listHeight[i + 1];
        // log.warn('height2 = ' + height1);
        // log.warn('this.scrollY = ' + this.scrollY);
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this._followScroll(i);
          return i;
        }
      }
      return 0;
    }
  },
  methods: {
    onBuyClicked(product) {
      log.info('buy product');
      this.$refs.sku.SkuShow(product);
    },
    init() {
      this.$nextTick(() => {
        this._initScroll();
        this._calculateHeight();
      });
    },
    selectMenu(index) {
      // log.info('selectMenu index is ' + index);
      const foodList = this.$refs.foodList;
      const el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    _initScroll() {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y));
        }
      });
    },
    _calculateHeight() {
      // debugger
      const foodList = this.$refs.foodList;
      // log.debug(foodList);
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        const item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    _followScroll(index) {
      const menuList = this.$refs.menuList;
      const el = menuList[index];
      // log.info('_followScroll index is ' + index);
      this.meunScroll.scrollToElement(el, 300, 0, -100);
    },
    // 点击显示good页面
    jump2FoodPage(product) {
      log.info('showdetail product');
      this.$router.push({name: 'food', params: {good: product}});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.goods
  position absolute
  top 120px
  bottom 50px
  width 100%
  overflow hidden
  display flex
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 70px
      padding-left 12px
      line-height 14px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #fff
        font-weight 700
        .text
          &:after
            display: none
      .text
        display table-cell
        width 56px
        vertical-align middle
        position: relative
        &:after
          display: block
          position: absolute
          left: 0
          bottom: 0
          width: 100%
          border-top: 1px solid rgba(7, 17, 27, 0.1)
          content: ' '
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      padding-top 5px
      height 20px
      line-height 20px
      border-left 2px solid #d9dde1
      font-size 16px
      font-weight 700
      color: rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 10px
      position: relative
      &:after
        display: block
        position: absolute
        left: 0
        bottom: 0
        width: 100%
        border-top: 1px solid rgba(7, 17, 27, 0.1)
        content: ' '
      &:last-child
        &:after
          display: none
        margin-bottom: 0
      .product
        width 100%
        .button
          font-size 14px
          color rgb(255, 97, 25)
</style>
