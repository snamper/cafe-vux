<template>
  <div id="app">
    <view-box>
      <router-view :categorys="categorys" :member="member" v-on:dloginmember="dloginmember" v-on:dregistermember="dregistermember"></router-view>
      <tabbar>
        <tabbar-item :link="{path:'/home'}">
          <img slot="icon" src="./common/img/icon_nav_button.png">
          <span slot="label">主页</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/menu'}">
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
import { Tabbar, TabbarItem, XHeader, ViewBox, Badge } from 'vux';
import Logger from 'chivy';
const log = new Logger('cafe/App');
export default {
  name: 'app',
  data() {
    return {
      categorys: {
        /* get data from ajax */
      },
      member: {}
    };
  },
  components: {
    Tabbar,
    TabbarItem,
    XHeader,
    ViewBox,
    Badge
  },
  created: function() {
    this.$http.get('/shop/category/show/ui/getCategoriedProducts.do').then((response) => {
      this.categorys = response.body;
      log.info('Ajax request start');
      log.debug('Ajax request categorys data is ' + JSON.stringify(this.categorys));
      // console.log(this.categorys);
    });
  },
  mounted: function() {
    let member = JSON.parse(sessionStorage.getItem('member'));
    this.member = member;
  },
  computed: {
    badgeNo: function() {
      let badgeNo = 0;
      for (let category in this.categorys) {
        this.categorys[category].forEach((product) => {
          if (product.count) {
            badgeNo = badgeNo + product.count;
          }
        });
      }
      // console.log('count is ' + String(badgeNo));
      if (badgeNo === 0) {
        return '';
      } else {
        return String(badgeNo);
      }
    }
  },
  methods: {
    dloginmember: function(data) {
      this.member = data;
      log.info('save member to sessionstorage');
      sessionStorage.setItem('member', JSON.stringify(this.member));
      log.debug('sessionStorage.member is ' + JSON.stringify(sessionStorage.getItem('member')));
    },
    dregistermember: function(data) {
      log.debug('data is ' + JSON.stringify(data));
      // console.log(data);
      this.member = {
        'balance': 0,
        'id': data.entityid,
        'name': data.entityName
      };
      log.info('save member to sessionstorage');
      sessionStorage.setItem('member', JSON.stringify(this.member));
      log.debug('sessionStorage.member is ' + JSON.stringify(sessionStorage.getItem('member')));
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
