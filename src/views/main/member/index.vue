<template>
  <div class="member-wrapper">
    <div class="avator">
      <div class="info">
        <avator :url="url" :radius="50" :width="100" :height="100"></avator>
        <div class="name">{{username}}</div>
      </div>
    </div>
    <van-cell-group>
      <van-cell :title="$t('member.myorder')" is-link :value="$t('member.showorders')" :to="{name: 'records'}"></van-cell>
    </van-cell-group>
    <van-row gutter="20">
      <van-col span="6" @click.native="Jump2OrderPage(status.NOTPAY)">
        <div class="content" >
          <van-icon name="pending-payment"></van-icon>
          <div class="name">{{$t('member.wait4pay')}}</div>
        </div>
      </van-col>
      <van-col span="6" @click.native="Jump2OrderPage(status.WAIT4DELIVERY)">
        <div class="content">
          <van-icon name="tosend"></van-icon>
          <div class="name">{{$t('member.wait4delivery')}}</div>
        </div>
      </van-col>
      <van-col span="6" @click.native="Jump2OrderPage(status.ALREADYDELIVERY)">
        <div class="content">
          <van-icon name="logistics"></van-icon>
          <div class="name">{{$t('member.alreadydelivery')}}</div>
        </div>
      </van-col>
      <van-col span="6" @click.native="Jump2OrderPage(status.FINISH)">
        <div class="content">
          <van-icon name="completed"></van-icon>
          <div class="name">{{$t('member.finish')}}</div>
        </div>
      </van-col>
    </van-row>
    <van-cell-group>
      <van-cell :title="$t('member.carts')" :to="{name: 'cart'}">
        <round :number="number"></round>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-if="member">
      <van-cell :title="$t('member.memberCard')" is-link :to="{name: 'card'}"></van-cell>
      <!-- <van-cell title="我的积分" is-link ></van-cell>
      <van-cell title="我的信息" is-link ></van-cell> -->
    </van-cell-group>
    <van-cell-group class="loginout" v-if="member">
      <van-button type="danger" @click.native="onClickLogout">{{$t('member.logout')}}</van-button>
    </van-cell-group>
    <van-cell-group class="loginout" v-else>
      <van-button type="primary" @click.native="onClickLogin">{{$t('member.wantLogin')}}</van-button>
    </van-cell-group>

  </div>
</template>

<script type="text/ecmascript=6">
import { Cell, CellGroup, Row, Col, Icon, Button  } from 'vant';
import { mapState, mapGetters } from 'vuex';
import round from './round';
import avator from '@/components/avator';
import { status } from  '@/utils/consts.js';
import Logger from 'chivy';
const log = new Logger('views/main/member');
export default {
  data() {
    return {
      url: '../../../../static/img/avator.jpg',
      status
    };
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Button.name]: Button,
    avator,
    round
  },
  beforeRouteEnter(from, to, next) {
    next(vm => {
      vm.$store.dispatch('initUser');
    });
  },
  computed: {
    ...mapState([
      'uuid',
      'member'
    ]),
    ...mapGetters([
      'selectFoods',
      'username'
    ]),
    number() {
      if (this.selectFoods.length === 0) {
        return 0;
      } else {
        let result = 0;
        this.selectFoods.forEach(good => {
          result += good.count;
        });
        return result;
      }
    },
    username() {
      return this.$tools.getUsername(this.uuid, this.member, this.$t('member.vistor'));
    },
  },
  methods: {
    onClickLogout() {
      log.info('onClickLogout');
      this.$store.dispatch('logout');
    },
    onClickLogin() {
      log.info('onClickLogin');
      this.$router.push({name: 'login'});
    },
    Jump2OrderPage(type) {
      switch(type) {
        case status.NOTPAY:
          this.$router.push({name: 'records', params: {value: status.NOTPAY.value}});
          break;
        case status.WAIT4DELIVERY:
          this.$router.push({name: 'records', params: {value: status.WAIT4DELIVERY.value}});
          break;
        case status.ALREADYDELIVERY:
          this.$router.push({name: 'records', params: {value: status.ALREADYDELIVERY.value}});
          break;
        case status.FINISH:
          this.$router.push({name: 'records', params: {value: status.FINISH.value}});
          break;
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../styles/mixin.styl';
.member-wrapper
  bgcolor()
  bottom()
  .avator
    width 100%
    height 200px
    display flex
    justify-content center
    align-items center
    .info
      .name
        text-align center
        font-size 20px
        margin-top 20px
  .van-row
    height 100px
    .van-col
      height 100%
      display flex
      justify-content center
      align-items center
      .content
        .van-icon
          display flex
          justify-content center
          font-size 30px
          margin-bottom 5px
        .name
          font-size 16px
  .loginout
    display flex
    justify-content center
    .van-button
      width 97%
</style>
