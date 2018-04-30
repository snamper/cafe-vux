<template>
    <div>
        <flow orientation="vertical" style="height:250px;" v-if="condition.pay">
            <flow-state state="1" title="待付款" is-done=true></flow-state>
            <flow-line :tip="tips" :is-done="false"></flow-line>
            <flow-state state="2" title="已付款" :is-done="isDoneStatus[1]"></flow-state>
        </flow>
        <flow orientation="vertical" style="height:250px;" v-if="condition.close">
            <flow-state state="1" title="待付款" is-done=true></flow-state>
            <flow-line :tip="tips" :is-done="false"></flow-line>
            <flow-state state="2" title="已关闭" :is-done="isDoneStatus[1]"></flow-state>
        </flow>
        <flow orientation="vertical" style="height:250px;" v-if="condition.refund">
            <flow-state state="1" title="待付款" is-done=true></flow-state>
            <flow-line :tip="tips" :is-done="false"></flow-line>
            <flow-state state="2" title="已付款" :is-done="isDoneStatus[1]"></flow-state>
            <flow-line :tip="tips[0]" :is-done="line[0]"></flow-line>
            <flow-state state="2" title="已退款" :is-done="isDoneStatus[1]"></flow-state>
        </flow>
        <div class="confirm" v-if="show.flag">
             <x-button type="primary" @click.native="payit">{{show.title}}</x-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Flow, FlowState, FlowLine, XButton } from 'vux';
import { payStatus } from '../../common/js/consts';
import Logger from 'chivy';
const log = new Logger('page/record/process');
const pay = '我要付款';
export default {
    data() {
        return {
            tips: '进行中',
            condition: {
                pay: true,
                close: false,
                refund: false
            },
            show: {
                pay: {
                    isdone: true,
                    tips: '进行中',
                    line: false
                }
            }
        };
    },
    props: {
        record: {
            type: Object
        }
    },
    computed: {
        show() {
            let result = {
                flag: false,
                title: ''
            };
            if (this.record.status === payStatus.NOTPAY.key) {
                result.flag = true;
                result.title = pay;
            } else if (this.record.status === payStatus.SUCCESS.key) {
                result.flag = false;
            }
            return result;
        },
        isDoneStatus() {
            if (this.record.status === payStatus.NOTPAY.key) {
                return [true, false];
            } else if (this.record.status === payStatus.SUCCESS.key) {
                return [true, true];
            }
        },
        line() {
            if (this.record.status === payStatus.NOTPAY.key) {
                return [false, false];
            } else if (this.record.status === payStatus.SUCCESS.key) {
                return [true, true];
            }
        },
        tips() {
            if (this.record.status === payStatus.NOTPAY.key) {
                return ['进行中', ''];
            } else if (this.record.status === payStatus.SUCCESS.key) {
                return ['', ''];
            }
        }
    },
    methods: {
        payit() {
            let _this = this;
            if (this.show.title === alert) {
                let data = {
                    entityId: this.record.id,
                    status: payStatus.NOTPAY.key
                };
                this.$store.dispatch('alertStatus', data).then(() => {
                    this.$vux.alert.show({
                        title: '付款提醒',
                        content: '已提醒店家，店家会尽快确认付款信息',
                        onHide() {
                            // 变更状态为已付款状态
                            _this.record.status = payStatus.NOTPAY.key;
                        }
                    });
                }).catch((error) => {
                    log.error(error);
                });
            } else if (this.show.title === pay) {
                this.$router.push({name: 'pay', params: {record: this.record}});
            }
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