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
                        <cell title="昵称" :value="memberInfo.nick ? memberInfo.nick : empty"></cell>
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
import { isObjEmpty } from '../../common/js/util.js';
import logo from '../../components/logo';
import thumbBar from '../../components/thumbBar';
import split from '../../components/split';
import { Cell, XButton } from 'vux';
import { mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('pages/member/member');
export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            log.debug('from path is ' + window.document.referrer);
            log.debug('from ' + from.path);
            log.debug('to ' + to.path);
            // 当会员信息为空的时候,跳转到登陆页面
            if (isObjEmpty(vm.memberInfo)) {
                log.debug('jump to login page');
                // vm.$router.push({name: 'login'});
            }
            // 当不是从会员页跳转到本页或者不是从信息修改页跳转到本页,就跳转到member页
            /* if (!(from.path === '/member' || from.path === '/modify')) {
                vm.$router.push({name: 'member'});
            } */
        });
    },
    data() {
        return {
            empty: '未填写'
        };
    },
    /* created() {
        // 当会员信息为空的时候,跳转到登陆页面
        if (isObjEmpty(this.memberInfo)) {
            log.debug('jump to login page');
            this.$router.push({name: 'login'});
        }
    }, */
    computed: {
        ...mapState([
            'memberInfo',
            'images'
        ]),
        username() {
            /**
             * 当merberInfo为空的时候返回 表示未登陆
             * 显示优先顺序为昵称nick=>name=>email=>phone
             */
            if (!isObjEmpty(this.memberInfo)) {
                if (!isObjEmpty(this.memberInfo.nick)) {
                    return this.memberInfo.nick;
                }
                if (!isObjEmpty(this.memberInfo.name)) {
                    return this.memberInfo.name;
                }
                if (!isObjEmpty(this.memberInfo.email)) {
                    return this.memberInfo.email;
                }
                if (!isObjEmpty(this.memberInfo.phone)) {
                    return this.memberInfo.phone;
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
