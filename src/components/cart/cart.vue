<template>
    <div class="cart-wrapper">
        <group></group>
        <cell title="Total" :value="total"></cell>
        
    </div>
</template>

<script type="text/ecmascript-6">
import { Badge, Cell, Group, Divider } from 'vux';
export default {
    components: {
        Badge,
        Cell,
        Group,
        Divider
    },
    computed: {
        total: function() {
            return '￥1024元';
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
