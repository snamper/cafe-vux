<template>
    <div class="login-wrapper">
        <div class="avator">
            <avator :img="image" size='70' radius='50'></avator>
        </div>
        <div class="text" @click="loginPage">
            <h1 >登陆/注册</h1>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import avator from '../avator/avator';
export default {
    props: {
        image: {
            type: String
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
.login-wrapper
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
        font-size 24px
</style>
