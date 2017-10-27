<template>
    <div class="wrapper">
        <tab v-model="index" active-color='#58B7FF' :line-width="1">
            <tab-item class="vux-center" :selected="tabItemList===item" v-for="(item,index) in tabItemList" @click="tabItemList=item" :key="index">{{item}}</tab-item>
        </tab>
        <div class="login-wrapper" v-if="index === 0">
            <group>
                <x-input label-width="3em" text-align="left" title="用户名" name="username"  type="text" v-model="loginInfo.username" :required="true"></x-input>
                <x-input label-width="3em" text-align="left" title="密码" name="password"  type="password" v-model="loginInfo.password" :required="true" @on-enter="login"></x-input>
            </group>
            <div class="button">
                <x-button @click.native="login">登陆</x-button>
            </div>
        </div>
        <div class="register-wrapper" v-if="index === 1">
            <group>
                <x-input label-width="4em" title="手机号码" name="phone" type="tel" mask="999 9999 9999" is-type="china-mobile" :required="true" v-model="registerInfo.phone" ref="phone"></x-input>
                <x-input label-width="4em" title="用户名" name="username" type="text" :min='3' :max='16' v-model="registerInfo.username" @on-blur="duplicateUsername" ref="username"></x-input>
                <x-input label-width="4em" title="密码" name="password" type="password" :min='6' :max='16' :required="true" v-model="registerInfo.password" ref="password"></x-input>
                <x-input label-width="4em" title="确认密码" name="confirmPassword" type="password" :min='6' :max='16' :required="true" v-model="registerInfo.confirmpsd" :is-type="verifypsd" ref="repassword" @on-enter="register"></x-input>
            </group>
            <div class="button">
                <x-button @click.native="register">注册</x-button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { md5, Group, XButton, XInput, Toast, Tab, TabItem } from 'vux';
import Logger from 'chivy';
const log = new Logger('cafe/loginregister');
const ApiIsExistUserName = '/shop/member/show/ui/isExistUserName.do';
const ApiMemberLogin = '/shop/member/show/ui/memberLogin.do';
const ApiCreateMember = '/shop/member/show/ui/createMember.do';
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
        member: function () {
            return this.$store.state.member;
        },
        submitLogin: function () {
            let message = {
                'name': this.loginInfo.username,
                'passWd': md5(this.loginInfo.password)
            };
            log.debug('login user is ' + JSON.stringify(message));
            return message;
        },
        submitRegister: function () {
            let message = {
                'name': this.registerInfo.username,
                'phone': this.registerInfo.phone.replace(/\s/g, ''),
                'passWd': md5(this.registerInfo.password)
            };
            log.debug('Register user is ' + JSON.stringify(message));
            return message;
        }
    },
    methods: {
        login: function () {
            if (this.loginInfo.username === '' || this.loginInfo.password === '') {
                this.$vux.toast.text('用户名或者密码不能为空', 'middle');
            } else {
                /* 注册AJAX请求 */
                log.info('Now get the AJAX to API(' + ApiMemberLogin + ')');
                this.$http.post(ApiMemberLogin, this.submitLogin).then((response) => {
                    let result = response.data;
                    log.debug('ajax response is ' + JSON.stringify(result));
                    if (result.status) {
                        this.$store.commit('saveMember', result);
                        log.info('Save login user to sessionStorage');
                        sessionStorage.setItem('member', JSON.stringify(result));
                        this.$vux.toast.text('登陆成功', 'middle');
                        let user = {
                            'userId': this.member.id,
                            'needDetail': true
                        };
                        log.debug('get product list\'s user is ' + JSON.stringify(user));
                        this.$store.commit('getBuyList', user);
                    } else {
                        this.$vux.toast.text('登陆失败，请重新登陆', 'middle');
                        this.loginInfo.password = '';
                    }
                });
            }
        },
        showregister: function () {
            log.info('show register HMI');
            this.index = 1;
        },
        showlogin: function () {
            log.info('show login HMI');
            this.index = 0;
        },
        register: function () {
            if (this.$refs.phone.invalid) {
                this.$vux.toast.text('请填写正确的手机号码', 'middle');
            } else if (this.$refs.password.invalid) {
                this.$vux.toast.text('请输入正确的密码', 'middle');
            } else if (this.registerInfo.password !== this.registerInfo.confirmpsd) {
                this.$vux.toast.text('两次输入的密码不一致，请重新输入', 'middle');
                this.$refs.password.reset();
                this.$refs.repassword.reset();
            } else {
                /* 注册 */
                log.debug('Now get the AJAX to API(' + ApiCreateMember + ')');
                this.$http.post(ApiCreateMember, this.submitRegister).then((response) => {
                    let result = response.data;
                    log.debug('AJAX API(' + ApiCreateMember + ') response data is ' + JSON.stringify(result));
                    if (result !== null) {
                        let member = {
                            'balance': 0,
                            'ID': result.entityId,
                            'name': result.entityName
                        };
                        log.debug('save member to vuex. member is ' + JSON.stringify(member));
                        this.$store.commit('saveMember', member);
                        log.info('Save login user to sessionStorage');
                        sessionStorage.setItem('member', JSON.stringify(member));
                        log.info('finish to save sessionStorage');
                        this.$vux.toast.text('注册成功', 'middle');
                    } else {
                        this.$vux.toast.text('服务器故障，请稍候再试', 'middle');
                    }
                });
            }
        },
        verifypsd: function () {
            if (this.registerInfo.password === this.registerInfo.confirmpsd) {
                return { valid: true };
            } else {
                return { valid: false, msg: '两次输入的密码不一致' };
            }
        },
        duplicateUsername: function () {
            log.debug('submit resister name is ' + this.registerInfo.username);
            if (this.registerInfo.username !== '') {
                log.info('Now get the AJAX to API(' + ApiIsExistUserName + ')');
                let name = { 'entityName': this.registerInfo.username };
                log.debug('submit verify user is ' + JSON.stringify(name));
                this.$http.post(ApiIsExistUserName, name).then((response) => {
                    log.info('is ' + this.registerInfo.username + ' exist?');
                    let result = response.data;
                    log.info('ajax response is ' + result);
                    /* username already exist */
                    if (result.status) {
                        this.$vux.toast.text('用户名已存在，请重新输入', 'middle');
                        this.$refs.username.reset();
                    }
                });
            }
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.wrapper
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
</style>
