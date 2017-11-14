<template>
    <div>
        <div class="list-wrapper">
            <logo></logo>
            <ul>
                <li class="orderlist-wrapper" @click="showDetail()">
                    <div class="name">咖啡</div>
                    <div class="time">2017-11-14 15:12</div>
                    <div class="status">已完成</div>
                </li>
            </ul>
        </div>
        <detail ref="detail"></detail>
    </div>
</template>

<script type="text/ecmascript-6">
import logo from '../../components/logo/logo';
import detail from './detail/detail';
export default {
    methods: {
        showDetail() {
            this.$refs.detail.show();
        }
    },
    components: {
        logo,
        detail
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.orderlist-wrapper
    width 100%
    height 60px
    padding 5px
    display flex
    align-items center
    .name,.time,.status
        display inline-block
        line-height 60px
    .name
        flex-grow 1
        text-align left
        padding-left 0.5rem
    .time 
        flex-grow 1
    .status
        flex-grow 2
        text-align right
        padding-right 1rem
</style>
