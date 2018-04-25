<template>
    <div>
        <div class="image" ref="image">
            <ul class="imageheader" ref="imageHeader">
                <li class="imagelist" v-for="(product,index) in list" :key="index" ref="imagelist">
                    <avator :img="product.imageUrl"  :size='size' :radius='radius'></avator>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import avator from './avator';
export default {
    data() {
        return {
            size: 50,
            radius: 0
        };
    },
    props: {
        list: {
            type: Array
        }
    },
    mounted() {
        // 横向滚动
        let width = 0;
        for (let i = 0; i < this.list.length; i++) {
            width += this.$refs.imagelist[0].getBoundingClientRect().width;
        }
        this.$refs.imageHeader.style.width = width + 'px';
        this.$nextTick(() => {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.image, {
                    startX: 0,
                    click: true,
                    scrollX: true,
                    scrollY: false,
                    eventPassthrough: 'vertical'
                });
            } else {
                this.scroll.refresh();
            }
        });
    },
    computed: {
        placeholder() {
            return placeholder;
        }
    },
    components: {
        avator
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.image
    width 100%
    overflow hidden
    padding 10px
    height 50px
    .imageheader
        height 60px
    .imagelist
        display inline-block
        height 60px
        line-height 60px
        padding 0 5px
</style>
