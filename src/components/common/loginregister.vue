<template>
    <div class="loginRegister-wrapper">
        <div class="showdetail-wrapper">
            <tab v-model="index" active-color='#58B7FF' :line-width="1">
                <tab-item class="vux-center" :selected="tabItemList===item" v-for="(item,index) in tabItemList" @click="tabItemList=item" :key="index">{{item}}</tab-item>
            </tab>
            <div class="login-wrapper" v-if="index === 0">
                <group>
                    <x-input label-width="3em" text-align="left" title="用户名" name="username"  type="text" v-model="loginInfo.username" :required="true"></x-input>
                    <x-input label-width="3em" text-align="left" title="密码" name="password"  type="password" v-model="loginInfo.password" :required="true"></x-input>
                </group>
                <div class="button">
                    <x-button @click.native="login">登陆</x-button>
                </div>
            </div>
            <div class="register-wrapper" v-if="index === 1">
                <group>
                    <x-input label-width="4em" title="手机号码" name="phone" type="tel" mask="999 9999 9999" is-type="china-mobile" :required="true" v-model="registerInfo.phone"></x-input>
                    <x-input label-width="4em" title="用户名" name="username" type="text" :min='3' :max='16' v-model="registerInfo.username" :on-blur="duplicateUsername"></x-input>
                    <x-input label-width="4em" title="密码" name="password" type="password" :min='6' :max='16' :required="true" v-model="registerInfo.password"></x-input>
                    <x-input label-width="4em" title="确认密码" name="confirmPassword" type="password" :min='6' :max='16' :required="true" v-model="registerInfo.confirmpsd" :is-type="verifypsd"></x-input>
                </group>
                <div class="button">
                    <x-button @click.native="register">注册</x-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { md5, Group, XButton, XInput, Toast, Tab, TabItem } from 'vux';
import Logger from 'chivy';
const log = new Logger('cafe/loginregister');
const ApiIsExistUserName = '/shop/member/show/ui/isExistUserName.do';
export default {
    data() {
        return {
            registerInfo: {
                'username': '',
                'phone': '',
                'password': '',
                'confirmpsd': ''
            },
            loginInfo: {
                'username': '',
                'password': ''
            },
            tabItemList: ['会员登录', '会员注册'],
            index: 0
        };
    },
    components: {
        Group,
        XButton,
        XInput,
        Toast,
        Tab,
        TabItem
    },
    computed: {
        member: function() {
            return this.$store.state.member;
        },
        submitLogin: function() {
           let message = {
                'username': this.loginInfo.username,
                'password': md5(this.loginInfo.password)
            };
            log.debug('login user is ' + JSON.stringify(message));
            return message;
        },
        submitRegister: function() {
            let message = {
                'username': this.registerInfo.username,
                'phone': this.registerInfo.phone,
                'password': md5(this.registerInfo.password)
            };
            log.debug('Register user is ' + JSON.stringify(message));
            return message;
        }
    },
    methods: {
        loginStatus: function() {
            log.debug('loginStatus: the member data is ' + JSON.stringify(this.member));
            if (this.member === null || this.member.name === '' || typeof (this.member.name) === 'undefined') {
                this.$vux.toast.text('登陆成功', 'middle');
            } else {
                this.$vux.toast.text('登陆失败，请重新登陆', 'middle');
            }
        },
        registerStatus: function() {
            log.debug('registerStatus: the member data is ' + JSON.stringify(this.member));
            if (this.member === null || this.member.name === '' || typeof (this.member.name) === 'undefined') {
                this.$vux.toast.text('注册成功', 'middle');
            } else {
                this.$vux.toast.text('服务器故障，请重新注册', 'middle');
            }
        },
        login: function() {
            if (this.loginInfo.username === '' || this.loginInfo.password === '') {
                this.$vux.toast.text('用户名或者密码不能为空', 'middle');
            } else {
                this.$store.dispatch('loginin', this.submitLogin);
                setTimeout(this.loginStatus(), 2000);
            }
        },
        showregister: function() {
            log.info('show register HMI');
            this.index = 1;
        },
        showlogin: function() {
            log.info('show login HMI');
            this.index = 0;
        },
        register: function() {
            if (this.registerInfo.phone === '') {
                this.$vux.toast.text('手机号码不能为空', 'middle');
            } else if (this.registerInfo.password === '' || this.registerInfo.confirmpsd === '') {
                this.$vux.toast.text('请输入正确的密码', 'middle');
            } else if (this.registerInfo.password !== this.registerInfo.confirmpsd) {
                this.$vux.toast.text('两次输入的密码不一致，请重新输入', 'middle');
            } else {
                this.$store.dispatch('registerit', this.submitRegister);
            }
        },
        verifypsd: function() {
            if (this.registerInfo.password === this.registerInfo.confirmpsd) {
                return { valid: true };
            } else {
                return { valid: false, msg: '两次输入的密码不一致' };
            }
        },
        duplicateUsername: function() {
            if (this.registerInfo.username !== '') {
                log.info('Now get the AJAX to API(' + ApiIsExistUserName + ')');
                this.$http.get(ApiIsExistUserName, this.registerInfo.username).then((response) => {
                    log.info('is ' + this.registerInfo.username + ' exist?');
                    let result = response.data.data;
                    log.debug('ajax response is ' + result);
                    /* 用户已存在 */
                    if (result) {
                        return { valid: false, msg: '用户名已存在，请重新输入' };
                    } else {
                        return { valid: true };
                    }
                });
            }
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .login
        .login-wrapper
            .weui-cells
                .weui-cell
                    .weui-cell__hd
                        text-align justify
                        text-align-last justify
                    .weui-cell__primary
                        margin-left 1em
            .button
                display flex
                align-items center
                margin 10px 0
                .weui-btn
                    margin 0 20%
                    background #58B7FF
                    color #fff
        .register-wrapper
            .weui-cells
                .weui-cell
                    .weui-cell__hd
                        text-align justify
                        text-align-last justify
                    .weui-cell__primary
                        margin-left 1em
            .button
                display flex
                align-items center
                margin 10px 0
                .weui-btn
                    margin 0 20%
                    background #58B7FF
                    color #fff
    .member
        .weui-panel__hd
            font-size 20px
            color black
            font-weight 600
</style>
