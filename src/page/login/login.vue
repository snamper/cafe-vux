<template>
    <div>
        <logo></logo>
        <div class="login-wrapper" @showLoginPage="showLogin">
            <div class="login-input" v-show="show">
                <group >
                    <x-input label-width="3em" text-align="left" placeholder="用户名"  type="text" :required="true"></x-input>
                    <x-input label-width="3em" text-align="left" placeholder="密码"  type="text" :required="true"></x-input>
                    <x-button type="primary">登陆</x-button>
                    <div class="txt-wrapper">
                        <div class="forget">忘记密码</div>
                        <div class="vistor">游客访问</div>
                        <div class="register" @click="showRegister">注册</div>
                    </div>
                </group>
            </div>
            <div class="register-input" v-show="!show">
                <group>
                    <x-input label-width="3em" text-align="left" placeholder="手机号码"  type="text" :required="true"></x-input>
                    <x-input label-width="3em" text-align="left" placeholder="输入密码"  type="password" :required="true"></x-input>
                    <x-input label-width="3em" text-align="left" placeholder="确认密码"  type="password" :required="true"></x-input>
                    <x-button type="primary">注册</x-button>
                    <div class="txt-wrapper" @click="showLogin">
                        已有账户，登陆
                    </div>
                </group>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import logo from '../../components/logo/logo';
import { XInput, Group, XButton } from 'vux';
import Logger from 'chivy';
const log = new Logger('page/login');
export default {
    data() {
        return {
            show: true
        };
    },
    methods: {
        showRegister() {
            this.show = false;
        },
        showLogin() {
            log.debug('show login page');
            this.show = true;
        }
    },
    components: {
        logo,
        XInput,
        Group,
        XButton
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.login-wrapper
    position absolute
    width 100%
    top 120px
    left 0px
    bottom 50px
    display flex
    justify-content center
    align-items center
    .login-input
        width 90%
        .txt-wrapper
            margin-top 5px
            width 100%
            flex-wrap nowrap
            display flex
            align-items center
            justify-content center
            .forget,.vistor,.register
                // border 1px solid black
                height 30px
                display inline-block
                flex-grow 1
                display flex
                align-items center
            .forget
                font-size 14px
                display flex
                justify-content flex-start
                text-align left
                padding-left 5px
            .vistor
                font-size 20px
                line-height 24px
                display flex
                justify-content center
            .register
                font-size 14px
                display flex
                justify-content flex-end
                padding-right 5px
    .register-input
        width 90%
        .txt-wrapper
            line-height 16px
            font-size 16px
            padding 10px
            text-align center
</style>
