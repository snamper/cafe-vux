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
import order from  './oneorder';
import { status } from '../../common/js/consts';
import { isObjEmpty } from '../../common/js/util';
import Logger from 'chivy';
const log = new Logger('vuex/member/orderlist');
export default {
  data() {
    return {
      tabtitle: ['全部', '待付款', '待发货', '已发货', '已完成'],
      active: 0,
      status
    };
  },
  beforeRouteEnter(to, from, next) {
    log.debug('to path is ' + to.path);
    log.debug('from path is ' + from.path);
    next(vm => {
      if (from.path === '/member' || from.path === '/orderdetail') {
        vm.$store.commit('updateLoadingStatus', {isLoading: true});
        vm.__getRecord().then(() => {
          vm.$store.commit('updateLoadingStatus', {isLoading: false});
          vm.__selected();
        }).catch(error=> {
          vm.$store.commit('updateLoadingStatus', {isLoading: false});
          vm.__selected();
        });
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
    ...mapState([
      'User',
      'records',
      'isLoading'
    ]),
    notpay() {
      const result = [];
      // debugger
      for (let i = 0; i < this.records.length; i++) {
        const record = this.records[i];
        if (record.status === this.status.NOTPAY.key) {
          result.push(record);
        }
      }
      return result;
    },
    wait4delivery() {
      const result = [];
      for (let i = 0; i < this.records.length; i++) {
        const record = this.records[i];
        if (record.status === this.status.WAIT4DELIVERY.key) {
          result.push(record);
        }
      }
      return result;
    },
    alreadydelivery() {
      const result = [];
      for (let i = 0; i < this.records.length; i++) {
        const record = this.records[i];
        if (record.status === this.status.ALREADYDELIVERY.key) {
          result.push(record);
        }
      }
      return result;
    },
    finish() {
      const result = [];
      for (let i = 0; i < this.records.length; i++) {
        const record = this.records[i];
        if (record.status === this.status.FINISH.key) {
          result.push(record);
        }
      }
      return result;
    },
    recordList() {
      switch(this.active) {
        case 0:
          return this.records;
        case 1:
          return this.notpay;
        case 2:
          return this.wait4delivery;
        case 3:
          return this.alreadydelivery;
        case 4:
          return this.finish;
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
    __getRecord() {
      return new Promise((resolve)=> {
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
        this.$store.dispatch('getRecords', param).then(() => {
          resolve();
        });
      });
    },
    __selected() {
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
