<template>
    <div class="thumb">
        <blur :blur-amount=40 :url="background" :height="height">
            <div class="center">
                <img :src="thumb">
                <p class="name">{{username}}</p>
            </div>
        </blur>
    </div>
</template>

<script type="text/ecmascript-6">
import { Blur } from 'vux';
export default {
    data() {
        return {
            height: 120
        };
    },
    props: {
        username: {
            type: String
        },
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
        text-align center
        padding-top 5px
        color #fff
        font-size 18px
        .name
            padding 3px 0
            font-size 18px
        img
            width: 80px;
            height 80px;
            border-radius: 50%;
            border: 4px solid #ececec;
</style>
