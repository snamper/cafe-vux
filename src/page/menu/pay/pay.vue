<template>
    <div>
        <logo></logo>
        <div class="pay-wrapper">
            <p class="desc">选择支付方式</p>
        </div>
        <div class="alipay">
            <div class="img">
                <img src="../../../../static/img/avator.jpg" height='50px' width='50px'>
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
                <img src="../../../../static/img/avator.jpg" height='50px' width='50px'>
            </div>
            <div class="text">
                微信支付
            </div>
            <div class="select" @click="showWechatQRcode">
                <check-icon :value.sync="wechat"></check-icon>
            </div>
        </div>
        <div class="confirm">
             <x-button type="primary">确认支付￥144元</x-button>
        </div>
        <div class="qrcode">
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
import { CheckIcon, XButton } from 'vux';
export default {
    data() {
        return {
            alipay: true,
            wechat: false
        };
    },
    methods: {
        showAlipayQRcode() {
            this.alipay = true;
            this.wechat = false;
        },
        showWechatQRcode() {
            this.alipay = false;
            this.wechat = true;
        }
    },
    components: {
        logo,
        CheckIcon,
        XButton
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.pay-wrapper
    width 100%       
    .desc
        margin-top 0.3rem
        padding-left 0.3rem
        line-height 2rem
        height 2rem 
        font-size 1.4rem
.alipay,.wechat
    margin 0.3rem
    width 97%
    height 70px
    display flex
    flex-wrap nowrap 
    .img,.text,.select
        height 70px
    .img
        flex-grow 1
        display flex
        justify-content center
        align-items center
        img
            border-radius:50%;
    .text
        flex-grow 3
        display flex
        align-items center
        font-size 1.2rem
    .select
        flex-grow 1
        display flex
        justify-content center
        align-items center
.confirm
    width 100%
    display flex
    justify-content center
    img
        margin 0 150px
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