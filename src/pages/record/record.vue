<template>
    <div>
        <x-header title="订单详情" :left-options="{showBack: true, preventGoBack: true}" @on-click-back="showOrderList()"></x-header>
        <tab>
            <tab-item selected @on-item-click="showProcess()">订单状态</tab-item>
            <tab-item @on-item-click="showOrderDetail()">订单详情</tab-item>
        </tab>
        <div class="show">
            <process v-show="show" :product="record"></process>
            <order v-show="!show" :product="record" ref="order"></order>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Tab, TabItem } from 'vux';
export default {
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
