<template>
    <div>
        <x-header title="订单详情" :left-options="{showBack: true, preventGoBack: true}" @on-click-back="showOrderList()"></x-header>
        <tab>
            <tab-item selected @on-item-click="showProcess()">订单状态</tab-item>
            <tab-item @on-item-click="showOrderDetail()">订单详情</tab-item>
        </tab>
        <div class="show">
            <process v-show="show" :product="record"></process>
            <order v-show="!show" :product="record"></order>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Tab, TabItem } from 'vux';
import process from './process';
import order from './order';
import Logger from 'chivy';
const log = new Logger('page/orderDetail');
export default {
    data() {
        return {
            show: true
        };
    },
    props: {
        record: {
            type: Object
        }
    },
    components: {
        XHeader,
        Tab,
        TabItem,
        process,
        order
    },
    methods: {
        showProcess() {
            this.show = true;
        },
        showOrderDetail() {
            this.show = false;
        },
        showOrderList() {
            log.debug('show orderlist page');
            this.$router.push({path: '/orderlist'});
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
