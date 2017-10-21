<template>
    <div class="menu-wrapper" v-if="categorys">
        <logo></logo>
        <divider>商品列表</divider>
        <div class="categorys" v-for="(category,key) in categorys" :key="key">
            <divider>{{key}}</divider>
            <div class="product" v-for="(product, index) in category" :key="index">
                <imgpanel :product="product"></imgpanel>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import ImgPanel from '../panel/imgpanel';
import Logo from '@/components/logo/logo';
import { Divider } from 'vux';
export default {
    components: {
        Divider,
        'imgpanel': ImgPanel,
        'logo': Logo
    },
    computed: {
        categorys: function() {
            return this.$store.state.categorys;
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
