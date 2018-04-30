<template>
    <div v-if="record">
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
import BScroll from 'better-scroll';
import list from '../../components/list';
import Logger from 'chivy';
const log = new Logger('page/record/detail');
export default {
    data() {
        return {
            size: 35,
            radius: 50,
            show: true
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
        }
    },
    components: {
        list
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
    top 82px
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
