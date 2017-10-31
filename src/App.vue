<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
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
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/1px.less";
#app {
  height: 100%;
  width: 100%;
}
</style>
