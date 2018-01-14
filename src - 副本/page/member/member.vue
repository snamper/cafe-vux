<template>
    <div>
        <div class="wrapper">
            <logo></logo>
            <memberbar :image="image" :memberInfo="memberInfo" v-show="memberInfo"></memberbar>
            <div class="info-wrapper">
                <div class="bar  vux-1px-tb">
                    <cell title="会员信息" is-link @click.native="showMore"></cell>
                </div>
                <div class="info">
                    <div class="item-bar vux-1px-b">
                        <cell title="昵称" :value="memberInfo.name"></cell>
                    </div>
                    <div class="item-bar vux-1px-b">
                        <cell title="会员积分" :value="`${memberInfo.name}分`" ></cell>
                    </div>
                    <div class="item-bar vux-1px-b">
                        <cell title="余额" :value="`${memberInfo.balance}元`" ></cell>
                    </div>
                </div>
                <split></split>
                <div class="bar vux-1px-tb">
                    <cell title="安全设置"></cell>
                </div>
                <div class="info">
                    <div class="item-bar vux-1px-b">
                        <cell title="修改密码" is-link @click.native="modifyPwd"></cell>
                    </div>
                </div> 
            </div>
            <div class="logout">
                <x-button @click.native="loginout" type="primary">注销</x-button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import util from '../../common/js/util';
import session from '../../config/session';
import logo from '../../components/logo/logo';
import loginbar from '../../components/loginbar/loginbar';
import memberbar from '../../components/loginbar/memberbar';
import split from '../../components/split/split';
import detail from './detail';
import { Cell, XButton } from 'vux';
import { mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('cafe/member/member');
export default {
    data() {
        return {
            image: '../../../../static/img/avator.jpg'
        };
    },
    mounted() {
        // log.info(typeof (this.memberInfo));
        if (!this.memberInfo) {
            this.$router.push({path: '/login'});
        }
    },
    computed: {
        ...mapState([
            'memberInfo'
        ])
    },
    methods: {
        loginout() {
            this.$store.commit('setMember', '');
            util.setkey(session.member, '');
            this.$router.push({name: 'login'});
        },
        modifyPwd() {
            log.debug('show modify page');
            this.$router.push({name: 'pwd'});
        },
        showMore() {
            log.debug('show more info');
            this.$router.push({name: 'info'});
        }
    },
    components: {
        logo,
        loginbar,
        memberbar,
        Cell,
        XButton,
        split,
        detail
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.info-wrapper
    margin 5px 0px
    .bar
        background: rgb(248,248,248)
.logout
    margin 5px 10px
    padding 5px 0px
</style>
