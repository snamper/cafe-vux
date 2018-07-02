<template>
  <div class="main">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <van-tabbar v-model="active" @change="change">
      <van-tabbar-item icon="home" :to="{name: 'menu'}">{{$t('tabBar.menu')}}</van-tabbar-item>
      <van-tabbar-item icon="like-o" :to="{name: 'active'}">今日活动</van-tabbar-item>
      <van-tabbar-item icon="cart" :to="{name: 'cart'}" :info="info">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" :to="{name: 'member'}">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script type="text/ecmascript=6">
import { Tabbar, TabbarItem } from 'vant';
import { mapGetters } from 'vuex';
import Logger from 'chivy';
const log = new Logger('pages/main');
export default {
  data() {
    return {
      active: 0
    }
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  created() {
    log.info('start init UUID');
    this.$store.commit('init');
    this.__selected();
  },
  computed: {
    ...mapGetters([
      'selectFoods'
    ]),
    info() {
      return this.selectFoods.length === 0 ? '' : this.__totalcount(this.selectFoods);
    }
  },
  methods: {
    change(active) {
      log.debug('active is ' + active);
    },
    __selected() {
      switch (this.$route.path) {
        case '/menu':
          this.active = 0;
          break;
        case '/cart':
          this.active = 2;
          break;
        case '/active':
          this.active = 1;
          break;
        case '/member':
          this.active = 3;
          break;
        case '/login':
          this.active = 3;
          break;
      }
    },
    __totalcount(goods) {
      let count = 0;
      goods.forEach(good => {
        count += good.count;
      });
      return count;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.main
  background-color rgb(249, 249, 249)
</style>
