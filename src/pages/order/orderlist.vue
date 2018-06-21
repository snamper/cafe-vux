<template>
  <div class="order">
    <van-nav-bar
      title="订单列表"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <van-tabs v-model="active" :swipe-threshold="0" >
      <van-tab
        v-for="(title, index) in tabtitle"
        :key="index"
        :title="title">
        <div class="test" v-for="(o, i) in 10" :key="i">
          <order></order>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/ecmascript=6">
import { Tab, Tabs, NavBar } from 'vant';
import order from  './oneorder';
export default {
  data() {
    return {
      tabtitle: ['全部', '待付款', '待发货', '已发货', '已完成'],
      active: ''
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    order
  },
  methods: {
    back() {
      this.$router.push({name: 'member'});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
