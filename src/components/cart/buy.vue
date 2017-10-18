<template>
    <div class="loginRegister-wrapper">
        <x-header title="登陆"></x-header>
        <logo></logo>
        <div class="buy-wrapper" v-if="isPay">
            <flexbox :gutter='8'>
                <flexbox-item>
                    <group>
                        <cell title="总价" :value="total"></cell>
                    </group>
                </flexbox-item>
                <flexbox-item>
                    <group>
                        <cell title="会员总价" :value="totalMember"></cell>
                    </group>
                </flexbox-item>
            </flexbox>
            <div class="login" v-if="!memberName">
                <loginregister></loginregister>
            </div>
            <div class="member" v-else>
                <divider>会员信息</divider>
                <card :header="{title:'你好，' + member.name}"></card>
                <div class="balance-wrapper">
                    <group>
                        <flexbox>
                            <flexbox-item>
                                <cell title="账户余额" :value="memberbalance"></cell>
                            </flexbox-item>
                            <flexbox-item>
                                <x-switch title="余额扣款" v-model="balancePay"></x-switch>
                            </flexbox-item>
                        </flexbox>
                    </group>
                </div>
            </div>
            <divider>付款</divider>
            <div class="paid-wrapper">
                <x-button @click.native="payit">去支付</x-button>
            </div>
        </div>
        <div class="pay-wrapper" v-else>
            <div class="readme">请选择扫描支付</div>
            <flexbox>
                <flexbox-item>
                    <div class="img-wrapper">
                        <divider>微信支付</divider>
                        <img src="../../../static/img/test2.jpg">
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="img-wrapper">
                        <divider>支付宝支付</divider>
                        <img src="../../../static/img/test2.jpg">
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Flexbox, FlexboxItem, Group, Cell, Divider, XButton, XSwitch, Card } from 'vux';
import Logo from '@/components/logo/logo';
import LoginRegister from '@/components/common/loginregister';
import Logger from 'chivy';
import { mapGetters } from 'vuex';
const log = new Logger('cafe/buy');
const ApiSaveRecordList = '/shop/product/show/ui/saveRecordList.do';
export default {
    data() {
        return {
            balancePay: false,
            isPay: true
        };
    },
    components: {
        XHeader,
        Flexbox,
        FlexboxItem,
        Group,
        Cell,
        Divider,
        XButton,
        XSwitch,
        Card,
        'logo': Logo,
        'loginregister': LoginRegister
    },
    computed: {
        ...mapGetters([
            'cartProducts',
            'totalPrice',
            'totalMemberPrice',
            'cartList',
            'cartMemberList'
        ]),
        member: function() {
            return this.$store.state.member;
        },
        total: function() {
            return '￥' + this.totalPrice + '元';
        },
        totalMember: function() {
            return '￥' + this.totalMemberPrice + '元';
        },
        memberbalance: function() {
            return '￥' + this.member.balance + '元';
        },
        memberName: function() {
            // if member is empty or member.name is empty show
            if (this.member === null || this.member.name === '' || typeof (this.member.name) === 'undefined') {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        payit: function() {
            if (this.balancePay) {
                log.info('choose balance pay');
                if (this.member.balance >= this.totalMemberPrice) {
                    this.isPay = false;
                    this.realpay('Balance');
                } else {
                    this.$vux.toast.text('余额不足，请先充值', 'middle');
                }
            } else {
                this.isPay = false;
                this.realpay('Cash');
            }
        },
        realpay: function(cashOrBalance) {
            log.info('Pay type is ' + cashOrBalance);
            let buylist;
            if (cashOrBalance === 'Balance') {
                buylist = {
                    'userId': this.member.ID,
                    'userName': this.member.name,
                    'cashOrBalance': cashOrBalance,
                    'details': this.cartMemberList,
                    'amount': this.totalMemberPrice
                };
            } else if (cashOrBalance === 'Cash') {
                if (this.member === null || this.member.name === '' || typeof (this.member.name) === 'undefined') {
                    buylist = {
                        'userId': '',
                        'userName': '',
                        'cashOrBalance': cashOrBalance,
                        'details': this.cartList,
                        'amount': this.totalPrice
                    };
                } else {
                    buylist = {
                        'userId': this.member.id,
                        'userName': this.member.name,
                        'cashOrBalance': cashOrBalance,
                        'details': this.cartList,
                        'amount': this.totalPrice
                    };
                }
            }
            log.info('Now get the AJAX to API(' + ApiSaveRecordList + ')');
            log.debug('Buy List is ' + JSON.stringify(buylist));
            this.$http.get(ApiSaveRecordList, buylist).then((response) => {
                this.$vux.toast.text('购买成功,请付款后关注订单状态', 'middle');
            });
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.loginRegister-wrapper
    .pay-wrapper
        .readme
            font-size 24px
            font-weight 700
            padding 10px 5px
            text-align center
            color gray
        .img-wrapper
            margin 10px 5px
            padding 5px
            img
                width 100%
                height auto

</style>