<template>
    <div>
        <div class="main-wrapper">
            <logo></logo>
            <div class="goods">
                <div class="menu-wrapper" ref="menuWrapper">
                    <ul>
                        <li class="menu-item" ref="menuList" v-for="(item,index) in goods" :key="index" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                            <span class="text border-1px">
                                <span v-show="item.type>0" class="icon"></span>{{item.name}}
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="foods-wrapper" ref="foodsWrapper">
                    <ul>
                        <li class="food-list" ref="foodList" v-for="(item,index) in goods" :key="index">
                            <h1 class="title">{{item.name}}</h1>
                            <ul>
                                <li class="food-item border-1px" v-for="(food,index) in item.list" :key="index" @click="selectFood(food,$event)">
                                    <div class="icon">
                                        <img width="50" height="50" :src="food.imageUrl">
                                    </div>
                                    <div class="content">
                                        <h2 class="name">{{food.name}}</h2>
                                        <div class="price"  v-if="food.memberPrice!==0">
                                            <span class="desc">会员价格</span><span class="now">￥{{food.memberPrice}}</span>
                                        </div>
                                        <div class="price" v-if="false">
                                            <span class="desc">非会员价</span><span class="old">￥{{food.price}}</span>
                                        </div>
                                        <div class="cartcontrol-wrapper">
                                            <cartcontrol @add="addFood" :food="food"></cartcontrol>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <shopcart ref="shopcart"></shopcart>
            </div>
            <food @add="addFood" :food="selectedFood" ref="food"></food>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import logo from '../../components/logo';
import food from './food';
import shopcart from './shopcart';
import cartcontrol from './cartcontrol';
import { Loading } from 'vux';
import Logger from 'chivy';
const log = new Logger('page/menu/menu');
export default {
    data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedFood: {}
        };
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.commit('updateLoadingStatus', {isLoading: true});
        });
    },
    created() {
        log.debug('getCategorys');
        this.$store.dispatch('getCategorys').then((response) => {
            this.goods = this.$store.state.categorys;
            this.init();
            this.$store.commit('updateLoadingStatus', {isLoading: false});
        }).catch((error) => {
            log.debug(error);
            this.$store.commit('updateLoadingStatus', {isLoading: false});
        });
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    this._followScroll(i);
                    return i;
                }
            }
            return 0;
        },
        placeholder() {
            return placeholder;
        }
    },
    methods: {
        init() {
            this.$nextTick(() => {
                this._initScroll();
                this._calculateHeight();
            });
        },
        selectMenu(index) {
            let foodList = this.$refs.foodList;
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el, 300);
        },
        selectFood(food) {
            this.selectedFood = food;
            this.$refs.food.show();
        },
        addFood(target) {
            this._drop(target);
        },
        _drop(target) {
            // 体验优化,异步执行下落动画
            this.$nextTick(() => {
                this.$refs.shopcart.drop(target);
            });
        },
        _initScroll() {
            this.meunScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            });
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 3
            });
            this.foodsScroll.on('scroll', (pos) => {
                // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
                if (pos.y <= 0) {
                    this.scrollY = Math.abs(Math.round(pos.y));
                }
            });
        },
        _calculateHeight() {
            let foodList = this.$refs.foodList;
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        },
        _followScroll(index) {
            let menuList = this.$refs.menuList;
            let el = menuList[index];
            this.meunScroll.scrollToElement(el, 300, 0, -100);
        }
    },
    components: {
        food,
        shopcart,
        logo,
        cartcontrol,
        Loading
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'

.goods
    display: flex
    position: absolute
    top: 120px
    bottom: 99px
    width: 100%
    overflow: hidden
    .menu-wrapper
        flex: 0 0 80px
        width: 80px
        background: #f3f5f7
        .menu-item
            display: table
            height: 54px
            width: 56px
            padding: 0 12px
            line-height: 14px
            &.current
                position: relative
                z-index: 10
                margin-top: -1px
                background: #fff
                font-weight: 700
                .text
                    border-none()
            .icon
                display: inline-block
                vertical-align: top
                width: 12px
                height: 12px
                margin-right: 2px
                background-size: 12px 12px
                background-repeat: no-repeat
            .text
                display: table-cell
                width: 56px
                vertical-align: middle
                border-1px(rgba(7, 17, 27, 0.1))
                font-size: 12px
    .foods-wrapper
        flex: 1
        .title
            padding-left: 14px
            height: 26px
            line-height: 26px
            border-left: 2px solid #d9dde1
            font-size: 12px
            color: rgb(147, 153, 159)
            background: #f3f5f7
        .food-item
            display: flex
            margin: 18px
            padding-bottom: 18px
            border-1px(rgba(7, 17, 27, 0.1))
            &:last-child
                border-none()
                margin-bottom: 0
            .icon
                flex: 0 0 57px
                margin-right: 10px
            .content
                flex: 1
                .name
                    margin: 2px 0 8px 0
                    height: 14px
                    font-weight 700
                    line-height: 14px
                    font-size: 14px
                    color: rgb(7, 17, 27)
                .price
                    font-weight: 700
                    line-height: 24px
                    .now
                        margin-right: 8px
                        font-size: 12px
                        color: rgb(240, 20, 20)
                    .old
                        font-size: 12px
                        color: rgb(7, 17, 27)
                    .desc
                        font-size 10px
                        color: rgb(147, 153, 159)
                        font-weight 700
                        margin-right 2px
                .cartcontrol-wrapper
                    position: absolute
                    right: 0
                    bottom: 12px
</style>
