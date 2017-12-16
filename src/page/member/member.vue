<template>
    <div>
        <logo></logo>
        <memberbar :image="image" :memberInfo="memberInfo" v-show="memberInfo"></memberbar>
        <div class="modify-wrapper" v-show="memberInfo">
            <div class="password">
                <cell title="修改密码" is-link @click.native="modify"></cell>
            </div>
            <div class="birthday">
                <cell title="修改生日" is-link></cell>
            </div>
            <div class="sex">
                <cell title="修改性别" is-link></cell>
            </div>
            <x-button @click.native="loginout" type="primary">注销</x-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import util from '../../common/js/util';
import session from '../../config/session';
import logo from '../../components/logo/logo';
import loginbar from '../../components/loginbar/loginbar';
import memberbar from '../../components/loginbar/memberbar';
import { Cell, XButton } from 'vux';
import { mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('cafe/member');
export default {
    data() {
        return {
            image: '../../../../static/img/avator.jpg'
        };
    },
    mounted() {
        log.info(typeof (this.memberInfo));
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
            this.$router.push({path: '/login'});
        },
        modify() {
            this.$router.push({path: '/modifyPasswd'});
        }
    },
    components: {
        logo,
        loginbar,
        memberbar,
        Cell,
        XButton
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>        
</style>
