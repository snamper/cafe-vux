<template>
    <div class="menu-wrapper">
        <logo></logo>
        <divider>商品列表</divider>
        <div class="categorys" v-for="(category,key) in categorys" :key="key">
            <divider>{{key}}</divider>
            <div class="product" v-for="(product, index) in category" :key="index">
                <imgpanel :product='product'></imgpanel>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import ImgPanel from '../panel/imgpanel';
import Logo from '@/components/logo/logo';
import { Divider } from 'vux';
export default {
    props: {
        categorys: {
            type: Object
        }
    },
    components: {
        Divider,
        'imgpanel': ImgPanel,
        'logo': Logo
    },
    computed: {
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
