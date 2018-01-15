<template>
    <div class="thumb">
        <blur :blur-amount=40 :url="background" height="120">
            <p class="center">
                <img :src="thumb">
            </p>
        </blur>
    </div>
</template>

<script type="text/ecmascript-6">
import { Blur } from 'vux';
export default {
    props: {
        background: {
            type: String
        },
        thumb: {
            type: String
        }
    },
    components: {
        Blur
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.thumb
    .center
        display flex
        justify-content center
        img
            margin 20px 0px
            width: 80px;
            height 80px;
            border-radius: 50%;
            border: 4px solid #ececec;
</style>
