<template>
    <div>
        <logo></logo>
        <div class="login-wrapper">
            <div class="login-input">
                <group >
                    <x-input label-width="3em" text-align="left" placeholder="用户名"  type="text" :required="true"></x-input>
                    <x-input label-width="3em" text-align="left" placeholder="密码"  type="text" :required="true"></x-input>
                    <x-button type="primary">登陆</x-button>
                    <div class="txt-wrapper">
                        <div class="forget">忘记密码</div>
                        <div class="vistor">游客访问</div>
                        <div class="register">注册</div>
                    </div>
                </group>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import logo from '../../components/logo/logo';
import { XInput, Group, XButton } from 'vux';
export default {
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
        width 80%
        .txt-wrapper
            margin-top 5px
            width 100%
            flex-wrap nowrap
            display flex
            align-items center
            justify-content center
            .forget,.vistor,.register
                display inline-block
                flex-grow 1
                display flex
                align-items center
            .forget
                font-size 12px
                display flex
                justify-content flex-start
                text-align left
                padding-left 5px
            .vistor
                font-size 24px
                display flex
                justify-content center
            .register
                font-size 12px
                display flex
                justify-content flex-end
                padding-right 5px

</style>
