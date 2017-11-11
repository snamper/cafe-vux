<template>
    <div>
        <div class="ordercart-wrapper">
            <div class="left">
                <span class="left-text">待支付</span><span class="price">￥{{totalPrice}}</span>
                <span class="right-text">会员价</span><span class="price">￥{{totalMemberPrice}}</span>
            </div>
            <div class="right">
                <h1 class="right-text">去支付</h1>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'totalPrice',
            'totalMemberPrice'
        ])
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.ordercart-wrapper
    position fixed
    bottom 50px
    width 100%
    height 50px
    display flex
    justify-content center
    align-items center
    .left,.right
        height 50px
        display flex
        align-items center
    .left
        flex-grow 2
        background rgb(60, 60, 60)
        .left-text,.right-text,.price
            font-size 18px
            color #fff
        .left-text
            padding-left 0.3rem
        .right-text
            margin-left 0.5rem
        .price 
            margin-left 0.3rem
    .right
        flex-grow 1
        padding 0 1rem
        background rgb(0, 215, 98)
        justify-content center
        font-size 20px
        color #fff
</style>
