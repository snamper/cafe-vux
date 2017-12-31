<template>
    <div>
        <div class="detail vux-1px-b">
            <div class="name">名称</div>
            <div class="number">数量</div>
            <div class="total">总价</div>
        </div>
        <div class="detail-wrapper" ref="detailWrapper">
          <ul>
            <li v-for="(good,index) in product.details" :key="index" class="vux-1px-b">
                <div class="detail">
                    <div class="avator">
                        <avator :img="good.imageUrl" size='35' radius='50'></avator>
                    </div>
                    <div class="content">
                        <div class="name">{{good.productName}}</div>
                        <div class="number">x{{good.number}}</div>
                        <div class="total">￥{{good.amount}}</div>
                    </div>
                </div>
            </li>
            <div class="totalprice">
                <div class="number">￥{{product.amount}}</div>
                <div class="total">实付</div>
            </div>
          </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Divider } from 'vux';
import avator from '../../components/avator/avator';
import BScroll from 'better-scroll';
import Logger from 'chivy';
const log = new Logger('page/orderlist/order');
export default {
    props: {
        product: {
            type: Object
        }
    },
    created() {
        log.error('is data fetched? ' + this.product !== null);
    },
    mounted() {
        this.scrollit();
    },
    methods: {
        scrollit() {
            if (this.product !== null) {
                if (this.product.details.length !== 0) {
                    log.debug('scroll show orderlist');
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            log.debug('created scroll');
                            this.scroll = new BScroll(this.$refs.detailWrapper, {
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
        avator,
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
.detail-wrapper
    position absolute
    width 100%
    top 120px
    bottom 20px
    // overflow hidden
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
