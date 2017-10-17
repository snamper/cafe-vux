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
    props: {
        member: {
            type: Object
        }
    },
    components: {
        Group,
        XButton,
        XInput,
        Toast,
        Tab,
        TabItem
    },
    methods: {
        login: function() {
            if (this.loginInfo.username === '' || this.loginInfo.password === '') {
                this.$vux.toast.text('用户名或者密码不能为空', 'middle');
            } else {
                this.loginInfo.password = md5(this.loginInfo.password);
                log.debug('login user is ' + JSON.stringify(this.loginInfo));
                this.$http.get('/shop/member/show/ui/memberLogin.do', this.loginInfo).then((response) => {
                    let result = response.data.data;
                    log.info('ajax request start in memberLogin.do');
                    log.debug('ajax response is ' + JSON.stringify(result));
                    if (result !== null) {
                        this.$emit('loginMember', result);
                    }
                });
            }
        },
        showregister: function() {
            this.index = 1;
        },
        showlogin: function() {
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
                this.registerInfo.password = md5(this.registerInfo.password);
                this.registerInfo.confirmpsd = md5(this.registerInfo.confirmpsd);
                log.debug('register user is ' + JSON.stringify(this.registerInfo));
                this.$http.get('/shop/member/show/ui/createMember.do', this.registerInfo).then((response) => {
                    let result = response.data.data;
                    log.info('ajax request start in createMember.do');
                    log.debug('ajax response is ' + JSON.stringify(result));
                    this.$emit('registerMember', result);
                });
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
                this.$http.get('/shop/member/show/ui/isExistUserName.do', this.registerInfo.username).then((response) => {
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
