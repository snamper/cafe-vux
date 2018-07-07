<template>
 <div class="payment">
   <van-nav-bar
      :title="$t('pay.selectPayType')"
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
        <van-cell v-if="memberObj" clickable @click="choose(memberObj)">
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
      <van-button type="primary" @click.native="payit">{{$t('pay.totalPrice')}}{{totalPrice}}{{$t('pay.unit')}}</van-button>
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
      radio: this.$t('pay.alipay'),
      recordPrice: 0,
      alipay: {
        value: this.$t('pay.alipay'),
        img: '../../../static/img/alipay.png'
      },
      wechat: {
        value: this.$t('pay.wechat'),
        img: '../../../static/img/wechat.png'
      },
      memberObj: {
        value: this.$t('pay.balance'),
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
      if (to.path === '/' || vm.$tools.isEmpty(vm.$store.state.carts)) {
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
    avator
  },
  computed: {
    ...mapState([
      'uuid',
      'member',
      'carts',
      'deliverPrice'
    ]),
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
    choose(data) {
      this.radio = data.value;
    },
    getPayURL(type, value, order) {
      switch (type) {
        case this.wechat.value:
          return '/shop/member/pay/wechat/ui/order.do' + '?payMoney=' + value + '&tradeNo=' + order;
        case this.alipay.value:
          return '/shop/member/pay/alipay/ui/order.do' + '?payMoney=' + value + '&tradeNo=' + order;
      }
    },
    back() {
      if (this.url) {
        log.info('jump to order');
        this.$router.push({name: 'order', params: {address: this.address}});
      } else {
        log.info('jump to records');
        this.$router.push({name: 'records'});
      }
    },
    payit() {
      if (this.radio === this.memberObj.value && this.memberObj.balance < this.totalPrice) {
        this.$toast(this.$t('pay.tips1'));
        return;
      }
      switch (this.radio) {
        case this.alipay.value:
          // 支付宝支付
          log.info('alipay pay');
          if (this.url) {
            this.$store.dispatch('submitRecord', this.order).then(resp => {
              // window.location.href = this.getPayURL('alipay', this.totalPrice, resp);
            });
          } else {
            // window.location.href = this.getPayURL('alipay', this.totalPrice, orderid);
          }
          break;
        case this.wechat.value:
          // 微信支付
          log.info('wechat pay');
          if (this.url) {
            this.$store.dispatch('submitRecord', this.order).then(resp => {
              // window.location.href = this.getPayURL('wechat', this.totalPrice, resp);
            });
          } else {
            // window.location.href = this.getPayURL('wechat', this.totalPrice, orderid);
          }
          break;
        case this.member.value:
          log.info('member pay');
          // TODO 需要判断是第一次提交订单还是已有订单付款
          this.$store.dispatch('submitRecord', this.order).then(resp => {
            if (this.$tools.isNotEmpty(resp)) {
              this.$toast(this.$t('pay.tips2'));
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
