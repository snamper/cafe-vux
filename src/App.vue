<template>
  <div id='app'>
    <router-view></router-view>
  </div>
</template>

<script type='text/ecmascript-6'>
import { getSessionStorage } from './common/js/util';
import { session } from './common/js/values';
import Logger from 'chivy';
const log = new Logger('App');
export default {
  created() {
    this.$store.dispatch('initUUID');
    // 读取sessionStorage中是否有数据,如果有则更新,如果没有则跳转
    let memberInfo = getSessionStorage(session.memberInfo);
    if (memberInfo !== null) {
        // 保存到memberInfo中
        this.$store.commit('updatememberInfo', memberInfo);
        log.debug(JSON.stringify(memberInfo));
    }
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
