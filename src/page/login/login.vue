<template>
    <div>
        <x-header title="" :left-options="{showBack: true, preventGoBack: false}"></x-header>
        <logo></logo>
        <div class="login-wrapper" >
            <div class="login-input" v-show="show">
                <group >
                    <x-input label-width="3em" text-align="left" placeholder="用户名/手机号码"  type="text" :required="true" v-model='loginUser.name'></x-input>
                    <x-input label-width="3em" text-align="left" placeholder="密码"  type="password" :required="true" v-model='loginUser.psd' @on-enter="login"></x-input>
                    <x-button type="primary" @click.native="login">登陆</x-button>
                    <div class="txt-wrapper">
                        <div class="forget">忘记密码</div>
                        <div class="vistor">游客访问</div>
                        <div class="register" @click="showRegister">注册</div>
                    </div>
                </group>
            </div>
            <div class="register-input" v-show="!show">
                <group>
                    <x-input label-width="3em" text-align="left" placeholder="手机号码" mask="999 9999 9999" type="tel" :required="true" v-model='registerUser.phone' is-type="china-mobile" ref="phone" @on-blur="duplicateUsername"></x-input>
                    <x-input label-width="3em" text-align="left" placeholder="用户名"  type="text" v-model='registerUser.name' ref="username"></x-input>
                    <x-input label-width="3em" text-align="left" placeholder="输入密码"  type="password" :required="true" v-model='registerUser.psd' ref="password"></x-input>
                    <x-input label-width="3em" text-align="left" placeholder="确认密码"  type="password" :required="true" v-model='registerUser.repsd' ref="repassword" @on-enter="register"></x-input>
                    <x-button type="primary" @click.native="register">注册</x-button>
                    <div class="txt-wrapper" @click="showLogin">
                        已有账户，登陆
                    </div>
                </group>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import config from '../../config/config';
import logo from '../../components/logo/logo';
import { md5, XInput, Group, XButton, XHeader, Toast } from 'vux';
import Logger from 'chivy';
const log = new Logger('page/login');
export default {
    data() {
        return {
            show: true,
            loginUser: {
                name: '',
                psd: ''
            },
            registerUser: {
                phone: '',
                name: '',
                psd: '',
                repsd: ''
            }
        };
    },
    methods: {
        showRegister() {
            this.show = false;
        },
        showLogin() {
            log.debug('show login page');
            this.show = true;
        },
        login() {
            let url = config.userLogin;
            if (this.loginUser.name === '' || this.loginUser.psd === '') {
                this.$vux.toast.text('用户名或者密码不能为空', 'middle');
            } else {
                /* 注册AJAX请求 */
                log.info('Now get the AJAX to API(' + url + ')');
                this.$http.post(url, this.ajaxloginUser).then((response) => {
                    let result = response.data;
                    log.debug('ajax response is ' + JSON.stringify(result));
                    if (result.status) {
                        let member = {
                            'balance': result.balance,
                            'ID': result.id,
                            'name': result.name
                        };
                        this.$store.commit('setMember', member);
                        log.info('Save login user to sessionStorage');
                        sessionStorage.setItem('member', JSON.stringify(member));
                        // log.info('clear uuid');
                        // this.$store.commit('setUUID', '');
                        this.$vux.toast.text('登陆成功', 'middle');
                        this.$router.push({path: '/order'});
                    } else {
                        this.$vux.toast.text('登陆失败，请重新登陆', 'middle');
                        this.loginUser.psd = '';
                    }
                });
            }
        },
        register() {
            if (this.$refs.phone.invalid) {
                this.$vux.toast.text('请填写正确的手机号码', 'middle');
            } else if (this.$refs.password.invalid) {
                this.$vux.toast.text('请输入正确的密码', 'middle');
            } else if (this.registerUser.psd !== this.registerUser.repsd) {
                this.$vux.toast.text('两次输入的密码不一致，请重新输入', 'middle');
                this.$refs.password.reset();
                this.$refs.repassword.reset();
            } else {
                let url = config.userRegister;
                /* 注册 */
                log.debug('Now get the AJAX to API(' + url + ')');
                this.$http.post(url, this.ajaxregisterUser).then((response) => {
                    let result = response.data;
                    log.debug('AJAX API(' + url + ') response data is ' + JSON.stringify(result));
                    if (result.success) {
                        let member = {
                            'balance': 0,
                            'ID': result.entityId,
                            'name': result.entityName
                        };
                        log.debug('save member to vuex. member is ' + JSON.stringify(member));
                        this.$store.commit('setMember', member);
                        log.info('Save register user to sessionStorage');
                        sessionStorage.setItem('member', JSON.stringify(member));
                        log.info('finish to save sessionStorage');
                        // log.info('clear uuid');
                        // this.$store.commit('setUUID', '');
                        this.$vux.toast.text('注册成功', 'middle');
                        this.$router.push({path: '/order'});
                    } else {
                        this.$vux.toast.text('服务器故障，请稍候再试', 'middle');
                    }
                });
            }
        },
        duplicateUsername() {
            let url = config.existUser;
            log.debug('submit resister name is ' + this.registerUser.phone);
            if (this.registerUser.phone !== '') {
                log.info('Now get the AJAX to API(' + url + ')');
                let name = { 'entityName': this.registerUser.phone.replace(/\s/g, '') };
                log.debug('submit verify user is ' + JSON.stringify(name));
                this.$http.post(url, name).then((response) => {
                    log.info('is ' + this.registerUser.username + ' exist?');
                    let result = response.data;
                    log.info('ajax response is ' + result);
                    /* username already exist */
                    if (result.status) {
                        this.$vux.toast.text('用户名已存在，请重新输入', 'middle');
                        this.$refs.phone.reset();
                    }
                });
            }
        }
    },
    computed: {
        ajaxloginUser() {
            let result = {
                'name': this.loginUser.name,
                'passWd': md5(this.loginUser.psd)
            };
            log.debug('login user is ' + JSON.stringify(result));
            return result;
        },
        ajaxregisterUser() {
            let result = {
                'username': this.registerUser.name,
                'name': this.registerUser.phone.replace(/\s/g, ''), // 去掉空格
                'passWd': md5(this.registerUser.psd)
            };
            log.debug('Register user is ' + JSON.stringify(result));
            return result;
        }
    },
    components: {
        logo,
        XInput,
        Group,
        XButton,
        XHeader,
        Toast
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
