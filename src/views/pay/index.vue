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
        <van-cell v-if="User.member" clickable @click="choose(member)">
          <template slot="title">
            <div class="title-wrapper">
              <avator :url="member.img"></avator>
              <span class="title">{{member.value}}(￥{{User.member.balance}})</span>
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
import { Button, NavBar, RadioGroup, Radio, CellGroup, Cell, Toast } from 'vant';
import { mapState, mapGetters } from 'vuex';
import avator from '../../components/avator';
import { deliverPrice } from '../../common/js/consts';
import Logger from 'chivy';
import { isObjEmpty } from '../../common/js/util';
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
      log.debug('records is ' + JSON.stringify(vm.$store.state.carts));
      if (to.path === '/' || isObjEmpty(vm.$store.state.carts)) {
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
    },
    address: {
      type: Object
    },
    orderid: {
      type: Number,
      default: null
    }
  },
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    avator
  },
  computed: {
    ...mapState([
      'User',
      'carts'
    ]),
    ...mapGetters([
      'totalCarts'
    ]),
    // 购物总价
    totalPrice() {
      if (this.url) {
        // 非会员价
        if (!isObjEmpty(this.User.uuid)) {
          return this.deliverType ? this.totalCarts.normal + this.deliverPrice : this.totalCarts.normal;
        } else {
          return this.deliverType ? this.totalCarts.member + this.deliverPrice : this.totalCarts.member;
        }
      } else {
        return this.totalCarts.normal;
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
      this.carts.forEach(good => {
        let detail;
        if (this.radio === this.member.value) {
          detail = {
            productId: good.id,
            amount: good.count * good.memberPrice,
            price: good.memberPrice,
            count: good.count
          };
        } else {
          detail = {
            productId: good.id,
            amount: good.count * good.price,
            price: good.price,
            count: good.count
          };
        }
        details.push(detail);
      });
      return details;
    },
    order() {
      const result = {
        amount: this.totalPrice,
        userId: !isObjEmpty(this.User.member) ? this.User.member.id : '',
        userCode: !isObjEmpty(this.User.uuid) ? this.User.uuid : '',
        cashOrBalance: !isObjEmpty(this.User.member) && this.totalPrice <= this.User.member.balance && this.radio === this.member.value ? 'BALANCE' : 'CASH',
        details: this.details
      };
      return result;
    },
    url() {
      if (this.to === '/pay') {
        return true;
      } else if (this.to === '/order' || this.to === '/orderdetail') {
        return false;
      } else {
        return null;
      }
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
    __toast(context) {
      Toast({
        message: context,
        forbidClick: true,
        duration: 1000
      });
    },
    back() {
      if (this.url) {
        this.$router.push({name: 'pay', params: {address: this.address}});
      } else {
        this.$router.push({name: 'order'});
      }
    },
    payit() {
      // let _this = this;
      // 提交付款 url.buyGoods
      // 付款成功后提示
      // 清空购物车
      if (this.radio === this.member.value && this.User.member.balance < this.totalPrice) {
        this.__toast('余额不足，请重新选择支付方式');
        return;
      }
      switch (this.radio) {
        case this.alipay.value:
          // 支付宝支付
          log.info('alipay pay');
          if (this.url) {
            this.$store.dispatch('submitRecord', this.order).then(resp => {
              log.warn('alipay new');
              this.__toast('此功能暂未开通');
              this.$router.push({name: 'member'});
              // window.location.href = this.__payurl('alipay', this.totalPrice, resp);
            });
          } else {
            log.warn('alipay old');
            this.__toast('此功能暂未开通');
            this.$router.push({name: 'member'});
            // window.location.href = this.__payurl('alipay', this.totalPrice, orderid);
          }
          break;
        case this.wechat.value:
          // 微信支付
          log.info('wechat pay');
          if (this.url) {
            this.$store.dispatch('submitRecord', this.order).then(resp => {
              log.warn('wechat new');
              this.__toast('此功能暂未开通');
              this.$router.push({name: 'member'});
              // window.location.href = this.__payurl('wechat', this.totalPrice, resp);
            });
          } else {
            log.warn('wechat old');
            this.__toast('此功能暂未开通');
            this.$router.push({name: 'member'});
            // window.location.href = this.__payurl('wechat', this.totalPrice, orderid);
          }
          break;
        case this.member.value:
          log.info('member pay');
          // TODO 需要判断是第一次提交订单还是已有订单付款
          this.$store.dispatch('submitRecord', this.order).then(resp => {
            if (resp !== null) {
              this.__toast('支付成功');
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
