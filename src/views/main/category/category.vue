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
            @click="selectMenu(index,$event)">
            <!-- :class="{'current':currentIndex===index}" -->
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
  </div>
</template>

<script type="text/ecmascript=6">
import { Button } from 'vant';
import BScroll from 'better-scroll';
import logo from '@/components/logo';
import product from '@/components/good';
import { mapGetters, mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('views/main/category');
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
    product
  },
  created() {
    this.$store.commit('updateLoadingStatus', {isLoading: true});
    this.$store.dispatch('getGoods').then(() => {
      this.init();
      this.$store.commit('updateLoadingStatus', {isLoading: false});
    });
  },
  computed: {
    ...mapState([
      'isLoading',
      'goods'
    ]),
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
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
      let foodList = this.$refs.foodList;
      let el = foodList[index];
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
      let foodList = this.$refs.foodList;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    _followScroll(index) {
      let menuList = this.$refs.menuList;
      let el = menuList[index];
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
@import '../../../styles/mixin.styl';
.goods
  display flex
  position absolute
  top 120px
  bottom 50px
  width 100%
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 70px
      padding 0 12px
      line-height 14px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #fff
        font-weight 700
        .text
          border-none()
      .text
        display table-cell
        width 56px
        vertical-align middle
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color: rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 10px
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom: 0
      .product
        width 100%
        .button
          font-size 18px
          price-color()
</style>
