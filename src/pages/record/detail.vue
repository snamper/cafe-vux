<template>
    <div v-if="record">
        <div class="status">
            <div class="title">订单状态：<span class="name">{{status}}</span></div>
            <div class="button" v-if="showPay">
                <x-button type="primary" :mini="true" @click.native="payit">我要付款</x-button>
            </div>
        </div>
        <div class="detail vux-1px-b">
            <div class="name">名称</div>
            <div class="number">数量</div>
            <div class="total">总价</div>
        </div>
        <div class="listwrapper" ref="listWrapper">
            <list :goods="record.details" :size="size" :radius="radius" show="show"></list>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { XButton } from 'vux';
import BScroll from 'better-scroll';
import list from '../../components/list';
import { payStatus } from '../../common/js/consts';
import Logger from 'chivy';
const log = new Logger('page/record/detail');
export default {
    data() {
        return {
            size: 35,
            radius: 50,
            show: true,
            showPay: false
        };
    },
    props: {
        record: {
            type: Object
        }
    },
    methods: {
        scrollit() {
            log.debug('start scroll');
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.listWrapper, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            });
        },
        payit() {
            this.$router.push({name: 'pay'});
        }
    },
    computed: {
        status() {
            if (this.record.status === payStatus.NOTPAY.key) {
                this.showPay = true;
                return payStatus.NOTPAY.value;
            } else if (this.record.status === payStatus.SUCCESS.key) {
                return payStatus.SUCCESS.value;
            } else if (this.record.status === payStatus.REFUND.key) {
                return payStatus.REFUND.value;
            } else if (this.record.status === payStatus.CLOSED.key) {
                return payStatus.CLOSED.value;
            } else if (this.record.status === payStatus.PAYERROR.key) {
                this.showPay = true;
                return payStatus.PAYERROR.value;
            }
        }
    },
    components: {
        list,
        XButton
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.status
    padding 5px 0px
    .title
        display inline-block
        padding 10px 0px 10px 25px
        .name
            color red
    .button
        display inline-block
        float right
        padding 10px 5px 0px 0px
.detail
    padding 10px 0px
    display flex
    .name,.number,.total
        display inline-block
    .name
        flex-grow 8
        text-align center
    .number,.total
        flex-grow 1
.listwrapper
    position absolute
    width 100%
    top 120px
    bottom 5px
    overflow hidden
    .detail
        width 100%
        height 40px
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
    .totalprice
        display flex
        flex-direction row-reverse
        height 40px
        .number
            margin 0 10px
        .number,.total
            font-size 16px
            padding 12px 10px
</style>
