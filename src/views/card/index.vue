<template>
  <div class="card">
    <van-nav-bar
      :title="$t('card.myCard')"
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
      <div class="content">{{$t('card.edit')}}</div>
      <template slot="right-icon">
        <van-icon name="arrow"/>
      </template>
    </van-cell>
    </van-cell-group>
    <split></split>
    <van-cell-group v-if="member">
      <van-cell :title="$t('card.name')" :value="show(member.name)" />
      <van-cell :title="$t('card.birthday')" :value="show(member.birthday)" />
      <van-cell :title="$t('card.sex')" :value="show(member.gender)" />
      <van-cell :title="$t('card.tel')" :value="show(member.phone)" />
      <van-cell :title="$t('card.area')" :value="show(member.area)" />
      <van-cell :title="$t('card.address')" :value="show(member.address)" />
      <van-cell :title="$t('card.point')" :value="show(member.point)" />
      <van-cell :title="$t('card.status')" :value="status(member.status)" />
    </van-cell-group>
  </div>
</template>

<script type="text/ecmascript=6">
import { Cell, CellGroup, Row, Col, Icon, NavBar } from 'vant';
import avator from '@/components/avator';
import split from '@/components/split';
import { isObjEmpty, isObjNotEmpty, getUsername } from '@/utils/utils.js';
import { mapState, mapGetters } from 'vuex';
import Logger from 'chivy';
const log = new Logger('vuex/member/card');
export default {
  data() {
    return {
      getUsername,
      avatorurl: '../../../static/img/avator.jpg'
    };
  },
  beforeRouteEnter(to, from, next) {
    log.debug('to path is ' + to.path);
    log.debug('from path is ' + from.path);
    next(vm => {
      if (from.path !== '/member' || isObjEmpty(vm.member)) {
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
    ...mapState([
      'uuid',
      'member'
    ]),
    username() {
      return getUsername(this.uuid, this.member, this.$t('member.vistor'));
    }
  },
  methods: {
    back() {
      this.$router.push({name: 'member'});
    },
    show(data) {
      return isObjEmpty(data) ? this.$t('card.notSet') : data;
    },
    status(data) {
      return data ? this.$t('card.active') : this.$t('card.disactive');
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
