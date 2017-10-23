<template>
    <div class="template-wrapper">
        <divider>购买日期:{{datetime}}, {{status}}</divider>
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
    components: {
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
                    label: product.productName,
                    value: product.number + '个 X ' + product.price + '元 = ' + product.number * product.price + '元'
                };
                cartLists.push(cartlist);
            });
            return cartLists;
        },
        datetime: function() {
            log.debug('time is ' + this.buy.createTime);
            let format = this.formatDate(this.buy.createTime);
            let result = format.Year + '-' + format.Month + '-' + format.Day + ' ' + format.Hour + ':' + format.Minute;
            log.debug('buylist time is ' + result);
            return result;
        },
        status: function() {
            log.debug('the buy record status is ' + this.buy.status);
            if (this.buy.status === 'success') {
                return '状态:已购买';
            } else if (this.buy.status === 'waitpay') {
                return '状态:待付款';
            } else if (this.buy.status === 'paid') {
                return '状态:已付款';
            } else {
                return '';
            }
        }
    },
    methods: {
        formatDate: function(date) {
            var datetime = new Date(date);
            var format = {
                'Year': 1900 + datetime.getYear(),
                'Month': (datetime.getMonth() + 1),
                'Day': datetime.getDate(),
                'Hour': datetime.getHours(),
                'Minute': datetime.getMinutes(),
                'Second': datetime.getSeconds()
            };
            return format;
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
