<template>
    <div>
        <div class="ordercart-wrapper">
            <div class="left-wrapper" v-show="!member">
                <div class="left">
                    <span class="title">待支付</span><span class="price">￥{{totalPrice}}</span>
                </div>
                <div class="right">
                    <span class="title">会员价</span><span class="price">￥{{tottotalMemberPricealPrice}}</span>
                </div>
            </div>
            <div class="left-wrapper" v-show="member">
                <div class="left">
                    <span class="title">待支付</span><span class="price">￥{{totalMemberPrice}}</span>
                </div>
                <div class="right">
                    <group>
                        <x-switch title="余额扣款"></x-switch>
                    </group>
                    <!-- <span class="title">余额扣款</span><input type="checkbox" class="weui-switch"> -->
                </div>
            </div>
            <div class="right-wrapper">
                <h1 class="center">去支付</h1>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Cell, Group, XSwitch } from 'vux';
import { mapGetters } from 'vuex';
export default {
    props: {
        member: {
            type: Object
        }
    },
    data() {
        return {
            balancePay: true
        };
    },
    computed: {
        ...mapGetters([
            'totalPrice',
            'totalMemberPrice'
        ])
    },
    components: {
        Cell,
        Group,
        XSwitch
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.ordercart-wrapper
    position fixed
    bottom 50px
    width 100%
    height 44px
    display flex
    justify-content center
    align-items center
    background rgb(60, 60, 60)
    .left-wrapper
        flex-grow 3
        background rgb(60, 60, 60)
        height 44px
        display flex
        justify-content center
        align-items center
        .left
            flex-grow 1
            padding-left 0.5rem
            .title
                padding-right 0.5rem
        .right
            flex-grow 1
            .vux-no-group-title,.weui-cells
                margin 0px
                padding 0px
            .weui-cells
                .weui-cells
                    margin 0px
                    padding 0px
    .right-wrapper 
        flex-grow 1
        background rgb(0, 215, 98)
        height 50px
        display flex
        justify-content center
        align-items center
        .center
            color #fff
</style>
