<template>
  <div id="app">
    <view-box>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </view-box>
    <tabbar>
        <tabbar-item :link="{path:'/menu'}" :selected="selects.menu">
          <span slot="icon" class="iconfont icon-icon"></span>
          <span slot="label">菜单</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/new'}" :selected="selects.new">
          <span slot="icon" class="iconfont icon-xinpin"></span>
          <span slot="label">新品</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/orderlist'}" :selected="selects.order">
          <span slot="icon" class="iconfont icon-dingdan"></span>
          <span slot="label">订单</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/member'}" :selected="selects.member">
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
  },
  computed: {
    selects() {
      return this.$store.state.selects;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
