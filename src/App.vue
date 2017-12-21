<template>
  <div id='app'>
    <router-view></router-view>
  </div>
</template>

<script type='text/ecmascript-6'>
import Logger from 'chivy';
import session from './config/session';
import util from './common/js/util';
const log = new Logger('cafe/App');
const uuidv4 = require('uuid/v4');
export default {
  created() {
    // 读取sessionStorage中是否存在UUID，如果存在则写入state中，如果不存在，则生成并写入sessionStorage中
    let uuid = util.getkey(session.uuid);
    if (uuid === null) {
      log.debug('cannot get uuid from sessionStorage');
      uuid = uuidv4();
      util.setkey(session.uuid, uuid);
    }
    log.debug('uuid is ' + JSON.stringify(uuid));
    this.$store.commit('setUUID', uuid);
  }
};
</script>

<style lang='less'>
@import '~vux/src/styles/1px.less';
#app {
  height: 100%;
  width: 100%;
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
