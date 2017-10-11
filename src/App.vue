<template>
  <div id="app">
    <view-box>
      <img src="../static/img/logo.jpg" width="100%" height="auto">
      <h1>test</h1>
      <router-view></router-view>
      <tabbar>
        <tabbar-item :link="{path:'/home'}" >
          <img slot="icon" src="./common/img/icon_nav_button.png">
          <span slot="label">主页</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/menu'}">
          <img slot="icon" src="./common/img/icon_nav_button.png">
          <span slot="label">菜单</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/member'}">
          <img slot="icon" src="./common/img/icon_nav_button.png">
          <span slot="label">会员</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, XHeader, ViewBox } from 'vux';
export default {
  name: 'app',
  components: {
    Tabbar,
    TabbarItem,
    XHeader,
    ViewBox
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app {
  height: 100%;
}
</style>
