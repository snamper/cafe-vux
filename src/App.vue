<template>
  <div id='app'>
    <router-view></router-view>
  </div>
</template>

<script type='text/ecmascript-6'>
import Logger from 'chivy';
const log = new Logger('App');
export default {
  created() {
    log.info('start mutations initUUID');
    this.$store.commit('initUUID');
  }
};
</script>

<style lang='less'>
@import '~vux/src/styles/1px.less';
#app {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
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
