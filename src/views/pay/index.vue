<template>
 <div class="payment">
   <van-nav-bar
      title="请选择支付方式"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell v-if="visable" clickable @click="Choose(alipay)">
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
        <van-cell clickable @click="Choose(wechat)">
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
        <van-cell v-if="member" clickable @click="Choose(memberObj)">
          <template slot="title">
            <div class="title-wrapper">
              <avator :url="memberObj.img"></avator>
              <span class="title">{{memberObj.value}}(￥{{member.balance}})</span>
            </div>
          </template>
          <div class="radio-wrapper">
            <van-radio :name="memberObj.value" />
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
import { mapState } from 'vuex';
import avator from '@/components/avator';
import Logger from 'chivy';
const log = new Logger('views/pay');
export default {
  data () {
    return {
      isObjEmpty: this.$tools.isEmpty,
      isObjNotEmpty: this.$tools.isNotEmpty,
      // 是否显示支付宝付款  暂时屏蔽支付宝支付
      visable: false,
      radio: '微信支付',
      recordPrice: 0,
      alipay: {
        value: '支付宝',
        img: '../../../static/img/alipay.png'
      },
      wechat: {
        value: '微信支付',
        img: '../../../static/img/wechat.png'
      },
      memberObj: {
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
      log.debug('carts is ' + JSON.stringify(vm.carts));
      if (to.path === '/' || vm.$tools.isEmpty(vm.carts)) {
        vm.$router.push({name: 'menu'});
      }
      /* if (vm.$tools.isWeixin()) {
        log.debug('weixin browser found, not show alipay');
        vm.visable = false;
      } */
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
    avator
  },
  computed: {
    ...mapState({
      'uuid': state => state.member.uuid,
      'member': state => state.member.member,
      'carts': state => state.product.carts,
      'deliverPrice': state => state.product.deliverPrice,
      'address': state => state.member.address
    }),
    // 购物总价
    totalPrice() {
      if (this.url) {
        // 非会员价
        if (this.$tools.isNotEmpty(this.uuid)) {
          return this.deliverType ? this.price.normal + this.deliverPrice : this.price.normal;
        } else {
          return this.deliverType ? this.price.member + this.deliverPrice : this.price.member;
        }
      } else {
        return this.price.normal;
      }
    },
    price() {
      let price = 0;
      let member = 0;
      this.carts.forEach(food => {
        price += food.price * food.count;
        member += (food.memberPrice ? food.memberPrice : 0) * food.count;
      });
      return {normal: price, member: member};
    },
    // 会员余额
    balance() {
      if (this.$tools.isNotEmpty(this.member)) {
        return this.memberObj.balance;
      }
    },
    // 计算具体的商品
    details() {
      const details = [];
      this.carts.forEach(good => {
        let detail;
        if (this.radio === this.memberObj.value) {
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
        userName: this.address.name,
        deliveryLocation: this.address.province + this.address.city + this.address.county + (this.$tools.isEmpty(this.address.address) ? this.address.address_detail : this.address.address),
        deliveryMobile: this.address.mobile,
        paymentTypeStr: this.deliverType ? '快递' : '自取',
        amount: this.totalPrice,
        userId: this.$tools.isNotEmpty(this.member) ? this.member.id : '',
        userCode: this.$tools.isNotEmpty(this.uuid) ? this.uuid : '',
        cashOrBalance: this.$tools.isNotEmpty(this.memberObj) && this.totalPrice <= this.memberObj.balance && this.radio === this.memberObj.value ? 'BALANCE' : 'CASH',
        details: this.details
      };
      return result;
    },
    url() {
      if (this.to === '/order') {
        return true;
      } else if (this.to === '/records' || this.to === '/record') {
        return false;
      } else {
        return null;
      }
    }
  },
  methods: {
    // 选择radio
    Choose(data) {
      this.radio = data.value;
    },
    // 获取微信和支付宝支付的地址
    getPayURL(type, value, orderId) {
      log.debug('type is ' + type);
      switch (type) {
        case this.wechat.value:
          return '/shop/member/pay/wechat/ui/order.do' + '?payMoney=' + value + '&tradeNo=' + orderId;
        case this.alipay.value:
          return '/shop/member/pay/alipay/ui/order.do' + '?payMoney=' + value + '&tradeNo=' + orderId;
      }
    },
    // 返回按钮
    back() {
      if (this.url) {
        log.info('jump to order');
        this.$router.push({name: 'order', params: {address: this.address}});
      } else {
        log.info('jump to records');
        this.$router.push({name: 'records'});
      }
    },
    // 实际支付
    payit() {
      /**
       * 入口可以从三个地方过来，order/records/record 当从order过来的时候表示没有任何商品的购买，如果是records/record过来表示有购买商品
       * 支付方式为三种， 支付宝和微信以及会员余额支付
       * 当入口为未建立订单的时候
       * 1. 当支付宝支付的时候，a 判断是否是微信内，如果是则跳转到浏览器
       * 2. 当微信支付的时候， a 如果付款则走到发货流程， b 如果没有付款可以选择返回界面
       * 3. 余额付款的时候，订单直接变更为已付款。
       * 当入口为已建立订单的时候
       * 1. 当支付宝支付的时候，a 判断是否是微信内，如果是则跳转到浏览器
       * 2. 当微信支付的时候，如果成功则订单状态变更，如果失败则变更为订单关闭  （考虑订单关闭的时候是否需要提供重新购买按钮）
       * 3. 不存在余额支付的情况。
      */
      if (this.radio === this.memberObj.value && this.member.balance < this.totalPrice) {
        this.$toast('余额不足，请重新选择支付方式');
        return;
      }
      switch (this.radio) {
        case this.alipay.value:
          // 支付宝支付
          log.info('alipay pay');
          if (this.url) {
            this.$store.dispatch('submitRecord', this.order).then(resp => {
              window.location.href = this.getPayURL(this.alipay.value, this.totalPrice, resp);
            });
          } else {
            window.location.href = this.getPayURL(this.alipay.value, this.totalPrice, this.orderid);
          }
          break;
        case this.wechat.value:
          // 微信支付
          log.info('wechat pay');
          if (!this.$tools.isWeixin()) {
            this.$toast.fail('请在微信中使用微信支付');
            return;
          }
          if (this.url) {
            this.$store.dispatch('submitRecord', this.order).then(resp => {
              window.location.href = this.getPayURL(this.wechat.value, this.totalPrice, resp.entityCode);
            });
          } else {
            window.location.href = this.getPayURL(this.wechat.value, this.totalPrice, this.orderid);
          }
          break;
        case this.memberObj.value:
          // 会员支付
          log.info('member pay');
          log.debug('submitRecord payload is ' + JSON.stringify(this.order));
          this.$store.dispatch('submitRecord', this.order).then(resp => {
            const data = {
              entityId: resp.entityId,
              status: 'CLOSED'
            };
            return this.$store.dispatch('alterStatus', data).then(() => {
              this.$router.push({name: 'records'});
            });
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
