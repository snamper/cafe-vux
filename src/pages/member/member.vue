<template>
  <div class="member-wrapper">
    <div class="avator">
      <div class="info">
        <avator :url="avatorurl" :radius="50" :width="100" :height="100"></avator>
        <div class="name">{{username}}</div>
      </div>
    </div>
    <van-cell-group>
      <van-cell title="我的订单" is-link value="查看全部订单" :to="{name: 'order'}"></van-cell>
    </van-cell-group>
    <van-row gutter="20">
      <van-col span="6">
        <div class="content">
          <van-icon name="pending-payment"></van-icon>
          <div class="name">待付款</div>
        </div>
      </van-col>
      <van-col span="6">
        <div class="content">
          <van-icon name="tosend"></van-icon>
          <div class="name">待发货</div>
        </div>
      </van-col>
      <van-col span="6">
        <div class="content">
          <van-icon name="logistics"></van-icon>
          <div class="name">已发货</div>
        </div>
      </van-col>
      <van-col span="6">
        <div class="content">
          <van-icon name="completed"></van-icon>
          <div class="name">已完成</div>
        </div>
      </van-col>
    </van-row>
    <van-cell-group>
      <van-cell title="购物车" :to="{name: 'cart'}">
        <round></round>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-if="User.member">
      <van-cell title="我的会员卡" is-link :to="{name: 'card'}"></van-cell>
      <!-- <van-cell title="我的积分" is-link ></van-cell>
      <van-cell title="我的信息" is-link ></van-cell> -->
    </van-cell-group>
    <van-cell-group class="loginout" v-if="User.member">
      <van-button type="danger" @click.native="logout">注销</van-button>
    </van-cell-group>
    <van-cell-group class="loginout" v-else>
      <van-button type="primary" @click.native="login">我要登录</van-button>
    </van-cell-group>

  </div>
</template>

<script type="text/ecmascript=6">
import { Cell, CellGroup, Row, Col, Icon, Button  } from 'vant';
import { mapState, mapGetters } from 'vuex';
import round from '../../components/round';
import avator from '../../components/avator';
import Logger from 'chivy';
const log = new Logger('vuex/member/member');
export default {
  data() {
    return {
      avatorurl: '../../../static/img/avator.jpg'
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
  computed: {
    ...mapState([
      'User'
    ]),
    ...mapGetters([
      'selectFoods',
      'username'
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch('loginout');
    },
    login() {
      this.$router.push({name: 'login'});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.member-wrapper
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
