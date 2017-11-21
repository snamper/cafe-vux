<template>
  <div id="app">
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
        <tabbar-item :link="{path:'/new'}" >
          <span slot="icon" class="iconfont icon-xinpin"></span>
          <span slot="label">新品</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/orderlist'}" >
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
import { Tabbar, TabbarItem, ViewBox, Loading } from 'vux';
import { mapState } from 'vuex';
import Logger from 'chivy';
import util from './common/js/util';
import session from './config/session';
const log = new Logger('cafe/App');
const uuidv4 = require('uuid/v4');
export default {
  created: function () {
    // 读取sessionStorage中是否存在UUID，如果存在则写入state中，如果不存在，则生成并写入sessionStorage中。
    let uuid = util.getkey(session.uuid);
    if (uuid === null) {
      log.debug('cannot get uuid from sessionStorage');
      uuid = uuidv4();
      util.setkey(session.uuid, uuid);
    }
    this.$store.commit('setUUID', uuid);
  },
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading
    })
  },
  components: {
    Tabbar,
    TabbarItem,
    ViewBox,
    Loading
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
