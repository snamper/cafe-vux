<template>
    <div class="login-wrapper">
        <logo></logo>
        <div class="loginWrapper">
            <group>
                <x-input title="用户名" placeholder="请输入用户名">
                    <img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
                </x-input>
                <x-input title="密码" placeholder="请输入密码">
                    <img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
                </x-input>
                <div class="button">
                    <x-button mini style="border-radius:99px;">submit</x-button>
                </div>
            </group>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Group, XInput, XButton } from 'vux';
import logo from '../../../components/logo/logo';
export default {
    components: {
        XInput,
        XButton,
        Group,
        logo
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.login-wrapper
    height 100%
    .loginWrapper
        margin-top 7rem
        display flex
        justify-content center
        align-items center
        .weui-cells
            .weui-cell
                background #fbf9fe
        .button
            padding 1rem 0
            background #fbf9fe
            display flex
            align-items center
            .weui-btn
                background #58B7FF
                color #fff
</style>
