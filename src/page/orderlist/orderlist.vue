<template>
    <div>
        <div class="list-wrapper">
            <logo></logo>
            <div class="orderlist-wrapper" v-if="showList">
                <p class="title" v-if="!memberInfo">游客，您的本次订单如下</p>
                <p class="title" v-if="memberInfo">{{memberInfo.name}}，您的历史订单如下</p>
                <ul v-if="!memberInfo">
                    <li class="orderlist" @click="showDetail">
                        <div class="time">购买日期：<span class="time">{{recordList.datetime}}</span></div>
                        <div class="status">订单状态：<span class="status">{{recordList.status}}</span></div>
                    </li>
                </ul>
                <ul v-if="memberInfo">
                    <li class="orderlist" @click="showDetail" v-for="(item,index) in orderlist" :key="index">
                        <div class="time">购买日期：<span class="time">{{orderlist.datetime}}</span></div>
                        <div class="status">订单状态：<span class="status">{{orderlist.status}}</span></div>
                    </li>
                </ul>
            </div>
            <div class="non-order" v-if="!showList">
                <p class="title">亲，您还没有购买任何商品</p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import logo from '../../components/logo/logo';
import { mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('page/orderlist');
export default {
    computed: {
        ...mapState([
            'memberInfo',
            'recordList',
            'memberRecordList'
        ]),
        showList() {
            if (this.recordList || this.memberRecordList) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        showDetail() {
            log.info('show Detail order infomation');
            /* this.$refs.detail.showit(); */
            this.$router.push({path: '/detail', param: ''});
        }
    },
    components: {
        logo
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.list-wrapper
    .orderlist-wrapper
        .title
            height 24px
            line-height 24px
            text-align left
            padding 10px 5px 10px 5px
        .orderlist
            width 100%
            height 60px
            padding 5px
            display flex
            align-items center
            .time,.status
                display inline-block
            .time 
                flex-grow 1
                .time
                    color red
            .status
                flex-grow 1
                .status
                    color red
    .non-order
        .title
            line-height 24px
            font-size 24px
            padding 10px 5px
            text-align center

</style>
