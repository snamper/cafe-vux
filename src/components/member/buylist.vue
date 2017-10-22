<template>
    <div class="template-wrapper">
        <divider>2017年10月15日22时21分</divider>
        <group>
            <cell title="您购买的商品总价" :value="total"></cell>
            <cell-form-preview :list="cartLists"></cell-form-preview>
        </group>
    </div>
</template>

<script type="text/ecmascript-6">
import { CellFormPreview, Group, Cell, Divider } from 'vux';
import Logger from 'chivy';
const log = new Logger('cafe/member');
export default {
    props: {
        buy: {
            type: Object
        }
    },
    component: {
        CellFormPreview,
        Group,
        Cell,
        Divider
    },
    computed: {
        total: function() {
            log.debug('total price is ' + this.buy.amount);
            return '￥' + this.buy.amount + '元';
        },
        cartLists: function() {
            let cartLists = [];
            this.buy.details.forEach((product) => {
                let cartlist = {
                    label: product.name,
                    value: product.number + '个 X ' + product.productId + '元 = ' + product.number * product.productId + '元'
                };
                cartLists.push(cartlist);
            });
            return cartLists;
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
