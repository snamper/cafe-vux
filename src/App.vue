<template>
  <div id="app">
    <view-box>
      <router-view></router-view>
      <tabbar>
        <tabbar-item :link="{path:'/home'}">
          <img slot="icon" src="./common/img/icon_nav_button.png">
          <span slot="label">主页</span>
        </tabbar-item>
        <!-- <tabbar-item :link="{path:'/menu'}"> -->
        <tabbar-item @click.native="clear">
          <img slot="icon" src="./common/img/icon_nav_button.png">
          <span slot="label">菜单</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/cart'}" :badge="badgeNo">
          <img slot="icon" src="./common/img/icon_nav_button.png">
          <span slot="label">购物车</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/member'}">
          <img slot="icon" src="./common/img/icon_nav_button.png">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script type="text/ecmascript-6">
import { Tabbar, TabbarItem, ViewBox, Badge } from 'vux';
import Logger from 'chivy';
import { mapGetters } from 'vuex';
const log = new Logger('cafe/App');
export default {
  name: 'app',
  components: {
    Tabbar,
    TabbarItem,
    ViewBox,
    Badge
  },
  created: function() {
    let categorys = this.$store.commit('initCategorys');
    log.debug('products data is' + JSON.stringify(categorys));
  },
  mounted: function() {
    this.$store.commit('getMember');
  },
  computed: {
    ...mapGetters({
      badgeNo: 'badgeNo'
    })
  },
  methods: {
    clear: function() {
      log.error('click');
      this.$store.commit('testClear');
    }
  }
};
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#app {
  height: 100%;
}
</style>
