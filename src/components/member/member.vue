<template>
    <div class="about-wrapper">
        <logo></logo>
        <div class="member-wrapper" >
            <div class="login" v-if="!memberName">
                <loginregister></loginregister>
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
    </div>
</template>

<script type="text/ecmascript-6">
import { CellFormPreview, Group, Cell, Divider, Card } from 'vux';
import Logo from '@/components/logo/logo';
import LoginRegister from '@/components/common/loginregister';
import Modify from '@/components/common/modify';
import Logger from 'chivy';
import { mapGetters } from 'vuex';
const log = new Logger('cafe/member');
export default {
    data() {
        return {
            modify: false
        };
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
        cartLists: function() {
            let cartLists = [];
            this.cartProducts.forEach((product) => {
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
        showmodify: function() {
            log.info('show modify HMI');
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
