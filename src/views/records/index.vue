<template>
  <div class="order" v-if="!isLoading">
    <van-nav-bar
      :title="$t('records.orderlist')"
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
            <span>{{$t('records.none')}}</span>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/ecmascript=6">
import { Tab, Tabs, NavBar, Icon } from 'vant';
import { mapState } from 'vuex';
import order from  './one';
import { status } from '@/utils/consts';
import { isObjEmpty } from '@/utils/utils';
import Logger from 'chivy';
const log = new Logger('records');
export default {
  data() {
    return {
      tabtitle: [this.$t('records.all'), this.$t('records.wait4pay'), this.$t('records.wait4delivery'), this.$t('records.alreadydelivery'), this.$t('records.finish')],
      active: 0,
      status
    };
  },
  beforeRouteEnter(to, from, next) {
    log.debug('to path is ' + to.path);
    log.debug('from path is ' + from.path);
    next(vm => {
      if (from.path === '/member' || from.path === '/orderdetail' || from.path === '/payment') {
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
      'uuid',
      'member',
      'records',
      'isLoading'
    ]),
    notpay() {
      return this.records.filter(record => record.status === this.status.NOTPAY.key);
    },
    wait4delivery() {
      return this.records.filter(record => record.status === this.status.WAIT4DELIVERY.key);
    },
    alreadydelivery() {
      return this.records.filter(record => record.status === this.status.ALREADYDELIVERY.key);
    },
    finish() {
      return this.records.filter(record => record.status === this.status.FINISH.key);
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
        const param = isObjEmpty(this.uuid) ? { userId: this.member.id, needDetail: true } : { userCode: this.uuid, needDetail: true };
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
