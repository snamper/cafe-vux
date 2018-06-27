<template>
 <div class="payment">
   <van-nav-bar
      title="请选择支付方式"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell clickable @click="choose(alipay)">
          <template slot="title">
            <div class="title-wrapper">
              <avator :url="alipay.img"></avator>
              <span class="title">{{alipay.value}}</span>
            </div>
          </template>
          <div class="radio-wrapper">
            <van-radio :name="alipay.value" />
          </div>
        </van-cell>
        <van-cell clickable @click="choose(wechat)">
          <template slot="title">
            <div class="title-wrapper">
              <avator :url="wechat.img"></avator>
              <span class="title">{{wechat.value}}</span>
            </div>
          </template>
          <div class="radio-wrapper">
            <van-radio :name="wechat.value" />
          </div>
        </van-cell>
        <van-cell clickable @click="choose(member)">
          <template slot="title">
            <div class="title-wrapper">
              <avator :url="member.img"></avator>
              <span class="title">{{member.value}}</span>
            </div>
          </template>
          <div class="radio-wrapper">
            <van-radio :name="member.value" />
          </div>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div class="confirm">
      <van-button type="primary" @click.native="payit">确认支付￥{{totalPrice}}元</van-button>
    </div>
 </div>
</template>

<script>
import { Button, NavBar, RadioGroup, Radio, CellGroup, Cell } from 'vant';
import { mapState, mapGetters } from 'vuex';
import avator from '../../components/avator';
import { deliverPrice } from '../../common/js/consts';
import Logger from 'chivy';
const log = new Logger('page/cart/payment');
export default {
  data () {
    return {
      deliverPrice,
      radio: '支付宝',
      recordPrice: 0,
      alipay: {
        value: '支付宝',
        img: '../../../static/img/alipay.png'
      },
      wechat: {
        value: '微信支付',
        img: '../../../static/img/wechat.png'
      },
      member: {
        value: '余额支付',
        img: '../../../static/img/tianicon.jpg'
      },
      // 记录从那个地方来
      to: null
    };
  },
  beforeRouteEnter(from, to, next) {
    next(vm => {
      log.debug('beforeRouteEnter to path is ' + to.path);
      // 保存这个路由是从那个地方来的
      vm.to = to.path;
      // 当购物车为空的时候,返回主页面
      // 当页面不是从record来也返回主页面
      log.debug('selectfoods length is ' + vm.$store.getters.selectFoods.length);
      if (vm.$store.getters.selectFoods.length === 0 && to.path !== '/record') {
        vm.$router.push({name: 'menu'});
      }
    });
  },
  beforeRouteLeave (from, to, next) {
    // 离开的时候把recordPrice清零
    this.recordPrice = 0;
    next();
  },
  props: {
    deliverType: {
      type: Boolean,
      default: false
    }
  },
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    avator
  },
  computed: {
    ...mapState([
      'User'
    ]),
    ...mapGetters([
      'selectFoods',
      'totalAttr'
    ]),
    // 购物总价
    totalPrice() {
      // 页面从record来的时候显示订单总价
      // 当有会员登录的情况下,此时计算出来的购物车不为0的时候返回会员价
      // 当没有会员的时候计算出来的购物车不为0的时候返回普通价
      // 当计算出来的购物车价格为0的时候,表示已点击过了支付价格,所以此时价格为之前记录的价格.
      if (typeof (this.record) !== 'undefined') {
        // 从订单页面跳转过来的则显示订单的总价
        return this.record.amount;
      } else if (this.User.member !== null && this.totalAttr.member !== 0) {
        // 显示会员价
        return this.totalAttr.member;
      } else if (this.totalAttr.normal !== 0) {
        // 显示非会员价
        return this.totalAttr.normal;
      } else {
        return this.recordPrice;
      }
    },
    // 会员余额
    balance() {
      if (this.User.member !== null) {
        return this.User.member.balance;
      }
    },
    // 计算具体的商品
    details() {
      const details = [];
      if (this.selectFoods.length !== 0) {
        this.selectFoods.forEach((good) => {
          let detail = '';
          if (this.show.member) {
            detail = {
              productId: good.id,
              amount: good.count * good.memberPrice,
              count: good.count
            };
          } else {
            detail = {
              productId: good.id,
              amount: good.count * good.price,
              count: good.count
            };
          }
          details.push(detail);
        });
      }
      return details;
    },
    order() {
      const BALANCE = 'BALANCE';
      const CASH = 'CASH';
      const result = {
        amount: this.totalPrice,
        userId: null,
        userCode: null,
        userName: null,
        cashOrBalance: null,
        details: null
      };
      if (this.User.member !== null) {
        result.userId = this.User.member.id;
        if (this.User.member.name !== '') {
          result.userName = this.User.member.name;
        } else {
          result.userName = this.User.member.phone;
        }
      } else {
        result.userCode = this.UUID;
      }
      if (this.show.member) {
        result.cashOrBalance = BALANCE;
      } else {
        result.cashOrBalance = CASH;
      }
      result.details = this.details;
      return result;
    }
  },
  methods: {
    choose(data) {
      this.radio = data.value;
    },
    __payurl(type, value, order) {
      switch (type) {
        case this.wechat.value:
          return '/shop/member/pay/wechat/ui/order.do' + '?payMoney=' + value + '&tradeNo=' + order;
        case this.alipay.value:
          return '/shop/member/pay/alipay/ui/order.do' + '?payMoney=' + value + '&tradeNo=' + order;
      }
    },
    back() {
      this.$router.push({name: 'pay'});
    },
    payit() {
      // let _this = this;
      // 提交付款 url.buyGoods
      // 付款成功后提示
      // 清空购物车
      if (this.radio === this.member.value && this.User.member.balance < this.totalPrice) {
        this.$vux.toast.text('余额不足，请重新选择支付方式', 'middle');
        return;
      }
      switch (this.radio) {
        case this.alipay.value:
          // 支付宝支付
          log.info('alipay pay');
          this.$store.dispatch('submitRecord', this.order).then(resp => {
              window.location.href = this.__payurl('alipay', 0.01, resp);
          });
          break;
        case this.wechat.value:
          // 微信支付
          log.info('wechat pay');
          this.$store.dispatch('submitRecord', this.order).then(resp => {
              window.location.href = this.__payurl('wechat', 0.01, resp);
          });
          break;
        case this.member.value:
          log.info('member pay');
          this.$store.dispatch('submitRecord', this.order).then(resp => {
            if (resp !== null) {
              // this.$vux.toast.text('支付成功', 'middle');
              this.$router.push({name: 'records'});
            }
          });
          break;
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.payment
  overflow hidden
  .title-wrapper
    display flex
    align-items center
    .avator
      display inline
    span
      font-size 16px
      padding-left 10px
  .radio-wrapper
    .van-radio
      display flex
      align-items center
      justify-content flex-end
      height 50px
  .confirm
    display flex
    justify-content center
    width 100%
    padding 10px 0px
    .van-button
      width 97%
</style>
