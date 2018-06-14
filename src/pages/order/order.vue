<template>
  <div class="order">
    <van-tabs v-model="active" :swipe-threshold="0" >
      <van-tab
        v-for="(title, index) in tabtitle"
        :key="index"
        :title="title">
        <detail></detail>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/ecmascript=6">
import { Tab, Tabs } from 'vant';
import detail from  './detail';
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
    detail
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.order
  .van-tabs__wrap--scrollable,.van-tab
    flex 0 0 20%
</style>
