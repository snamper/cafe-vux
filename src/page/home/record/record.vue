<template>
    <div class="record-wrapper">
        <logo></logo>
        <div class='member-wrapper' >
            <div class='login' v-if='!memberName'>
                <login></login>
            </div>
            <div class='showInfo' v-if='memberName'>
                <card :header='cartTitle' @click.native='showmodify'></card>
                <div class='buylist-wrapper' v-if='buys' >
                    <div v-for='(buy,index) in buys' :key='index'>
                        <list :buy='buy'></list>
                    </div>
                </div>
                <div v-else>
                    <divider>您还没有购买任何产品</divider>
                </div>
                <div class='paid-wrapper'>
                    <x-button @click.native='loginout'>注销</x-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Card, Divider, XButton } from 'vux';
import Logo from '@/components/logo/logo';
import Login from '../login/login';
import List from './list';
import Logger from 'chivy';
import { mapGetters } from 'vuex';
const log = new Logger('cafe/record');
export default {
    data() {
    return {
      modify: false
    };
  },
  components: {
    Card,
    Divider,
    XButton,
    Logo,
    Login,
    List
  },
  mounted: function() {
    if (this.member !== null) {
      log.debug('member name is ' + this.member.name);
      log.debug('get member id = ' + this.member.id);
      if (this.member.name !== '') {
        let user = {
          userId: this.member.id,
          needDetail: true
        };
        log.debug('get product list\'s user is ' + JSON.stringify(user));
        this.$store.commit('getBuyList', user);
      }
    }
  },
  computed: {
    ...mapGetters([
      'cartProducts',
      'totalPrice',
      'totalMemberPrice',
      'cartList',
      'cartMemberList'
    ]),
    buys: function() {
      return this.$store.state.buylist;
    },
    time: function() {},
    member: function() {
      return this.$store.state.member;
    },
    memberName: function() {
      if (
        this.member === null ||
        this.member.name === '' ||
        typeof this.member.name === 'undefined'
      ) {
        return false;
      } else {
        return true;
      }
    },
    cartTitle: function() {
        let title = {title: '你好，' + this.member.name + '，购物清单如下'};
        return title;
    }
  },
  methods: {
    showmodify: function() {
      log.info('show modify HMI');
      this.modify = true;
    },
    loginout: function() {
      this.$store.commit('loginout');
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.record-wrapper
    .member-wrapper
        .showInfo
            .paid-wrapper
                display flex
                width 100%
                .weui-btn
                    margin 0 30%
                    background-color #58B7FF
                    color #fff
            .weui-panel
                .weui-panel__hd
                    font-size 20px
                    font-weight 700
                    color black
</style>
