<template>
  <div class="order" v-if="!isLoading">
    <van-nav-bar
      title="订单列表"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <van-tabs v-model="active" :swipe-threshold="5" >
      <van-tab
        v-for="(title, index) in tabtitle"
        :key="index"
        :title="title">
        <div v-if="recordList.length > 0">
          <div class="test" v-for="(record, index) in recordList" :key="index">
            <order :order="record"></order>
          </div>
        </div>
        <div class="no_order" v-else>
            <span>暂无订单</span>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/ecmascript=6">
import { Tab, Tabs, NavBar, Icon } from 'vant';
import { mapState } from 'vuex';
import order from  './one';
import Logger from 'chivy';
const log = new Logger('views/records');
export default {
  name: 'Records',
  data() {
    return {
      tabtitle: ['全部', '待付款', '待发货', '已发货', '已完成'],
      active: 0,
      payStatus: this.$tools.payStatus
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path === '/member' || from.path === '/record' || from.path === '/pay') {
        vm.GetRecords();
        vm.Selected();
      } else {
        vm.$router.push({name: 'member'});
      }
    });
  },
  props: {
    value: {
      type: String,
      default: '全部'
    }
  },
  computed: {
    ...mapState({
      'uuid': state => state.member.uuid,
      'member': state => state.member.member,
      'records': state => state.product.records,
      'isLoading': state => state.product.isLoading
    }),
    notpay() {
      return this.records.filter(record => record.status === 'NOTPAY');
    },
    success() {
      return this.records.filter(record => record.status === 'SUCCESS');
    },
    dispatched() {
      return this.records.filter(record => record.status === 'DISPATCHED');
    },
    finished() {
      return this.records.filter(record => record.status === 'FINISHED');
    },
    recordList() {
      switch(this.active) {
        case 0:
          return this.records;
        case 1:
          return this.notpay;
        case 2:
          return this.success;
        case 3:
          return this.dispatched;
        case 4:
          return this.finished;
      }
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    order
  },
  methods: {
    back() {
      this.$router.push({name: 'member'});
    },
    GetRecords() {
      return new Promise(resolve=> {
        const param = this.$tools.isEmpty(this.uuid) ? { userId: this.member.id, needDetail: true } : { userCode: this.uuid, needDetail: true };
        this.$store.dispatch('getRecords', param);
        resolve();
      });
    },
    Selected() {
      log.debug('this.records length is ' + this.records.length);
      switch(this.value){
        case this.tabtitle[0]:
          this.active = 0;
          break;
        case this.tabtitle[1]:
          this.active = 1;
          break;
        case this.tabtitle[2]:
          this.active = 2;
          break;
        case this.tabtitle[3]:
          this.active = 3;
          break;
        case this.tabtitle[4]:
          this.active = 4;
          break;
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.van-nav-bar
  position fixed
  left 0px
  top 0px
  width 100%
.van-tabs
  margin-top 46px
  .no_order
    display flex
    justify-content center
    padding-top 50%
    font-size 50px
    color rgb(140, 153, 159)
</style>
