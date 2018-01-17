<template>
  <div class="main">
    <view-box>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </view-box>
    <tabbar>
        <tabbar-item :link="{path:'/menu'}">
          <span slot="icon" class="iconfont icon-icon"></span>
          <span slot="label">菜单</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/news'}">
          <span slot="icon" class="iconfont icon-xinpin"></span>
          <span slot="label">新品</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/records'}">
          <span slot="icon" class="iconfont icon-dingdan"></span>
          <span slot="label">订单</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/member'}">
          <span slot="icon" class="iconfont icon-home"></span>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
  </div>
</template>

<script type="text/ecmascript-6">
import { Tabbar, TabbarItem, ViewBox, Loading } from 'vux';
export default {
  components: {
    Tabbar,
    TabbarItem,
    ViewBox,
    Loading
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.main
  position fixed
  width 100%
  height 100%
</style>
