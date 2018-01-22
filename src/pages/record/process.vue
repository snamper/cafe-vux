<template>
    <div>
        <flow orientation="vertical" style="height:250px;">
            <flow-state state="1" title="待付款" :is-done="isDoneStatus[0]"></flow-state>
            <flow-line :tip="tips[0]" :is-done="line[0]"></flow-line>
            <flow-state state="2" title="已付款" :is-done="isDoneStatus[1]"></flow-state>
            <flow-line :tip="tips[1]" :is-done="line[1]"></flow-line>
            <flow-state state="3" title="已确认" :is-done="isDoneStatus[2]"></flow-state>
            <flow-line :tip="tips[2]" :is-done="line[2]"></flow-line>
            <flow-state state="4" title="成功" :is-done="isDoneStatus[3]"></flow-state>
        </flow>
        <div class="confirm" v-if="show.flag">
             <x-button type="primary" @click.native="payit">{{show.title}}</x-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Flow, FlowState, FlowLine, XButton } from 'vux';
import { exchangeType } from '../../common/js/values';
import Logger from 'chivy';
const log = new Logger('page/record/process');
const pay = '我要付款';
const alert = '提醒卖家';
export default {
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
            if (this.record.status === exchangeType.WAIT4PAY.key) {
                result.flag = true;
                result.title = pay;
            } else if (this.record.status === exchangeType.WAIT4CONFIRM.key) {
                result.flag = true;
                result.title = alert;
            } else if (this.record.status === exchangeType.CONFIRM2PAID.key) {
                result.flag = false;
            } else if (this.record.status === exchangeType.SUCCESS.key) {
                result.flag = false;
            }
            return result;
        },
        isDoneStatus() {
            if (this.record.status === exchangeType.WAIT4PAY.key) {
                return [true, false, false, false];
            } else if (this.record.status === exchangeType.WAIT4CONFIRM.key) {
                return [true, true, false, false];
            } else if (this.record.status === exchangeType.CONFIRM2PAID.key) {
                return [true, true, true, false];
            } else if (this.record.status === exchangeType.SUCCESS.key) {
                return [true, true, true, true];
            }
        },
        line() {
            if (this.record.status === exchangeType.WAIT4PAY.key) {
                return [false, false, false];
            } else if (this.record.status === exchangeType.WAIT4CONFIRM.key) {
                return [true, false, false];
            } else if (this.record.status === exchangeType.CONFIRM2PAID.key) {
                return [true, true, false];
            } else if (this.record.status === exchangeType.SUCCESS.key) {
                return [true, true, true];
            }
        },
        tips() {
            if (this.record.status === exchangeType.WAIT4PAY.key) {
                return ['进行中', '', ''];
            } else if (this.record.status === exchangeType.WAIT4CONFIRM.key) {
                return ['', '进行中', ''];
            } else if (this.record.status === exchangeType.CONFIRM2PAID.key) {
                return ['', '', '进行中'];
            } else if (this.record.status === exchangeType.SUCCESS.key) {
                return ['', '', ''];
            }
        }
    },
    methods: {
        payit() {
            let _this = this;
            if (this.show.title === alert) {
                let data = {
                    entityId: this.record.id,
                    status: exchangeType.CONFIRM2PAID.key
                };
                this.$store.dispatch('alertStatus', data).then(() => {
                    this.$vux.alert.show({
                        title: '付款提醒',
                        content: '已提醒店家，店家会尽快确认付款信息',
                        onHide() {
                            // 变更状态为已付款状态
                            _this.record.status = exchangeType.CONFIRM2PAID.key;
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
