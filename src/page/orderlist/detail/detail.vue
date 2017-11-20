<template>
    <div class="detail-wrapper">
        <x-header title="订单详情" :left-options="{preventGoBack: true}" @on-click-back="back"></x-header>
        <logo></logo>
        <div class="order-wrapper">
            <ul>
                <li class="order-list border-1px">
                    <div class="avator">
                        <img src="../../../../static/img/avator.jpg" width="35px" height="35px">
                    </div>
                    <div class="content">
                        <div class="name">咖啡</div>
                        <div class="number">x1</div>
                        <div class="total">￥38</div>
                    </div>
                </li>
                <div class="normalshow">
                    <div class="memberprice-wrapper">
                        <div class="title">总价</div><div class="price">￥38</div>
                    </div>
                </div>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import logo from '../../../components/logo/logo';
import { XHeader } from 'vux';
import Logger from 'chivy';
const log = new Logger('page/orderlist/detail');
export default {
    created() {
        if (!this.recordList || !this.memberRecordList) {
             this.$router.push({path: '/orderlist'});
        }
    },
    methods: {
        back() {
            log.info('back to detaillist page');
            // 返回列表页
            this.$router.push({path: '/orderlist'});
        }
    },
    components: {
        logo,
        XHeader
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.detail-wrapper
    position fixed
    top 0px
    left 0px
    bottom 50px
    z-index 500
    width 100%
    .order-wrapper
        position fixed
        width 100%
        top 182px
        bottom 50px
        overflow: hidden
        .order-list
            width 100%
            height 70px
            display flex
            justify-content center
            align-items center
            .avator, .content
                display inline-block
            .avator
                flex-grow 1
                text-align center
            .content 
                flex-grow 3
                display flex
                .name, .number,.total
                    display inline-block
                    width 100%
                .name
                    text-align left
                .number
                    text-align right
                .total
                    text-align center
        .totalprice-wrapper,.memberprice-wrapper
            width 100%
            height 2rem
            display flex
            justify-content center
            align-items center
            .title,.price
                width 100%
                line-height 18px
            .title
                text-align left
                padding-left 3rem 
            .price
                text-align right
                padding-right 1.7rem
</style>