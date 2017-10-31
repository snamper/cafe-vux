<template>
    <div class="home-wrapper">
    <view-box>
      <router-view></router-view>
    </view-box>
    <tabbar>
        <tabbar-item :link="{path:'/home/home'}">
          <img slot="icon" src="../../common/img/home.png"></img>
          <span slot="label">主页</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/home/menu'}">
          <img slot="icon" src="../../common/img/menu.png"></img>
          <span slot="label">菜单</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/home/cart/cartlist'}" :badge="badgeNo">
          <img slot="icon" src="../../common/img/cart.png"></img>
          <span slot="label">购物车</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/home/record'}">
          <img slot="icon" src="../../common/img/me.png"></img>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </div>
</template>

<script type="text/ecmascript-6">
import { Tabbar, TabbarItem, ViewBox, Badge } from 'vux';
import Logger from 'chivy';
import { mapGetters } from 'vuex';
const log = new Logger('cafe/main');
export default {
  name: 'app',
  components: {
    Tabbar,
    TabbarItem,
    ViewBox,
    Badge
  },
  created: function () {
    log.info('call initCategorys function to init categorys data');
    let categorys = this.$store.commit('initCategorys');
    log.debug('products data is ' + JSON.stringify(categorys));
  },
  mounted: function () {
    log.info('call getmember function to init member');
    this.$store.commit('getMember');
  },
  computed: {
    ...mapGetters({
      badgeNo: 'badgeNo'
    })
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home-wrapper
  height 100%
  width 100%
</style>
