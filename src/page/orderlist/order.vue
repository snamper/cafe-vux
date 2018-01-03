<template>
    <div>
        <div class="detail vux-1px-b">
            <div class="name">名称</div>
            <div class="number">数量</div>
            <div class="total">总价</div>
        </div>
        <div class="listwrapper" ref="listwrapper">
            <list :list="product.details" size="35" radius="50" show="true"></list>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Divider } from 'vux';
import list from '../../components/list/list';
import BScroll from 'better-scroll';
import Logger from 'chivy';
const log = new Logger('page/orderlist/order');
export default {
    props: {
        product: {
            type: Object
        }
    },
    methods: {
        scrollit() {
            if (this.product !== null) {
                if (this.product.details.length !== 0) {
                    log.debug('scroll show orderlist');
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            log.debug('created scroll');
                            this.scroll = new BScroll(this.$refs.listwrapper, {
                                click: true
                        });
                        } else {
                            log.debug('refresh scroll');
                            this.scroll.refresh();
                        }
                    });
                }
            }
        }
    },
    components: {
        list,
        Divider
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
    top 125px
    bottom 20px
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
