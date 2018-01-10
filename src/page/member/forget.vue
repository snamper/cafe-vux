<template>
    <div>
        <x-header title="找回密码" :left-options="{showBack: true}"></x-header>
        <logo></logo>
        <div class="wrapper">
            <group>
                <!-- <x-input label-width="3em" text-align="left" title=""  type="text" :required="true" v-model='loginUser.name'></x-input> -->
            </group>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import logo from '../../components/logo/logo';
import { XHeader, XInput, Group, XButton } from 'vux';
export default {
    components: {
        logo,
        XHeader,
        XInput,
        Group,
        XButton
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
