<template>
    <div>
        <div class="list-wrapper">
            <logo></logo>
            <div class="orderlist-wrapper" v-if="recordList">
                <p class="title" v-if="!memberInfo">游客，您的本次订单如下</p>
                <p class="title" v-if="memberInfo">{{memberInfo.name}}，您的历史订单如下</p>
                <div class="scroll-wrapper" ref="scrollWrapper">
                    <ul>
                        <li v-for="(item,index) in recordList" :key="index">
                            <div class="time">
                                购买日期：
                                <span class="time">{{buyDateTime(item.createTime)}}</span>
                                订单状态：
                                <span class="status">{{showStatus(item.status)}}</span>
                            </div>
                            <divider>详情</divider>
                            <ul>
                                <li v-for="(good,index) in item.details" :key="index">
                                    <div class="detail">
                                        <div class="avator">
                                            <avator :img="good.imageUrl" size='35' radius='50'></avator>
                                        </div>
                                        <div class="content">
                                            <div class="name">{{good.productName}}</div>
                                            <div class="number">x{{good.number}}</div>
                                            <div class="total">￥{{good.amount}}</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="summary">
                                <div class="title">总价</div><div class="price">￥{{item.amount}}</div>
                            </div>
                            <split></split>
                        </li>
                    </ul>
                </div>
                
            </div>
            <div class="non-order" v-if="!showList">
                <p class="title">亲，您还没有购买任何商品</p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import split from '../../components/split/split';
import BScroll from 'better-scroll';
import logo from '../../components/logo/logo';
import config from '../../config/config';
import util from '../../common/js/util';
import { mapState } from 'vuex';
import { Divider } from 'vux';
import avator from '../../components/avator/avator';
import Logger from 'chivy';
const log = new Logger('page/orderlist');
const WAITE4PAY = '待付款';
const WAITE4ENSURE = '已付款';
const ENSURE2PAID = '已确认';
const SUCCESS = '成功';
export default {
    data() {
        return {
            loading: false,
            recordList: null
        };
    },
    created() {
        this.__init();
    },
    mounted() {
        log.info('mounted');
        log.info('recordList is ' + JSON.stringify(this.recordList));
        if (this.recordList !== null) {
            if (this.recordList.length !== 0) {
                log.debug('scroll show orderListShow');
                this.$nextTick(() => {
                    if (!this.scroll) {
                        log.debug('created scroll');
                        this.scroll = new BScroll(this.$refs.scrollWrapper, {
                            click: true
                        });
                    } else {
                        log.debug('refresh scroll');
                        this.scroll.refresh();
                    }
                });
            }
        }
    },
    computed: {
        ...mapState([
            'memberInfo'
        ]),
        showList() {
            if (this.recordList || this.memberRecordList) {
                return true;
            } else {
                return false;
            }
        },
        totalPrice() {
            let total = 0;
            this.recordList.detail.forEach((good) => {
                total = total + good.count * good.price;
            });
            return total;
        }
    },
    watch: {
        '$route': '__init'
    },
    methods: {
        async __init() {
            this.loading = true;
            // 获取购买记录并存入列表,区分会员和非会员
            log.debug('memberinfo is ' + this.memberInfo);
            if (!this.memberInfo) {
                // 非会员
                log.debug('uuid is ' + this.$store.state.uuid);
                this.getVisitorRecordList(this.$store.state.uuid);
            } else {
                // 会员
                log.debug('member id is ' + this.memberInfo.ID);
                this.getMemberRecordList(this.memberInfo.ID);
            }
        },
        showDetail() {
            log.info('show Detail order infomation');
            this.$refs.detail.showit();
        },
        getVisitorRecordList(userid) {
            let data = {
                'userCode': userid,
                'needDetail': true
            };
            this.saveRecordList(data);
        },
        getMemberRecordList(userid) {
            let data = {
                'userId': userid,
                'needDetail': true
            };
            this.saveRecordList(data);
        },
        saveRecordList(data) {
            let url = config.recordList;
            log.debug('ajax get response url is ' + url);
            this.$http.post(url, data).then((response) => {
                let result = response.data;
                log.debug('response data is ' + JSON.stringify(result));
                this.loading = false;
                // 存入state中
                if (result.length !== 0) {
                    this.recordList = result;
                    this.$store.commit('setrecordList', result);
                }
            });
        },
        buyDateTime(date) {
            let format = util.formatDate(date);
            let result = format.Year + '' + format.Month + '' + format.Day + ' ' + format.Hour + ':' + format.Minute;
            return result;
        },
        showStatus(status) {
            let result = status;
            if (status === 'WAITE4PAY') {
                result = WAITE4PAY;
            } else if (status === 'WAITE4ENSURE') {
                result = WAITE4ENSURE;
            } else if (status === 'ENSURE2PAID') {
                result = ENSURE2PAID;
            } else if (status === 'SUCCESS') {
                result = SUCCESS;
            }
            return result;
        }
    },
    components: {
        logo,
        avator,
        Divider,
        split
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.list-wrapper
    .orderlist-wrapper
        .title
            height 24px
            line-height 24px
            text-align left
            padding 10px 5px 10px 5px
        .scroll-wrapper
            position absolute
            width 100%
            top 164px
            bottom 50px
            overflow hidden
            .time
                padding 0.3rem 0
            .detail
                width 100%
                height 70px
                display flex
                justify-content center
                align-items center
                .avator, .content
                    display inline-block
                .avator
                    flex-grow 1
                    text-align center
                .content 
                    flex-grow 3
                    display flex
                    .name, .number,.total
                        display inline-block
                        width 100%
                    .name
                        text-align left
                    .number
                        text-align right
                    .total
                        text-align center
            .summary
                width 100%
                height 2rem
                display flex
                justify-content center
                align-items center
                .title,.price
                    width 100%
                    line-height 18px
                .title
                    text-align left
                    padding-left 3rem 
                .price
                    text-align right
                    padding-right 2rem
    .non-order
        .title
            line-height 24px
            font-size 24px
            padding 10px 5px
            text-align center

</style>
