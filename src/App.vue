<template>
  <div id="app">
    <view-box>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </view-box>
    <tabbar>
        <tabbar-item :link="{path:'/menu'}">
          <span slot="icon" class="iconfont icon-icon"></span>
          <span slot="label">菜单</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/new'}" >
          <span slot="icon" class="iconfont icon-xinpin"></span>
          <span slot="label">新品</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/order'}" >
          <span slot="icon" class="iconfont icon-dingdan"></span>
          <span slot="label">订单</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/member'}" >
          <span slot="icon" class="iconfont icon-home"></span>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
  </div>
</template>

<script type="text/ecmascript-6">
import { Tabbar, TabbarItem, ViewBox } from 'vux';
import Logger from 'chivy';
const log = new Logger('cafe/App');
export default {
  created: function () {
    log.debug('created uuid here');
    log.debug(this.setUUID());
    this.$store.commit('setUUID', this.setUUID());
    log.debug('uuid is ' + this.$store.state.uuid);
  },
  methods: {
    setUUID: function () {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
    }
  },
  components: {
    Tabbar,
    TabbarItem,
    ViewBox
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/1px.less";
#app {
  height: 100%;
  width: 100%;
}
.iconfont {
  font-size: 1.5rem;
}
.weui-tab {
  position: fixed;
  bottom: 50;
  top: 0;
}
</style>
