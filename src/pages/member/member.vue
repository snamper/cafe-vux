<template>
    <div>
        <div class="wrapper" v-if="memberInfo!==null">
            <logo></logo>
            <thumbBar :username="username" :background="images.background" :thumb="images.avator"></thumbBar>
            <div class="info-wrapper">
                <div class="bar  vux-1px-tb">
                    <cell title="会员信息" is-link @click.native="showMore"></cell>
                </div>
                <div class="info">
                    <div class="item-bar vux-1px-b">
                        <cell title="昵称" :value="memberInfo.name ? memberInfo.name : ''"></cell>
                    </div>
                    <div class="item-bar vux-1px-b">
                        <cell title="会员积分" :value="`${memberInfo.point ? memberInfo.point : 0}分`" ></cell>
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
import { isObjEmpty, getSessionStorage } from '../../common/js/util.js';
import { session } from '../../common/js/values';
import logo from '../../components/logo';
import thumbBar from '../../components/thumbBar';
import split from '../../components/split';
import { Cell, XButton } from 'vux';
import { mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('pages/member/member');
export default {
    created() {
        // 读取sessionStorage中是否有数据,如果有则更新,如果没有则跳转
        let memberInfo = getSessionStorage(session.memberInfo);
        if (memberInfo !== null) {
            // 保存到memberInfo中
            this.$store.commit('updatememberInfo', memberInfo);
            log.debug(JSON.stringify(memberInfo));
        }
        // 当会员信息为空的时候,跳转到登陆页面
        if (isObjEmpty(this.memberInfo)) {
            log.debug('jump to login page');
            this.$router.push({name: 'login'});
        }
    },
    computed: {
        ...mapState([
            'memberInfo',
            'images'
        ]),
        username() {
            if (!isObjEmpty(this.memberInfo)) {
                if (isObjEmpty(this.memberInfo.name)) {
                    return this.memberInfo.phone;
                } else {
                    return this.memberInfo.name;
                }
            } else {
                return '';
            }
        }
    },
    methods: {
        // 注销
        loginout() {
            this.$store.dispatch('logout').then(() => {
                log.debug('already logout');
                // 跳转到登陆页面
                this.$router.push({name: 'login'});
            });
        },
        modifyPwd() {
            log.debug('show modify page');
            this.$router.push({name: 'pwd'});
        },
        showMore() {
            log.debug('show more info');
            this.$router.push({name: 'memberinfo'});
        }
    },
    components: {
        logo,
        thumbBar,
        split,
        Cell,
        XButton
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
