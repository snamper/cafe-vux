<template>
  <div class="membeer">
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
      <van-cell title="购物车" value="4" :to="{name: 'cart'}"></van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="我的会员卡" is-link :to="{name: 'card'}"></van-cell>
      <van-cell title="我的积分" is-link ></van-cell>
      <van-cell title="我的信息" is-link ></van-cell>
    </van-cell-group>
  </div>
</template>

<script type="text/ecmascript=6">
import { Cell, CellGroup, Row, Col, Icon } from 'vant';
import { mapState } from 'vuex';
import avator from '../../components/avator';
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
    avator
  },
  computed: {
    ...mapState([
      'User'
    ]),
    username() {
      if (this.User.uuid !== null) {
        return '游客';
      } else {
        if (this.User.member.nick !== ''){
          return this.User.member.nick;
        } else if (this.User.member.name !== '') {
          return this.User.member.name;
        } else if (this.User.member.phone !== '') {
          return this.User.member.phone;
        } else if (this.User.member.email !== '') {
          return this.User.member.email;
        }
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.membeer
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
        border 1px solid red
        .van-icon
          font-size 30px
        .name
          font-size 16px
</style>
