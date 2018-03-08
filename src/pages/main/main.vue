<template>
  <div class="main">
    <view-box>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </view-box>
    <tabbar>
        <tabbar-item :link="{path:'/menu'}" :selected="$route.path === '/menu' || $route.path === '/order'" @on-item-click="closeToast">
          <span slot="icon" class="iconfont icon-icon"></span>
          <span slot="label">菜单</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/news'}" :selected="$route.path === '/news'" @on-item-click="closeToast">
          <span slot="icon" class="iconfont icon-xinpin"></span>
          <span slot="label">新品</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/records'}" :selected="$route.path === '/records'" @on-item-click="closeToast">
          <span slot="icon" class="iconfont icon-dingdan"></span>
          <span slot="label">订单</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/member'}" :selected="$route.path === '/member'" @on-item-click="closeToast">
          <span slot="icon" class="iconfont icon-home"></span>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
  </div>
</template>

<script type="text/ecmascript-6">
import { Tabbar, TabbarItem, ViewBox, Loading } from 'vux';
import Logger from 'chivy';
const log = new Logger('pages/main/main');
export default {
  components: {
    Tabbar,
    TabbarItem,
    ViewBox,
    Loading
  },
  methods: {
    closeToast() {
      log.debug('close toast');
      this.$vux.toast.hide();
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.main
  position fixed
  width 100%
  height 100%
</style>
