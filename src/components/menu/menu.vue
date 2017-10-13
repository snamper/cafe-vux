<template>
    <div class="menu-wrapper">
        <divider>商品列表</divider>
        <div class="categorys" v-for="(category,key) in categorys" :key="key">
            <divider>{{key}}</divider>
            <div class="product" v-for="(product, index) in category" :key="index">
                <imgpanel :product='product'></imgpanel>
                <divider></divider>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import ImgPanel from '../panel/imgpanel';
import { Divider } from 'vux';
export default {
    props: {
        categorys: {
            type: Object
        }
    },
    components: {
        Divider,
        'imgpanel': ImgPanel
    },
    computed: {
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
