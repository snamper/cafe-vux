<template>
    <div>
        <ul>
            <li :class="{line: !show, recordlist: show}" class="border-1px" v-for="(food, index) in goods" :key="index">
                <flexbox align="center" :gutter="2" wrap="nowrap" justify="center">
                    <flexbox-item :span="2">
                        <div class="thumb">
                            <avator :img="food.imageUrl!==''?food.imageUrl:placeholder.size50" :size="size" :radius="radius"></avator>
                        </div>
                    </flexbox-item>                    
                    <flexbox-item :span="6">
                        <div class="title" v-if="food.name">{{food.name}}</div>
                        <div class="title" v-if="food.productName">{{food.productName}}</div>
                    </flexbox-item>
                    <flexbox-item :span="1">
                        <div class="number" v-if="food.count">x{{food.count}}</div>
                        <div class="number" v-if="food.number">x{{food.number}}</div>
                    </flexbox-item>
                    <flexbox-item :span="2">
                        <div class="price" v-if="food.count">￥{{food.count*food.price}}</div>
                        <div class="price" v-if="food.number">￥{{food.number*food.price}}</div>
                    </flexbox-item>
                </flexbox>
            </li>
            <div class="total vux-1px-t"  v-if="show">
                <flexbox justify="center" :gutter="2">
                    <flexbox-item :span="7">实付</flexbox-item>
                    <flexbox-item :span="1">
                        <div class="number">x{{totalCount}}</div>
                    </flexbox-item>
                    <flexbox-item :span="1">
                        <div class="price">￥{{totalPrice}}</div>
                    </flexbox-item>
                </flexbox>
            </div>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
import avator from './avator';
import { Flexbox, FlexboxItem } from 'vux';
import { placeholder } from '../common/js/values';
import Logger from 'chivy';
const log = new Logger('components/list');
export default {
    props: {
        goods: {
            type: Array
        },
        size: {
            type: Number
        },
        radius: {
            type: Number
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        totalCount() {
            let totalCount = 0;
            // log.debug(JSON.stringify(this.goods));
            this.goods.forEach((food) => {
                if (food.count) {
                    totalCount = totalCount + food.count;
                } else if (food.number) {
                    totalCount = totalCount + food.number;
                }
            });
            log.debug('totalCount is ' + totalCount);
            return totalCount;
        },
        totalPrice() {
            let totalPrice = 0;
            this.goods.forEach((food) => {
                if (food.count) {
                    totalPrice = totalPrice + food.count * food.price;
                } else if (food.number) {
                     totalPrice = totalPrice + food.number * food.price;
                }
            });
            return totalPrice;
        },
        placeholder() {
            return placeholder;
        }
    },
    components: {
        Flexbox,
        FlexboxItem,
        avator
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .recordlist
        padding 7px 0
    .total
        padding 10px 0
    .line
        padding 2px 0
        .total
            padding 10px 0
</style>
