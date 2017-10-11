<template>
  <div id="app">
    <view-box>
      <h1>test</h1>
      <router-view></router-view>
      <tabbar>
        <tabbar-item>
          <img slot="icon" src="./common/img/icon_nav_button.png">
          <span slot="label">主页</span>
        </tabbar-item>
        <tabbar-item>
          <img slot="icon" src="./common/img/icon_nav_button.png">
          <span slot="label">菜单</span>
        </tabbar-item>
        <tabbar-item>
          <img slot="icon" src="./common/img/icon_nav_button.png">
          <span slot="label">会员</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Drawer, ViewBox } from 'vux';
export default {
  name: 'app',
  components: {
    Tabbar,
    TabbarItem,
    Drawer,
    ViewBox
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app {
  height: 100%;
}
</style>
