<template>
    <div>
        <div class="login-wrapper" >
            <div class="login-input">
                <group >
                    <x-input label-width="3em" text-align="left" placeholder="请输入新密码"  type="password" :required="true"></x-input>
                    <x-input label-width="3em" text-align="left" placeholder="请再输入一遍"  type="text" :required="true"></x-input>
                    <x-button type="primary" @click.native="modifyPwd">修改密码</x-button>
                </group>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { md5, XInput, Group, XButton, XHeader, Toast } from 'vux';
import Logger from 'chivy';
const log = new Logger('page/member');
export default {
    methods: {
        data() {
            return {
                loginUser: {
                    pwd: '',
                    verifyPwd: ''
                }
            };
        },
        computed: {
            passwdGiven() {
                let result = {
                    'userId': this.memberInfo.ID,
                    'pwd': md5(this.loginUser.pwd),
                    'verifyPwd': md5(this.loginUser.verifyPwd)
                };
                return result;
            },
            memberInfo() {
                return this.$store.state.memberInfo;
            }
        },
        modifyPwd() {
            // this.loginUser  得到填写的信息了
             /* 注册AJAX请求 */
                let url = '';
                log.info('Now get the AJAX to API(' + url + ')');
                this.$http.post(url, this.passwdGiven).then((response) => {
                    let result = response.data;
                    log.debug('ajax response is ' + JSON.stringify(result));
                    if (result.status) {
                        this.$vux.toast.text('密码修改成功', 'middle');
                        this.$router.back();
                    } else {
                        this.$vux.toast.text('密码修改失败', 'middle');
                        this.loginUser.pwd = '';
                    }
                });
        }
    },
    components: {
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
</style>
