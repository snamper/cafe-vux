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
        <div class="test" v-for="(record, i) in records.length" :key="i">
          <order v-if="false"></order>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/ecmascript=6">
import { Tab, Tabs, NavBar } from 'vant';
import { mapState } from 'vuex';
import order from  './oneorder';
import Logger from 'chivy';
import { isObjEmpty } from '../../common/js/util';
const log = new Logger('vuex/member/orderlist');
export default {
  data() {
    return {
      tabtitle: ['全部', '待付款', '待发货', '已发货', '已完成'],
      active: ''
    };
  },
  beforeRouteEnter(to, from, next) {
    log.debug('to path is ' + to.path);
    log.debug('from path is ' + from.path);
    next(vm => {
      if (from.path !== '/member') {
        vm.$router.push({name: 'member'});
      } else {
        vm.__getRecord();
      }
    });
  },
  computed: {
    ...mapState([
      'User',
      'records'
    ])
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
    },
    __getRecord() {
      let param = {};
      if (isObjEmpty(this.User.uuid)) {
        param = {
          userId: this.User.member.id,
          needDetail: true
        };
      } else {
        param = {
          userCode: this.User.uuid,
          needDetail: true
        }
      }
      this.$store.dispatch('getRecords', param).then(resp => {
        log.debug('resp is ' + JSON.stringify(resp));
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
