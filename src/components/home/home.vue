<template>
    <div class="home-wrapper">
        <h1>home</h1>
        <div class="swiper-wrapper">
            <swiper :list="slidersList" auto loop style="width:100%;height:auto;" dots-class="custom-bottom" dots-position="center"></swiper>
        </div>
        <div class="hot-wrapper"></div>
    </div>
</template>

<script>
import { Swiper } from 'vux';
export default {
    props: {
        categorys: {
            type: Object
        }
    },
    computed: {
        /* calcation the silder arry from categorys */
        sliders: function() {
            // console.log(this.categorys === null);
            let sliders = [];
            for (let category in this.categorys) {
                // console.log(category);
                // console.log(this.categorys[category]);
                this.categorys[category].forEach((product) => {
                    // console.log(product.name);
                    // console.log(product.slider);
                    if (product.slider) {
                        sliders.push(product);
                    }
                });
            }
            // console.log(sliders);
            return sliders;
        },
        slidersList: function() {
            const imgList = [
                'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
                'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
                'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
            ];
            const demoList = imgList.map((one, index) => ({
                url: 'javascript:',
                img: one
            }));

            /* let list = this.silders.map((product, index) => ({
                url: 'http://m.baidu.com',
                img: product.imageSliderUrl,
                fallbackImg: product.imageSliderUrl,
                title: `(可点击)${product.name}`
            })); */
            console.log(demoList);
            return demoList;
        }
    },
    methods: {
    },
    components: {
        Swiper
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
