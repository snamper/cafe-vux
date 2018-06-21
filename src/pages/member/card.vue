<template>
  <div class="card">
    <van-nav-bar
      title="我的会员卡"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <van-cell-group>
      <van-cell is-link :to="{name: 'info'}">
      <template slot="title">
        <div class="title">
          <avator :url="avatorurl" :size="50" :radius="50"></avator>
          <span class="name">游客</span>
        </div>
      </template>
      <div class="content">设置</div>
      <template slot="right-icon">
        <van-icon name="arrow"/>
      </template>
    </van-cell>
    </van-cell-group>
    <div class="card-wrapper">
      <span>暂无会员卡</span>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Cell, CellGroup, Row, Col, Icon, NavBar } from 'vant';
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
    [NavBar.name]: NavBar,
    avator
  },
  methods: {
    back() {
      this.$router.push({name: 'member'});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.card
  .title
    height 50px
    display flex
    align-items center
    .name
      margin-left 10px
      font-size 16px
  .content
    height 50px
    display flex
    align-items center
    justify-content flex-end
    margin-right 10px
  .van-icon
    height 50px
    display flex
    align-items center
  .card-wrapper
    display flex
    justify-content center
    padding 40% 0px
</style>
