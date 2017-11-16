<template>
    <div>
        <div class="ordercart-wrapper">
            <div class="left-wrapper" v-show="!memberInfo">
                <div class="left">
                    <span class="title">待支付</span><span class="price">￥{{totalPrice}}</span>
                </div>
                <div class="right">
                    <span class="title">会员价</span><span class="price">￥{{totalMemberPrice}}</span>
                </div>
            </div>
            <div class="left-wrapper" v-show="memberInfo">
                <div class="left">
                    <span class="title">待支付</span><span class="price">￥{{totalMemberPrice}}</span>
                </div>
                <div class="right">
                    <!-- <group>
                        <x-switch title="余额扣款"></x-switch>
                    </group> -->
                    <span class="title">余额扣款</span><input type="checkbox" class="weui-switch" v-model="select">
                </div>
            </div>
            <div class="right-wrapper">
                <h1 class="center" @click="pay">去支付</h1>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Cell, Group, XSwitch, Toast } from 'vux';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            balancePay: true,
            select: false
        };
    },
    computed: {
        ...mapGetters([
            'totalPrice',
            'totalMemberPrice'
        ]),
        memberInfo() {
            return this.$store.state.memberInfo;
        }
    },
    methods: {
        pay() {
            if (this.select) {
                if (this.memberInfo.balance >= this.totalMemberPrice) {
                    this.$store.commit('cashOrBalance', 'balance');
                    this.$router.push({path: '/pay'});
                } else {
                    this.$vux.toast.text('余额不足，请重新选择支付方式', 'middle');
                    this.select = false;
                }
            } else {
                this.$store.commit('cashOrBalance', 'cash');
                this.$router.push({path: '/pay'});
            }
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
