<template>
    <div>
        <logo></logo>
        <div class="login-wrapper" >
            <div class="login-input" v-show="show">
                <group>
                    <x-input label-width="3em" text-align="left" placeholder="用户名/手机号码"  type="text" :required="true" v-model='loginUser.name'></x-input>
                    <x-input label-width="3em" text-align="left" placeholder="密码"  :min="1" :max="20" type="password" :required="true" v-model='loginUser.psd' @on-enter="login"></x-input>
                    <x-button type="primary" @click.native="login">登陆</x-button>
                    <div class="txt-wrapper">
                        <div class="forget" @click="forgetPwd">忘记密码</div>
                        <div class="register" @click="showRegister">注册新用户</div>
                    </div>
                    <divider>第三方登陆</divider>
                    <div class="third">
                        <span class="iconfont icon-xinlangweibo" @click="weibo"></span>
                        <span class="iconfont icon-weixin" @click="wechat"></span>
                        <span class="iconfont icon-qq-copy" @click="qq"></span>
                        <span class="iconfont icon-zhifubao" @click="alipay"></span>
                    </div>
                </group>
            </div>
            <div class="register-input" v-show="!show">
                <group>
                    <x-input label-width="3em" text-align="left" placeholder="手机号码" mask="999 9999 9999" type="tel" :required="true" v-model='registerUser.phone' is-type="china-mobile" ref="phone" @on-blur="duplicateUsername"></x-input>
                    <x-input label-width="3em" text-align="left" placeholder="输入密码" :min="1" :max="20" type="password" :required="true" v-model='registerUser.psd' ref="password"></x-input>
                    <x-input label-width="3em" text-align="left" placeholder="确认密码" :min="1" :max="20" type="password" :required="true" v-model='registerUser.repsd' ref="repassword" @on-enter="register"></x-input>
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
import logo from '../../components/logo';
import { md5, XInput, Group, XButton, Toast, Divider } from 'vux';
import { mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('page/login/login');
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
                psd: '',
                repsd: ''
            }
        };
    },
    methods: {
        // 点击微博图标
        weibo() {
            window.location.href = '/shop/member/show/ui/loginByOauth2.do?accountType=weibo';
        },
        // 点击qq图标
        qq() {
            // window.location.href = '/shop/member/show/ui/loginByOauth2.do?accountType=qq';
            this.$vux.toast.show({
                text: '暂未开通，敬请期待',
                time: 1000
            });
        },
        // 点击微信图标
        wechat() {
            window.location.href = '/shop/member/show/ui/loginByOauth2.do?accountType=wechat';
            /* this.$vux.toast.show({
                text: '暂未开通，敬请期待',
                time: 1000
            }); */
        },
        // 点击支付宝图标
        alipay() {
            // window.location.href = '/shop/member/show/ui/loginByOauth2.do?accountType=alipay';
            this.$vux.toast.show({
                text: '暂未开通，敬请期待',
                time: 1000
            });
        },
        // TODO 忘记密码
        forgetPwd() {
            this.$vux.alert.show({
                content: '请联系管理员修改密码'
            });
        },
        // 显示注册页面
        showRegister() {
            this.show = false;
        },
        // 显示登陆页面
        showLogin() {
            this.show = true;
        },
        // 登陆
        login() {
            if (this.loginUser.name === '' || this.loginUser.psd === '') {
                this.$vux.toast.text('用户名或者密码不能为空', 'middle');
            } else {
                /* 注册AJAX请求 */
                this.$store.dispatch('login', this.ajaxloginUser).then(() => {
                    this.$vux.toast.text('登陆成功', 'middle');
                    // 跳转到member页面
                    this.$router.push({name: 'member'});
                }).catch((error) => {
                    log.error(error);
                    this.$vux.toast.text('登陆失败，请重新登陆', 'middle');
                });
            }
        },
        // 注册
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
                let phone = { 'name': this.registerUser.phone.replace(/\s/g, '') };
                this.$store.dispatch('duplicate', phone).then(() => {
                    this.$vux.toast.text('用户名已存在，请重新输入', 'middle');
                    this.$refs.phone.reset();
                }).catch((error) => {
                    log.error(error);
                    this.$store.dispatch('resigter', this.ajaxregisterUser).then(() => {
                        this.$vux.toast.text('注册成功', 'middle');
                        setTimeout(() => {
                            this.$router.push({name: 'member'});
                        }, 1000);
                    }).catch((error) => {
                        log.error(error);
                        this.$vux.toast.text('服务器故障，请稍候再试', 'middle');
                    });
                });
            }
        },
        // 手机号码重复检测
        duplicateUsername() {
            if (this.registerUser.phone !== '') {
                let phone = { 'mobile': this.registerUser.phone.replace(/\s/g, '') };
                this.$store.dispatch('duplicate', phone).then(() => {
                    this.$vux.toast.text('用户名已存在，请重新输入', 'middle');
                    this.$refs.phone.reset();
                }).catch((error) => {
                    log.error(error);
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
            return result;
        },
        ajaxregisterUser() {
            let result = {
                'mobile': this.registerUser.phone.replace(/\s/g, ''), // 去掉空格
                'passWd': md5(this.registerUser.psd)
            };
            return result;
        },
        ...mapState([
            'status'
        ])
    },
    components: {
        logo,
        XInput,
        Group,
        XButton,
        Toast,
        Divider
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
        .third
            display flex
            align-items center
            justify-content center
            .iconfont
                padding 0 5px
                width 2em;
                height 2em;
                vertical-align -0.15em
                fill currentColor
                overflow hidden
    .register-input
        width 90%
        .txt-wrapper
            line-height 16px
            font-size 16px
            padding 10px
            text-align center
</style>
