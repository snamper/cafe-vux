<template>
  <div class="card">
    <van-nav-bar
      title="我的会员卡"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <van-cell-group>
      <van-cell is-link :to="{name: 'modify'}">
      <template slot="title">
        <div class="title">
          <avator :url="avatorurl" :size="50" :radius="50"></avator>
          <span class="name">{{username}}</span>
        </div>
      </template>
      <div class="content">修改</div>
      <template slot="right-icon">
        <van-icon name="arrow"/>
      </template>
    </van-cell>
    </van-cell-group>
    <split></split>
    <van-cell-group v-if="member">
      <van-cell title="姓名" :value="show(member.name)" />
      <van-cell title="生日" :value="show(member.birthday)" />
      <van-cell title="性别" :value="show(member.gender)" />
      <van-cell title="电话号码" :value="show(member.phone)" />
      <van-cell title="所在地" :value="show(member.area)" />
      <van-cell title="详细地址" :value="show(member.address)" />
      <van-cell title="积分" :value="show(member.point)" />
      <van-cell title="会员状态" :value="status(member.status)" />
    </van-cell-group>
  </div>
</template>

<script type="text/ecmascript=6">
import { Cell, CellGroup, Row, Col, Icon, NavBar } from 'vant';
import avator from '@/components/avator';
import split from '@/components/split';
import { mapState, mapGetters } from 'vuex';
import { getUsername } from "@/utils/memberInfo";
import Logger from 'chivy';
const log = new Logger('views/card');
export default {
  data() {
    return {
      getUsername,
      avatorurl: '../../../static/img/avator.jpg'
    };
  },
  beforeRouteEnter(to, from, next) {
    log.debug('from path is ' + from.path);
    next(vm => {
      // debugger
      // 如果当前路径不从member或者modify跳转过来的或者UUID不为空，则跳转到member页面
      if (!((from.path === '/modify' || from.path === '/member') && vm.$tools.isNotEmpty(vm.member))) {
        vm.$router.push({name: 'member'});
      }
    });
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
    avator,
    split
  },
  computed: {
    ...mapState({
      'uuid': state => state.member.uuid,
      'member': state => state.member.member
    }),
    username() {
      return getUsername(this.uuid, this.member, '游客');
    }
  },
  methods: {
    back() {
      this.$router.push({name: 'member'});
    },
    show(data) {
      return this.$tools.isEmpty(data) ? '未设置' : data;
    },
    status(data) {
      return data ? '已激活' : '未激活';
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
