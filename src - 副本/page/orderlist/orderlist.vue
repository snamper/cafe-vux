<template>
    <div>
        <loading v-model="isLoading"></loading>
        <div class="list-wrapper">
            <logo></logo>
            <div class="orderlist-wrapper" v-if="recordList">
                <p class="title" v-if="!memberInfo">游客，您的最近订单如下</p>
                <p class="title" v-if="memberInfo">{{memberInfo.name}}，您的历史订单如下</p>
                <div class="scroll-wrapper" ref="scrollWrapper">
                    <ul>
                        <li @click="showDetailPage(item)" v-for="(item,index) in recordList" :key="index">                        
                            <split></split>
                            <div class="title">
                                <span class="orderNo">{{date(item.createTime)}}  {{time(item.createTime)}}</span>
                                <span class="status">{{orderStatus(item.status)}}</span>                                
                            </div>
                            <imagelist :list="item.details"></imagelist>
                            <div class="detail">
                                <span>共<span class="No">{{item.details.length}}</span>件商品，实付款: <span class="price">￥{{item.amount}}</span></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="non-order" v-if="member">
                <p class="title">亲，您还没有购买任何商品</p>
            </div>
        </div>
        <!-- <detail :list="selectedList" ref="detail"></detail> -->
        <!-- <food @add="addFood" :food="selectedFood" ref="food"></food> -->
    </div>
</template>

<script type="text/ecmascript-6">
import split from '../../components/split/split';
import BScroll from 'better-scroll';
import logo from '../../components/logo/logo';
import config from '../../config/config';
import util from '../../common/js/util';
import imagelist from './imageList';
import { mapState } from 'vuex';
import { Divider, Loading } from 'vux';
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
            recordList: null,
            selectedList: null,
            member: false
        };
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // 获取vux的实例
            vm.$store.commit('updateLoadingStatus', {isLoading: true});
            log.debug('显示loading');
            vm.init();
            log.debug('scroll');
            vm.$store.commit('updateLoadingStatus', {isLoading: false});
            log.debug('关闭loading显示');
        });
    },
    computed: {
        ...mapState([
            'memberInfo',
            'isLoading'
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
    methods: {
        date(datetime) {
            let format = util.formatDate(datetime);
            let result = format.Year + '-' + format.Month + '-' + format.Day;
            return result;
        },
        time(datetime) {
            let format = util.formatDate(datetime);
            let result = format.Hour + ':' + format.Minute;
            return result;
        },
        orderStatus(status) {
            // log.debug(status);
            if (status === 'WAITE4PAY') {
                return WAITE4PAY;
            } else if (status === 'WAITE4ENSURE') {
                return WAITE4ENSURE;
            } else if (status === 'ENSURE2PAID') {
                return ENSURE2PAID;
            } else if (status === 'SUCCESS') {
                return SUCCESS;
            }
        },
        scrollit() {
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
        init() {
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
            // let _this = this;
            let url = config.recordList;
            log.debug('ajax get response url is ' + url);
            this.$http.post(url, data).then((response) => {
                let result = response.data;
                // log.debug('response data is ' + JSON.stringify(result));
                this.loading = false;
                // 存入state中
                if (result.length !== 0) {
                    this.recordList = result;
                    this.$store.commit('setrecordList', result);
                    this.scrollit();
                } else {
                    log.debug('result length is 0');
                    this.member = true;
                    // this.$vux.alert.show({
                    //     title: '提醒',
                    //     content: '您还没有购买任何商品,请先购买',
                    //     onHide() {
                    //         _this.$store.commit('changeSelect', {'menu': true, 'new': false, 'order': false, 'member': false});
                    //         _this.$router.push({path: '/menu'});
                    //     }
                    // });
                }
            });
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
        },
        showDetailPage(order) {
            // log.debug('orderid is ' + order.id);
            this.$router.push({name: 'orderDetail', params: {record: order}});
        }
    },
    components: {
        logo,
        Divider,
        split,
        Loading,
        imagelist
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
            .title
                display flex
                justify-content center
                .orderNo
                    flex-grow 1
                    text-align left
                    padding-left 7px
                .status
                    flex-grow 1
                    text-align right
                    padding-right 7px
            .detail
                text-align right
                padding 10px 20px 5px 0px
                .price,.no
                    font-size 20px
                .price
                    font-weight 500
                    color red
                .No
                    font-weight 700
                    color black
                    padding 0 5px
    .non-order
        .title
            line-height 24px
            font-size 24px
            padding 10px 5px
            text-align center

</style>
