<template>
    <div>
        <div class="login-wrapper">
            <div class="avator">
                <img src="../../../../static/img/avator.jpg" width="70px" height="70px">
            </div>
            <div class="text">
                <h1>登陆/注册</h1>
            </div>
        </div>
        <div class="order-wrapper">
            <divider>您的订单</divider>
            <ul>
                <li class="order-list">
                    <div class="avator">
                         <img src="../../../../static/img/avator.jpg" width="35px" height="35px">
                    </div>
                    <div class="content">
                        <div class="name">咖啡</div>
                        <div class="number">x2</div>
                        <div class="totalprice">￥46</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Divider } from 'vux';
export default {
    components: {
        Divider
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
        img
            border-radius:50%;
    .text
        flex-grow 4
        display inline-block
        font-size 1.3rem
.order-wrapper
    .order-list
        width 100%
        height 70px
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
            text-align right
            .name, .number,.totalprice
                display inline-block
                border 1px solid black
                width 100%
            .name
                text-align left
                margin-right 0.5rem
            .number
                margin-right 0.2rem
            .totalprice
                margin-right 0.3rem
            
</style>
