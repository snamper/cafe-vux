<template>
    <div class="member-wrapper">
        <logo></logo>
        <div class="login" v-if="!memberName">
            <loginregister :member="member" v-on:loginMember="loginMember" v-on:registerMember="registerMember"></loginregister>
        </div>
        <div class="showInfo" v-else>
            <divider>2017年10月15日22时21分</divider>
            <group>
                <cell title="您购买的商品总价" :value="total"></cell>
                <cell-form-preview :list="cartLists"></cell-form-preview>
            </group>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { CellFormPreview, Group, Cell, Divider } from 'vux';
import Logo from '@/components/logo/logo';
import LoginRegister from '@/components/common/loginregister';
export default {
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
        'logo': Logo,
        'loginregister': LoginRegister
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
            console.log(data);
            /* deilver to app */
            this.$emit('dloginmember', data);
        },
        registerMember: function(data) {
            /* register return */
            console.log(data);
            /* deilver to app */
            this.$emit('dregistermember', data);
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
