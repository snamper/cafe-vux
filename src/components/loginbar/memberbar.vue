<template>
    <div class="member-wrapper" v-show="memberInfo">
        <div class="avator">
            <avator img="../../../../static/img/avator.jpg" size='70' radius='50'></avator>
        </div>
        <div class="text">
            <div class="name">用户: {{memberInfo.name}}</div>
            <div class="balance">余额: ￥{{memberInfo.balance}}元</div>
            <div class="bonuspoint">积分: {{memberInfo.ID}}</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import avator from '../avator/avator';
export default {
    props: {
        image: {
            type: String
        },
        memberInfo: {
        }
    },
    methods: {
        loginPage() {
            this.$router.push({path: '/login'});
        }
    },
    components: {
        avator
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.member-wrapper
    width 100%
    height 100px
    display flex
    justify-content center
    align-items center
    background-color rgb(238, 234, 232)
    .avator
        flex-grow 1
        display inline-block
        text-align center
    .text
        flex-grow 4
        display inline-block
        .name,.balance,.bonuspoint
            font-size 14px
            line-height 20px
</style>
