<template>
    <div class="pay">
        <x-header :left-options="{showBack: true, preventGoBack: true}" title="支付页面" @on-click-back="back"></x-header>
        <div class="pay-wrapper">
            <p class="desc">请选择支付方式</p>
        </div>
        <split></split>
        <div class="button">
            <div class="alipay">
                <div class="img">
                    <avator :img='payType.alipay.icon' :size="size" :radius='radius'></avator>
                </div>
                <div class="text">{{payType.alipay.name}}</div>
                <div class="select" @click="alipayClick">
                    <check-icon :value.sync="show.alipay" ></check-icon>
                </div>
            </div>
            <div class="wechat">
                <div class="img">
                    <avator :img='payType.wechat.icon' :size="size" :radius='radius'></avator>
                </div>
                <div class="text">{{payType.wechat.name}}</div>
                <div class="select" @click="wechatClick">
                    <check-icon :value.sync="show.wechat"></check-icon>
                </div>
            </div>
            <div class="balance" v-show="currentUser.memberInfo!==null">
                <div class="img">
                    <avator :img='payType.member.icon' :size="size" :radius='radius'></avator>
                </div>
                <div class="text">{{payType.member.name}}(￥{{balance}})</div>
                <div class="select" @click="memberClick">
                    <check-icon :value.sync="show.member"></check-icon>
                </div>
            </div>
        </div>
        <split></split>
        <div class="confirm">
            <x-button  type="primary" @click.native="payit">确认支付￥{{totalPrice}}元</x-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapState } from 'vuex';
import { CheckIcon, XButton, XHeader, Qrcode } from 'vux';
import split from '../../components/split';
import avator from '../../components/avator';
import { payurl } from '../../common/js/util';
import Logger from 'chivy';
const log = new Logger('page/menu/pay');
const BALANCE = 'BALANCE';
const CASH = 'CASH';
export default {
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
    data() {
        return {
            qrcodeSize: 100,
            size: 50,
            radius: 50,
            recordPrice: 0,
            show: {
                alipay: true,
                wechat: false,
                member: false
            },
            // 记录从那个地方来
            to: null
        };
    },
    props: {
        record: {
            type: Object
        }
    },
    computed: {
        /* value() {
            if (this.show.alipay) {
                return this.payType.alipay.QR;
            } else if (this.show.wechat) {
                return this.payType.wechat.QR;
            }
        }, */
        ...mapGetters([
            'selectFoods',
            'totalAttr'
        ]),
        ...mapState([
            'currentUser',
            'recordID',
            'payType',
            'recordInfo'
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
            } else if (this.currentUser.memberInfo !== null && this.totalAttr.member !== 0) {
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
            if (this.currentUser.memberInfo !== null) {
                return this.currentUser.memberInfo.balance;
            }
        },
        // 计算具体的商品
        details() {
            let details = [];
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
            let result = {
                amount: this.totalPrice,
                userId: null,
                userCode: null,
                userName: null,
                cashOrBalance: null,
                details: null
            };
            if (this.currentUser.memberInfo !== null) {
                result.userId = this.currentUser.memberInfo.id;
                if (this.currentUser.memberInfo.name !== '') {
                    result.userName = this.currentUser.memberInfo.name;
                } else {
                     result.userName = this.currentUser.memberInfo.phone;
                }
            } else {
                result.userCode = this.UUID;
            }
            if (this.show.memberInfo) {
                result.cashOrBalance = BALANCE;
            } else {
                result.cashOrBalance = CASH;
            }
            result.details = this.details;
            return result;
        }
    },
    methods: {
        // 点击选择支付宝支付
        alipayClick() {
            this.show = {
                alipay: true,
                wechat: false,
                member: false
            };
        },
        // 点击选择微信支付
        wechatClick() {
            this.show = {
                alipay: false,
                wechat: true,
                member: false
            };
        },
        // 点击选择余额支付
        memberClick() {
            this.show = {
                alipay: false,
                wechat: false,
                member: true
            };
        },
        // 返回上一个页面
        back() {
            if (this.to === '/record') {
                log.debug('back record page');
                log.debug('record is' + JSON.stringify(this.record));
                this.$router.push({name: 'record', params: {record: this.record}});
            } else {
                log.debug('back to order page');
                this.$router.back();
            }
        },
        payit() {
            // let _this = this;
            // 提交付款 url.buyGoods
            // 付款成功后提示
            // 清空购物车
            if (this.show.member && this.currentUser.memberInfo.balance < this.totalPrice) {
                this.$vux.toast.text('余额不足，请重新选择支付方式', 'middle');
            } else if (this.show.alipay) {
                // 支付宝支付
                log.info('alipay pay');
            } else if (this.show.wechat) {
                // 微信支付
                log.info('wechat pay');
                this.$store.dispatch('submitRecord', this.order).then(resp => {
                    window.location.href = payurl('wechat', this.totalPrice, resp);
                });
            }
        }
    },
    components: {
        split,
        avator,
        CheckIcon,
        XButton,
        XHeader,
        Qrcode
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.pay
    overflow hidden
    .pay-wrapper
        width 100%       
        .desc
            margin 0.3rem 0
            padding 0 0.3rem
            line-height 1.5rem
            height 1.5rem 
            font-size 1.2rem
    .alipay,.wechat,.balance
        margin 0.3rem
        width 97%
        height 50px
        display flex
        flex-wrap nowrap 
        .img,.text,.select
            height 50px
        .img
            flex-grow 1
            display flex
            justify-content center
            align-items center
            img
                border-radius:50%;
        .text
            flex-grow 1
            flex-basis 60%
            display flex
            align-items center
            font-size 1rem
        .select
            flex-grow 1
            display flex
            justify-content center
            align-items center
    .confirm
        width 100%
        display flex
        justify-content center
        margin 10px 0
        .weui-btn
            margin 0 5%
    .qrcode
        width 100%
        margin 10px 0
        display flex
        justify-content center
        align-items center
        img
            width 50%
            height auto
    .already
        width 100%
        display flex
        justify-content center
</style>
