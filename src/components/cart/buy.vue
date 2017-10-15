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
                <loginregister v-on:loginMember="loginMember" v-on:registerMember="registerMember"></loginregister>
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
                <x-button type="primary" @click.native="payit">去支付</x-button>
            </div>
        </div>
        <div class="pay-wrapper" v-else="">
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
import { XHeader, Flexbox, FlexboxItem, Group, Cell, Divider, XButton, XInput, XSwitch, Card } from 'vux';
import Logo from '@/components/logo/logo';
import LoginRegister from '@/components/common/loginregister';
export default {
    data() {
        return {
            balancePay: false,
            isPay: true
        };
    },
    props: {
        categorys: {
            type: Object
        },
        member: {
            type: Object
        }
    },
    components: {
        XHeader,
        Flexbox,
        FlexboxItem,
        Group,
        Cell,
        Divider,
        XButton,
        XInput,
        XSwitch,
        Card,
        'logo': Logo,
        'loginregister': LoginRegister
    },
    computed: {
        total: function() {
            let total = 0;
            this.products.forEach((product) => {
                total = total + product.count * product.price;
            });
            return '￥' + total + '元';
        },
        totalMember: function() {
            let total = 0;
            this.products.forEach((product) => {
                total = total + product.count * product.memberPrice;
            });
            return '￥' + total + '元';
        },
        products: function() {
            let products = [];
            for (let category in this.categorys) {
                this.categorys[category].forEach((product) => {
                    if (product.count > 0) {
                        products.push(product);
                    }
                });
            }
            return products;
        },
        cartLists: function() {
            let cartLists = [];
            this.products.forEach((product) => {
                let cartlist = {
                    label: product.name,
                    value: product.count + '个 X ' + product.price + '元 = ' + product.count * product.price + '元'
                };
                cartLists.push(cartlist);
            });
            return cartLists;
        },
        memberbalance: function() {
            let balance = '￥' + this.member.balance + '元';
            return balance;
        },
        memberName: function() {
            console.log(this.member);
            console.log(this.member === null);
            console.log(this.member.name === '');
            console.log(typeof (this.member.name) === 'undefined');
            if (this.member === null || this.member.name === '' || typeof (this.member.name) === 'undefined') {
                return false;
            } else {
                return true;
            }
        },
        list: function() {
            let products = [];
            for (let category in this.categorys) {
                this.categorys[category].forEach((product) => {
                    if (product.count > 0) {
                        let cartProduct = {
                            'code': product.code,
                            'count': product.count
                        };
                        products.push(cartProduct);
                    }
                });
            }
            return products;
        }
    },
    methods: {
        loginMember: function(data) {
            /* login return */
            console.log(data);
            /* deilver to app */
            this.$emit('dloginmember', data);
        },
        registerMember: function(data) {
            /* register return */
            console.log(data);
            /* deilver to app */
            this.$emit('dregistermember', data);
        },
        payit: function() {
            console.log('是否选择了余额扣款' + this.balancePay);
            if (this.balancePay) {
                if (this.memberbalance >= this.totalMember) {
                    this.isPay = false;
                    this.realpay();
                } else {
                    this.$vux.toast.text('余额不足，请先充值', 'middle');
                }
            } else {
                this.isPay = false;
                this.realpay();
            }
        },
        realpay: function() {
            let count;
            if (this.member.name === '' || typeof (this.member.name) === 'undefined') {
                count = this.totalPrice;
            } else {
                count = this.memberPrice;
            }
            let buylist = {
                'id': this.member.id,
                'list': this.list,
                'total': count,
                'datetime': ''
            };
            this.$http.get('/shop/product/show/ui/saveRecordList.do', buylist).then((response) => {
                this.$vux.toast.text('购买成功', 'middle');
            });
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.loginRegister-wrapper
    .pay-wrapper
        .img-wrapper
            margin 10px 5px
            padding 5px
            img
                width 100%
                height auto

</style>