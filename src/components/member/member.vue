<template>
    <div class="about-wrapper">
        <logo></logo>
        <div class="member-wrapper" >
            <div class="login" v-if="!memberName">
                <loginregister :member="member" v-on:loginMember="loginMember" v-on:registerMember="registerMember"></loginregister>
            </div>
            <div class="showInfo" v-else>
                <card :header="{title:'你好，' + member.name}" @click.native="showmodify"></card>
                <divider>2017年10月15日22时21分</divider>
                <group>
                    <cell title="您购买的商品总价" :value="total"></cell>
                    <cell-form-preview :list="cartLists"></cell-form-preview>
                </group>
            </div>
        </div>
        <!-- <div class="modify-wrapper">
            <modify></modify>
        </div> -->
        
    </div>
</template>

<script type="text/ecmascript-6">
import { CellFormPreview, Group, Cell, Divider, Card } from 'vux';
import Logo from '@/components/logo/logo';
import LoginRegister from '@/components/common/loginregister';
import Modify from '@/components/common/modify';
import Logger from 'chivy';
const log = new Logger('cafe/member');
export default {
    data() {
        return {
            modify: false
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
        CellFormPreview,
        Cell,
        Group,
        Divider,
        Card,
        'logo': Logo,
        'loginregister': LoginRegister,
        'modify': Modify
    },
    computed: {
        total: function() {
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
        memberName: function() {
            if (this.member === null || this.member.name === '' || typeof (this.member.name) === 'undefined') {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        loginMember: function(data) {
            /* login return */
            log.debug('loginMember recive data is ' + JSON.stringify(data));
            /* deilver to app */
            this.$emit('dloginmember', data);
        },
        registerMember: function(data) {
            /* register return */
            log.debug('registerMember recive data is ' + JSON.stringify(data));
            /* deilver to app */
            this.$emit('dregistermember', data);
        },
        showmodify: function() {
            this.modify = true;
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.member-wrapper
    .showInfo
        .weui-panel
            .weui-panel__hd
                font-size 20px
                font-weight 700
                color black
</style>
