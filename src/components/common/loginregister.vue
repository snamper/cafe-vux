<template>
    <div class="loginRegister-wrapper">
        <div class="showdetail-wrapper">
            <div class="login-wrapper" v-if="loginin">
                <divider>会员登陆</divider>
                <group title="会员登陆">
                    <x-input title="用户名" name="username" placeholder="请输入用户名" type="text" :min='3' :max='16' v-model="loginInfo.username"></x-input>
                    <x-input title="密码" name="password" placeholder="请输入密码" type="password" :min='6' :max='16' v-model="loginInfo.password"></x-input>
                </group>
                <flexbox>
                    <flexbox-item>
                        <div class="btn-login">
                            <x-button type="primary" @click.native="login">登陆</x-button>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="btn-login">
                            <x-button type="primary" @click.native="showregister">加入我们</x-button>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="register-wrapper" v-else>
                <divider>会员注册</divider>
                <group title="会员注册">
                    <x-input title="用户名" name="username" placeholder="请输入用户名" type="text" :min='3' :max='16' v-model="registerInfo.username"></x-input>
                    <x-input title="手机号码" name="phone" placeholder="请输入手机号码" type="tel" mask="999 9999 9999" is-type="china-mobile" v-model="registerInfo.phone"></x-input>
                    <x-input title="密码" name="password" placeholder="请输入密码" type="password" :min='6' :max='16' v-model="registerInfo.password"></x-input>
                    <x-input title="确认密码" name="confirmPassword" placeholder="再一次输入密码" type="password" :min='6' :max='16' v-model="registerInfo.confirmpsd" :is-type="verifypsd"></x-input>
                </group>
                <flexbox>
                    <flexbox-item>
                        <div class="btn-register">
                            <x-button type="primary" @click.native="showlogin">已有账号</x-button>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="btn-register">
                            <x-button type="primary" @click.native="register">提交信息</x-button>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="btn-register">
                            <x-button type="primary" @click.native="clear">重置</x-button>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Flexbox, FlexboxItem, Group, Cell, Divider, XButton, XInput, XSwitch, Card, Toast } from 'vux';
import Logger from 'chivy';
const log = new Logger('cafe/loginregister');
export default {
    data() {
        return {
            loginin: false,
            registerInfo: {
                'username': '',
                'phone': '',
                'password': '',
                'confirmpsd': ''
            },
            loginInfo: {
                'username': '',
                'password': ''
            }
        };
    },
    props: {
        member: {
            type: Object
        }
    },
    components: {
        XHeader,
        Flexbox,
        FlexboxItem,
        Group,
        Cell,
        Divider,
        XButton,
        XInput,
        XSwitch,
        Card,
        Toast
    },
    methods: {
        login: function() {
            this.$http.get('/shop/member/show/ui/memberLogin.do', this.loginInfo).then((response) => {
                let result = response.body;
                log.info('ajax request start in memberLogin.do');
                log.debug('ajax response is ' + JSON.stringify(result));
                if (result !== null) {
                    this.$emit('loginMember', result);
                }
            });
        },
        register: function() {
            this.$http.get('/shop/member/show/ui/createMember.do', this.registerInfo).then((response) => {
                let result = response.body;
                log.info('ajax request start in createMember.do');
                log.debug('ajax response is ' + JSON.stringify(result));
                this.$emit('registerMember', result);
            });
        },
        showlogin: function() {
            this.loginin = true;
        },
        showregister: function() {
            console.log('showregister click');
            this.loginin = false;
        },
        clear: function() {
            for (let key in this.registerInfo) {
                // console.log(this.registerInfo[key]);
                this.registerInfo[key] = '';
            }
            for (let key in this.loginInfo) {
                // console.log(this.loginInfo[key]);
                this.loginInfo[key] = '';
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
            this.$http.get('/shop/member/show/ui/isExistUserName.do', this.registerInfo.username).then((response) => {
                log.info('is ' + this.registerInfo.username + ' exist?');
                let result = response.body;
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
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .login
        .login-wrapper
            .btn-login
                margin 5px 0
                padding:0 20%
        .register-wrapper
            .btn-register
                margin 5px 5px
    .member
        .weui-panel__hd
            font-size 20px
            color black
            font-weight 600
</style>
