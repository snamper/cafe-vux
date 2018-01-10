<template>
    <div>
        <x-header :left-options="{showBack: true}" title="修改密码"></x-header>
        <logo></logo>
        <group>
            <x-input label-width="6em" text-align="left" title="旧密码"  type="password" :required="true"></x-input>
            <x-input label-width="6em" text-align="left" title="新密码"  type="password" :required="true"></x-input>
            <x-input label-width="6em" text-align="left" title="确认密码"  type="password" :required="true"></x-input>
            <x-button type="primary" @click.native="modify">修改</x-button>
        </group>
    </div>
</template>

<script type="text/ecmascript-6">
import logo from '../../components/logo/logo';
import { Group, XInput, XButton, XHeader } from 'vux';
import Logger from 'chivy';
const log = new Logger('cafe/member/modifyPwd');
export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (from.path !== '/member') {
                vm.$router.back();
            }
        });
    },
    methods: {
        modify() {
            log.debug('modify password');
        }
    },
    components: {
        logo,
        Group,
        XInput,
        XButton,
        XHeader
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
