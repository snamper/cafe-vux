<template>
    <div class="about-wrapper">
        <logo></logo>
        <div class="member-wrapper" >
            <div class="login" v-if="!memberName">
                <loginregister></loginregister>
            </div>
            <div class="showInfo" v-else>
                <card :header="{title:'你好，' + member.name}" @click.native="showmodify"></card>
                <div class="buylist-wrapper" v-if="buys" v-for="buy in buys">
                    <buylist :buy="buy"></buylist>
                </div>
                <div v-else>
                    <divider>您还没有购买任何产品</divider>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Card } from 'vux';
import Logo from '@/components/logo/logo';
import LoginRegister from '@/components/common/loginregister';
import Modify from '@/components/common/modify';
import Buylist from '@/components/member/buylist';
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
        Card,
        'logo': Logo,
        'loginregister': LoginRegister,
        'modify': Modify,
        'buylist': Buylist
    },
    mounted: function() {
        if (this.member !== null) {
            let user = {
                'userId': this.member.ID,
                'needDetail': true
            };
        log.debug('get product list\'s user is ' + JSON.stringify(user));
        this.$store.commit('getBuyList', user);
        }
    },
    computed: {
        ...mapGetters([
            'cartProducts',
            'totalPrice',
            'totalMemberPrice',
            'cartList',
            'cartMemberList'
        ]),
        buys: function() {
            return this.$store.state.buylist;
        },
        time: function() {
        },
        member: function() {
            return this.$store.state.member;
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
