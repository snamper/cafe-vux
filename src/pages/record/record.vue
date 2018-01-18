<template>
    <div>
        <x-header title="订单详情" :left-options="{showBack: true, preventGoBack: true}" @on-click-back="back()"></x-header>
        <tab>
            <tab-item selected @on-item-click="showProcess()">订单状态</tab-item>
            <tab-item @on-item-click="showDetail()">订单详情</tab-item>
        </tab>
        <div class="show">
            <process v-show="show" :good="record"></process>
            <detail v-show="!show" :good="record.details" ref="recordDetail"></detail>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Tab, TabItem } from 'vux';
import process from './process';
import detail from './detail';
import Logger from 'chivy';
const log = new Logger('page/record/record');
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
    methods: {
        showProcess() {
            this.show = true;
        },
        showDetail() {
            this.show = false;
            this.$refs.recordDetail.scrollit();
        },
        back() {
            log.debug('back');
            this.$router.push({path: '/records'});
        }
    },
    components: {
        XHeader,
        Tab,
        TabItem,
        process,
        detail
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
