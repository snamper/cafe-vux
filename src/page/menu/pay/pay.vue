<template>
    <div class="pay">
        <x-header title="" :left-options="{showBack: true, preventGoBack: false}"></x-header>
        <logo></logo>
        <div class="pay-wrapper">
            <p class="desc">请选择支付方式</p>
        </div>
        <div class="alipay">
            <div class="img">
                <avator img='../../../../static/img/avator.jpg' size='50' radius='50'></avator>
            </div>
            <div class="text">
                支付宝
            </div>
            <div class="select" @click="showAlipayQRcode">
                 <check-icon :value.sync="alipay" ></check-icon>
            </div>
        </div>
        <div class="wechat">
            <div class="img">
                <avator img='../../../../static/img/avator.jpg' size='50' radius='50'></avator>
            </div>
            <div class="text">
                微信支付
            </div>
            <div class="select" @click="showWechatQRcode">
                <check-icon :value.sync="wechat"></check-icon>
            </div>
        </div>
        <div class="balance" v-show="memberInfo">
            <div class="img">
                <avator img='../../../../static/img/avator.jpg' size='50' radius='50'></avator>
            </div>
            <div class="text">
               余额支付（￥{{memberInfo.balance}}）
            </div>
            <div class="select" @click="disableQRCord">
                <check-icon :value.sync="balance"></check-icon>
            </div>
        </div>
        <div class="confirm">
             <x-button type="primary" @click.native="payit">确认支付￥{{totalPayPrice}}元</x-button>
        </div>
        <div class="qrcode" v-show="qrcode">
            <img src="../../../../static/img/alipay.jpg" v-show="alipay">
            <img src="../../../../static/img/wechat.jpg" v-show="wechat">
        </div>
        <div class="already">
             <x-button mini plain>我已付款</x-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import logo from '../../../components/logo/logo';
import config from '../../../config/config';
import { mapGetters } from 'vuex';
import avator from '../../../components/avator/avator';
import { CheckIcon, XButton, XHeader } from 'vux';
import Logger from 'chivy';
const log = new Logger('page/menu/pay');
const CASH = 'CASH';
const BALANCE = 'BALANCE';
const VISITOR = 'VISITOR';
export default {
    data() {
        return {
            qrcode: true,
            alipay: true,
            wechat: false,
            balance: false
        };
    },
    created() {
        // 当购物车为空的时候，返回到主页面
        if (this.selectFoods.length === 0) {
            this.$router.push({path: '/menu'});
        }
    },
    methods: {
        showAlipayQRcode() {
            this.alipay = true;
            this.wechat = false;
            this.balance = false;
            this.qrcode = true;
        },
        showWechatQRcode() {
            this.alipay = false;
            this.wechat = true;
            this.balance = false;
            this.qrcode = true;
        },
        disableQRCord() {
            this.alipay = false;
            this.wechat = false;
            this.balance = true;
            this.qrcode = false;
        },
        record(type) {
            let record = '';
            if (type === BALANCE) {
                record = {
                    'amount': this.totalPayPrice,
                    'userId': this.memberInfo.id,
                    'userName': this.memberInfo.name,
                    'cashOrBalance': type,
                    'details': this.details(type)
                };
            } else if (type === CASH && this.memberInfo) {
                record = {
                    'amount': this.totalPayPrice,
                    'userId': this.memberInfo.id,
                    'userName': this.memberInfo.name,
                    'cashOrBalance': type,
                    'details': this.details(type)
                };
            } else {
                record = {
                    'amount': this.totalPayPrice,
                    'userId': this.$store.state.uuid,
                    'userName': VISITOR,
                    'cashOrBalance': type,
                    'details': this.details(type)
                };
            }
            return record;
        },
        details(type) {
            let details = [];
            this.selectFoods.forEach((good) => {
                let detail = '';
                if (type === CASH) {
                    detail = {
                    'productId': good.code,
                    'amount': good.count * good.memberPrice,
                    'number': good.count
                    };
                } else if (type === BALANCE) {
                    detail = {
                    'productId': good.code,
                    'amount': good.count * good.price,
                    'number': good.count
                    };
                }
                details.push(detail);
            });
            return details;
        },
        payit() {
            if (this.memberInfo.balance < this.totalPayPrice && this.balance) {
                this.$vux.toast.text('余额不足，请重新选择支付方式', 'middle');
            } else if (this.balance) {
                // 会员提交
                let data = this.record(BALANCE);
                log.debug(JSON.stringify(data));
                this.realpay(data);
            } else if (this.memberInfo) {
                // 会员现金提交
                let data = this.record(CASH);
                log.debug(JSON.stringify(data));
                this.realpay(data);
            } else {
                // 非会员现金提交
                let data = this.record(CASH);
                log.debug(JSON.stringify(data));
                this.realpay(data);
            }
        },
        realpay(data) {
            let url = config.buyGoods;
            log.debug('data is ' + JSON.stringify(data));
            log.debug('' + url);
            log.info('Now get the AJAX to API(' + url + ')');
            this.$http.post(url, data).then((response) => {
                let result = response.data;
                if (result.success) {
                    // 支付成功
                    this.$vux.alert.show({
                        title: '支付成功',
                        content: '您已支付成功，点击我已付款提醒卖家',
                        onShow () {
                            console.log('Plugin: I\'m showing');
                        },
                        onHide () {
                            console.log('Plugin: I\'m hiding');
                        }
                    });
                }
            });
        }
    },
    computed: {
        ...mapGetters([
            'selectFoods',
            'totalPrice',
            'totalMemberPrice',
            'products'
        ]),
        memberInfo() {
            return this.$store.state.memberInfo;
        },
        totalPayPrice() {
            if (!this.memberInfo) {
                return this.totalPrice;
            } else {
                return this.totalMemberPrice;
            }
        }
    },
    components: {
        logo,
        CheckIcon,
        XButton,
        XHeader,
        avator
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.pay
    overflow hidden
    .pay-wrapper
        width 100%       
        .desc
            margin-top 0.3rem
            padding-left 0.3rem
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