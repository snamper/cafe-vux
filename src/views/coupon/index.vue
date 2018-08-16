<template>
  <div>
    <van-nav-bar
      title="订单列表"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <van-tabs v-model="active" :swipe-threshold="3" >
      <van-tab
        v-for="(title, index) in tabtitle"
        :key="index"
        :title="title">
        <div v-if="true">
          <div class="test" v-for="(record, index) in recordList" :key="index">
            <!-- 优惠券列表 -->
            <van-coupon-list
              :coupons="coupons"
              :chosen-coupon="chosenCoupon"
              :disabled-coupons="disabledCoupons"
              @change="onChange"
              @exchange="onExchange"
            />
          </div>
        </div>
        <div class="no_order" v-else>
            <span>暂无优惠券</span>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/ecmascript=6">
import { Tab, Tabs, NavBar, Icon, CouponCell, CouponList } from 'vant';
import { mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('views/coupon');
export default {
  name: 'Coupon',
  data() {
    return {
      tabtitle: ['未使用', '已使用', '已失效'],
      active: 0,
      status
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      /* if (from.path === '/member' || from.path === '/record' || from.path === '/pay') {
        vm.$store.commit('UPDATE_LOADING_STATUS', {isLoading: true});
        vm.GetRecords().then(() => {
          vm.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false});
          vm.Selected();
        }).catch(error=> {
          vm.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false});
          vm.Selected();
        });
      } else {
        vm.$router.push({name: 'member'});
      } */
    });
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [CouponCell.name]: CouponCell,
    [CouponList.name]: CouponList
  },
  methods: {
    back() {
      this.$router.push({name: 'member'});
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

