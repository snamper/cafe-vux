<template>
  <div class="main">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <van-tabbar v-model="active" @change="change">
      <!-- <van-tabbar-item icon="home" :to="{name: 'menu'}">主页</van-tabbar-item>
      <van-tabbar-item icon="like-o" :to="{name: 'active'}">今日活动</van-tabbar-item>
      <van-tabbar-item icon="cart" :to="{name: 'cart'}">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" :to="{name: 'member'}">我的</van-tabbar-item> -->
      <van-tabbar-item icon="home">主页</van-tabbar-item>
      <van-tabbar-item icon="like-o" >今日活动</van-tabbar-item>
      <van-tabbar-item icon="cart" >购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script type="text/ecmascript=6">
import { Tabbar, TabbarItem } from 'vant';
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
  },
  methods: {
    change(active) {
      log.debug('active is ' + active);
      if(active === 0) {
        this.$router.push({name: 'menu'});
      } else if(active === 1) {
        this.$router.push({name: 'active'});
      } else if(active === 2) {
        this.$router.push({name: 'cart'});
      } else if(active === 3) {
        this.$router.push({name: 'member'});
      }
    },
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.main
  background-color rgb(249, 249, 249)
</style>
