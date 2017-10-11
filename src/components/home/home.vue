<template>
    <div class="home-wrapper">
        <Split></Split>
        <div class="title-wrapper">
            <h1 class="title">店家推荐</h1>
        </div>
        <Split></Split>
        <div class="swiper-container" v-if="sliders.length>0">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(product,index) in sliders" :key="index">
                    <div class="image-wrapper">
                        <img class="silder" :src="product.imageSliderUrl">
                    </div>
                    <div class="detail-wrapper">
                        <span class="name">{{product.name}}</span><span class="price">￥{{product.price}}</span>
                    </div>
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>

            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>

            <!-- 如果需要滚动条 -->
            <div class="swiper-scrollbar"></div>
        </div>
        <Split></Split>
        <div class="hot-wrapper">
            <h1 class="title">热销产品</h1>
        </div>
        <Split></Split>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
        <p>ttttttttt</p>
    </div>
</template>

<script>
import Swiper from 'swiper';
import Split from '../split/split';
export default {
    props: {
        categorys: {
            type: Object
        }
    },
    computed: {
        /* 根据Category来计算silders的内容 */
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
            console.log(sliders);
            return sliders;
        }
    },
    mounted: function() {
        this.reflashSwiper();
    },
    methods: {
        reflashSwiper: function() {
            /* eslint-disable no-new */
            new Swiper('.swiper-container', {
                initialSlide: 0,
                observer: true,
                observeParents: true,
                pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                width: window.innerWidth,
                paginationClickable: true,
                autoplay: 5000,
                loop: true,
                slidesPerView: 1
            });
        }
    },
    components: {
        Split
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/css/swiper.min.css';
.home-wrapper
    position relative
    top 0
    left 0
    bottom 50px
    overflow hidden 
    .title-wrapper
        .title
            font-size 24px
            font-weight 700
            text-align center
            padding 5px 0
            color #20A0FF
            background-color #fff
            // border 10px solid #EEEEEE
            // margin-top 1px
    .swiper-container
        padding-top 5px
        .swiper-wrapper
            .swiper-slide
                .image-wrapper
                    .silder 
                        width: 100%
                        height: auto
                .detail-wrapper
                    display flex
                    justify-content space-between
                    width 100%
                    height 24px
                    vertical-align top
                    .name,.price
                        display inline-block
                        font-size 14px
                        font-weight 700
                        line-height 18px
                        padding 5px 0
                    .price
                        color red
    .hot-wrapper
        .title
            font-size 24px
            font-weight 700
            text-align center
            padding 5px 0
            color #20A0FF
            background-color #fff
</style>
