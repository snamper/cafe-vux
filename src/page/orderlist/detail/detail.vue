<template>
    <div v-show="show">
        <logo></logo>
         <x-header title="订单详情"></x-header>
    </div>
</template>

<script type="text/ecmascript-6">
import logo from '../../../components/logo/logo';
import { XHeader } from 'vux';
export default {
    date() {
        return {
            show: false
        };
    },
    methods: {
        show() {
            this.show = true;
        }
    },
    components: {
        logo,
        XHeader
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>