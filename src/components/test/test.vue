<template>
    <div class="template-wrapper">
        <h1>Test</h1>
        <ul v-for="(product, i) in products" :key="i">
            <li>{{product.name}}</li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    computed: {
        products: function() {
            return this.$store.state.products;
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
