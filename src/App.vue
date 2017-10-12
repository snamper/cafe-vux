<template>
  <div id="app">
    <view-box>
      <img src="../static/img/logo.jpg" width="100%" height="auto">
      <router-view :categorys="categorys"></router-view>
      <tabbar>
        <tabbar-item :link="{path:'/home'}">
          <img slot="icon" src="./common/img/icon_nav_button.png">
          <span slot="label">主页</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/menu'}">
          <img slot="icon" src="./common/img/icon_nav_button.png">
          <span slot="label">菜单</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/cart'}" :badge="badge">
          <img slot="icon" src="./common/img/icon_nav_button.png">
          <span slot="label">购物车</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/member'}">
          <img slot="icon" src="./common/img/icon_nav_button.png">
          <span slot="label">会员</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
import { Tabbar, TabbarItem, XHeader, ViewBox, Badge } from 'vux';
export default {
  name: 'app',
  data() {
    return {
      categorys: {
        /* get data from ajax */
      }
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
      response = response.body;
      this.categorys = response.data;
      // console.log(this.categorys);
    });
    this.addCount();
  },
  computed: {
    badge: function() {
      return '12';
    },
    products: function() {
      const products = [];
      for (let category in this.categorys) {
        console.log(category);
        this.categorys[category].forEach((product) => {
          products.push(product);
        });
      }
      return products;
    }
  },
  methods: {
    addCount: function() {
      if (!this.products.count) {
        Vue.set(this.products, 'count', 1);
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app {
  height: 100%;
}
</style>
