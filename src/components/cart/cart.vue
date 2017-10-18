<template>
    <div class="cart-wrapper">
        <div class="cartlist-wrapper">
            <cartlist></cartlist>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import CartList from '@/components/cart/cartlist';
export default {
    components: {
        'cartlist': CartList
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
