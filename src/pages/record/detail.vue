<template>
    <div>
        <div class="detail vux-1px-b">
            <div class="name">名称</div>
            <div class="number">数量</div>
            <div class="total">总价</div>
        </div>
        <div class="listwrapper" ref="listwrapper">
            <list :list="product.details" size="35" radius="50" show="show"></list>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
