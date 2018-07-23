<template>
  <div class="main">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div style="height:50px"></div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home" :to="{name: 'menu'}">主页</van-tabbar-item>
      <van-tabbar-item icon="like-o" :to="{name: 'activity'}">今日活动</van-tabbar-item>
      <van-tabbar-item icon="cart" :to="{name: 'cart'}" :info="info === 0 ? '' : info">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" :to="{name: 'member'}">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script type="text/ecmascript=6">
import { Tabbar, TabbarItem } from 'vant';
import { mapGetters } from 'vuex';
import Logger from 'chivy';
const log = new Logger('views/main');
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
    // this.$toast('open it in weixin？' + this.$tools.isWeixin());
    this.$store.dispatch('initUser').then(() => {
      this.Selected();
    });
  },
  computed: {
    ...mapGetters([
      'info'
    ])
  },
  methods: {
    // 根据路由代码激活当前选中图标
    Selected() {
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
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../styles/mixin.styl'
.main
  height 100%
  bgcolor()
</style>
