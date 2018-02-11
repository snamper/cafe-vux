<template>
    <div>
        <div class="ordercart-wrapper">
            <div class="left-wrapper">
                <div class="left" v-show="!memberInfo">
                    <span class="title">待支付</span><span class="price">￥{{totalAttr.normal}}</span>
                </div>
                <div class="right" v-if="totalAttr.member!==0">
                    <span class="title">会员价</span><span class="price">￥{{totalAttr.member}}</span>
                </div>
            </div>
            <div class="right-wrapper" @click="pay">
                <h1 class="center">去支付</h1>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Cell, Group, XSwitch, Toast } from 'vux';
import { mapGetters, mapState } from 'vuex';
export default {
    data() {
        return {
            balancePay: true,
            select: false
        };
    },
    computed: {
        ...mapGetters([
            'totalAttr'
        ]),
        ...mapState([
            'memberInfo'
        ])
    },
    methods: {
        pay() {
            this.$router.push({path: '/pay'});
        }
    },
    components: {
        Cell,
        Group,
        XSwitch,
        Toast
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
    background rgb(60, 60, 60)
    .left-wrapper
        flex-grow 3
        background rgb(60, 60, 60)
        height 50px
        display flex
        justify-content center
        align-items center
        .left
            flex-grow 1
            padding-left 0.5rem
            color #fff
            .title
                padding-right 0.5rem
        .right
            flex-grow 1
            padding-left 0.5rem
            color #fff
            .title
                padding-right 1rem
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
