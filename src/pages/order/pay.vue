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
            <div class="balance" v-show="memberInfo!==null">
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
             <x-button :disabled="showbutton.confirm" type="primary" @click.native="payit">确认支付￥{{totalPrice}}元</x-button>
        </div>
        <div class="qrcode" v-show="show.alipay||show.wechat">
            <img :src="value">
        </div>
        <div class="already">
             <x-button mini plain :disabled="showbutton.already"  @click.native="alertStatus">我已付款</x-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapState } from 'vuex';
import { CheckIcon, XButton, XHeader, Qrcode } from 'vux';
import { exchangeType } from '../../common/js/values';
import split from '../../components/split';
import avator from '../../components/avator';
import Logger from 'chivy';
const log = new Logger('page/menu/pay');
const BALANCE = 'BALANCE';
const CASH = 'CASH';
export default {
    beforeRouteEnter(from, to, next) {
        next(vm => {
            log.debug('beforeRouteEnter to path is ' + to.path);
            vm.to = to.path;
            // 当购物车为空的时候,返回主页面
            // 当页面不是从record来也返回主页面
            log.debug('selectfoods length is ' + vm.$store.getters.selectFoods.length);
            if (vm.$store.getters.selectFoods.length === 0 && to.path !== '/record') {
                vm.$router.push({name: 'menu'});
            }
            if (to.path === '/record') {
                // 置灰订单购买,并开启付款确认
                vm.$store.state.showbutton.confirm = false;
                vm.$store.state.showbutton.already = true;
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
        product: {
            type: Object
        }
    },
    computed: {
        value() {
            if (this.show.alipay) {
                return this.payType.alipay.QR;
            } else if (this.show.wechat) {
                return this.payType.wechat.QR;
            }
        },
        ...mapGetters([
            'selectFoods',
            'totalAttr'
        ]),
        ...mapState([
            'memberInfo',
            'UUID',
            'status',
            'recordID',
            'payType',
            'showbutton'
        ]),
        // 购物总价
        totalPrice() {
            // 页面从record来的时候显示订单总价
            // 当有会员登录的情况下,此时计算出来的购物车不为0的时候返回会员价
            // 当没有会员的时候计算出来的购物车不为0的时候返回普通价
            // 当计算出来的购物车价格为0的时候,表示已点击过了支付价格,所以此时价格为之前记录的价格.
            if (typeof (this.product) !== 'undefined') {
                return this.product.amount;
            } else if (this.memberInfo !== null && this.totalAttr.member !== 0) {
                return this.totalAttr.member;
            } else if (this.totalAttr.normal !== 0) {
                return this.totalAttr.normal;
            } else {
                return this.recordPrice;
            }
        },
        balance() {
            if (this.memberInfo !== null) {
                return this.memberInfo.balance;
            }
        },
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
        record() {
            let result = {
                amount: this.totalPrice,
                userId: null,
                userCode: null,
                userName: null,
                cashOrBalance: null,
                details: null
            };
            if (this.memberInfo !== null) {
                result.userId = this.memberInfo.id;
                // TODO 是否后期可以考虑干掉这个参数
                if (this.memberInfo.name !== '') {
                    result.userName = this.memberInfo.name;
                } else {
                     result.userName = this.memberInfo.phone;
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
        back() {
            if (this.to === '/record') {
                this.$router.push({name: 'record', param: {record: this.product}});
                log.debug('back record page');
            } else {
                log.debug('back to order page');
                this.$router.back();
            }
        },
        payit() {
            let _this = this;
            // 提交付款 url.buyGoods
            // 付款成功后提示
            // 清空购物车
            if (this.show.member && this.memberInfo.balance < this.totalPrice) {
                this.$vux.toast.text('余额不足，请重新选择支付方式', 'middle');
            } else {
                log.debug('是否后期可以考虑干掉这个参数 this.record.userName');
                this.$store.dispatch('submitRecord', this.record).then(() => {
                    // 判断是否成功
                    if (this.status.record) {
                        this.$vux.alert.show({
                            title: '支付成功',
                            content: '点击【我已付款】提醒卖家',
                            onHide() {
                                log.debug(_this.totalPrice);
                                // 保存价格
                                _this.recordPrice = _this.totalPrice;
                                // 清空购物车
                                _this.$store.commit('clearCars');
                                _this.$store.commit('updateShowButtonConfirmStatus', true);
                                _this.$store.commit('updateShowButtonAlreadyStatus', false);
                                // 清空保存的购物id号
                                _this.$store.commit('updateRecordID', null);
                            }
                        });
                    } else {
                        this.$vux.toast.text('服务器故障,请稍后再试', 'middle');
                    }
                });
            }
        },
        alertStatus() {
            let _this = this;
            let data = {
                entityId: this.recordID,
                status: exchangeType.CONFIRM2PAID.key
            };
            this.$store.dispatch('alertStatus', data).then(() => {
                if (this.status.alert) {
                    this.$vux.alert.show({
                        title: '付款提醒',
                        content: '已提醒店家，店家会尽快确认付款信息',
                        onHide() {
                            log.debug('跳转页面,高亮显示处理');
                            _this.$router.push({name: 'records'});
                        }
                    });
                }
            });
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
