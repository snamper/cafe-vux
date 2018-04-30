<template>
    <div v-if="record">
        <x-header title="订单详情" :left-options="{showBack: true, preventGoBack: true}" @on-click-back="back()"></x-header>
        <detail :record="record" ref="recordDetail"></detail>
    </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Tab, TabItem } from 'vux';
import detail from './detail';
import { mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('page/record/record');
export default {
    beforeRouteEnter(from, to, next) {
        next(vm => {
            log.debug('beforeRouteEnter to.path is ' + to.path);
            log.debug('beforeRouteEnter from.path is ' + from.path);
            // 当页面不是从pay或者是records跳转而来,就直接跳转到records页面
            if (to.path === '/records' || to.path === '/pay') {
                log.debug('from record or pay');
                vm.showDetail();
            } else {
                log.debug('jump page to records');
                vm.$router.push({name: 'records'});
            }
        });
    },
    beforeRouteLeave(from, to, next) {
        // 更新订单ID为空
        this.$store.commit('updateRecordID', null);
        next();
    },
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
    computed: {
        ...mapState([
            'records'
        ])
    },
    methods: {
        showProcess() {
            log.debug('showProcess');
            this.show = true;
        },
        showDetail() {
            log.debug('showDetail');
            this.show = false;
            this.$refs.recordDetail.scrollit();
        },
        back() {
            log.debug('back');
            this.$router.push({name: 'record', params: {record: this.record}});
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