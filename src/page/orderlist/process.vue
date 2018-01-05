<template>
    <div>
        <flow orientation="vertical" style="height:250px;">
            <flow-state state="1" title="待付款" :is-done="status[0]"></flow-state>
            <flow-line :tip="tips[0]" :is-done="line[0]"></flow-line>
            <flow-state state="2" title="已付款" :is-done="status[1]"></flow-state>
            <flow-line :tip="tips[1]" :is-done="line[1]"></flow-line>
            <flow-state state="3" title="已确认" :is-done="status[2]"></flow-state>
            <flow-line :tip="tips[2]" :is-done="line[2]"></flow-line>
            <flow-state state="4" title="成功" :is-done="status[3]"></flow-state>
        </flow>
        <div class="confirm" v-if="show">
             <x-button type="primary" @click.native="payit">我要付款</x-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Flow, FlowState, FlowLine, XButton } from 'vux';
export default {
    props: {
        product: {
            type: Object
        }
    },
    computed: {
        show() {
            if (this.product.status === 'WAITE4PAY') {
                return true;
            } else if (this.product.status === 'WAITE4ENSURE') {
                return true;
            } else if (this.product.status === 'ENSURE2PAID') {
                return false;
            } else if (this.product.status === 'SUCCESS') {
                return false;
            }
        },
        status() {
            if (this.product.status === 'WAITE4PAY') {
                return [true, false, false, false];
            } else if (this.product.status === 'WAITE4ENSURE') {
                return [true, true, false, false];
            } else if (this.product.status === 'ENSURE2PAID') {
                return [true, true, true, false];
            } else if (this.product.status === 'SUCCESS') {
                return [true, true, true, true];
            }
        },
        line() {
            if (this.product.status === 'WAITE4PAY') {
                return [false, false, false];
            } else if (this.product.status === 'WAITE4ENSURE') {
                return [true, false, false];
            } else if (this.product.status === 'ENSURE2PAID') {
                return [true, true, false];
            } else if (this.product.status === 'SUCCESS') {
                return [true, true, true];
            }
        },
        tips() {
            if (this.product.status === 'WAITE4PAY') {
                return ['进行中', '', ''];
            } else if (this.product.status === 'WAITE4ENSURE') {
                return ['', '进行中', ''];
            } else if (this.product.status === 'ENSURE2PAID') {
                return ['', '', '进行中'];
            } else if (this.product.status === 'SUCCESS') {
                return ['', '', ''];
            }
        }
    },
    methods: {
        payit() {
            this.$router.push({name: 'pay', params: {product: this.product}});
        }
    },
    components: {
        Flow,
        FlowState,
        FlowLine,
        XButton
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.flow
    height: 100%
.confirm
    width 100%
    display flex
    justify-content center
    margin 10px 0
    .weui-btn
        margin 0 10%
</style>
