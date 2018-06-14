<template>
  <div class="order"> 
    <van-tabs v-model="active" :swipe-threshold="0" >
      <van-tab title="全部">内容</van-tab>
      <van-tab title="待付款">待付款</van-tab>
      <van-tab title="待发货">待发货</van-tab>
      <van-tab title="已发货">已发货</van-tab>
      <van-tab title="已完成">已完成</van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/ecmascript=6">
import { Tab, Tabs } from 'vant';
export default {
  data() {
    return {
      active: ''
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.order
  .van-tabs__wrap--scrollable,.van-tab
    flex 0 0 20%
</style>