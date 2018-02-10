<template>
    <div>
        <loading v-model="isLoading"></loading>
        <div class="list-wrapper">
            <logo></logo>
            <div class="orderlist-wrapper" v-if="records">
                <p class="title">{{titleBar}}</p>
                <div class="scroll-wrapper" ref="scrollWrapper">
                    <ul>
                        <li @click="showDetailPage(record)" v-for="(record,index) in records" :key="index">                        
                            <split></split>
                            <div class="title">
                                <span class="time">{{date(record.createTime)}} {{time(record.createTime)}}</span>
                                <span class="status">{{orderStatus(record.status)}}</span>                                
                            </div>
                            <imagelist :list="record.details"></imagelist>
                            <div class="detail">
                                <span>共<span class="No">{{record.details.length}}</span>件商品，实付款: <span class="price">￥{{record.amount}}</span></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { formatDate, covertStatus } from '../../common/js/util';
import BScroll from 'better-scroll';
import split from '../../components/split';
import logo from '../../components/logo';
import imagelist from '../../components/img';
import { mapState } from 'vuex';
import { Divider, Loading } from 'vux';
import Logger from 'chivy';
const log = new Logger('page/record/records');
export default {
    data() {
        return {
        };
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.commit('updateLoadingStatus', {isLoading: true});
            // 获取vux的实例
            vm.init();
        });
    },
    computed: {
        ...mapState([
            'memberInfo',
            'UUID',
            'records',
            'isLoading'
        ]),
        titleBar() {
            if (this.memberInfo === null) {
                return '游客，您的最近订单如下';
            } else if (this.memberInfo.name !== '') {
                return this.memberInfo.name + ', 您的历史订单如下';
            } else {
                return this.memberInfo.phone + ', 您的历史订单如下';
            }
        }
    },
    methods: {
        // 查询是否有订单,如果没有则跳转到menu页面
        // 如果有订单,则滚动显示
        init() {
            // let _this = this;
            let data = {
                userId: null,
                needDetail: true
            };
            if (this.memberInfo === null) {
                data.userCode = this.UUID;
            } else {
                data.userId = this.memberInfo.id;
            }
            log.debug(JSON.stringify(data));
            this.$store.dispatch('getRecordList', data).then(() => {
                this.scrollit();
                // 获取到数据后取消等待显示
                this.$store.commit('updateLoadingStatus', {isLoading: false});
            }).catch((error) => {
                // 获取到数据后取消等待显示
                this.$store.commit('updateLoadingStatus', {isLoading: false});
                log.error(error);
                this.$vux.toast.show({
                    text: '您还没有购买东西,请先购买',
                    position: 'middle',
                    time: 2000,
                    type: 'text'
                });
                setTimeout(() => {
                    console.log(this);
                    this.$router.push({name: 'menu'});
                }, 2300);
            });
        },
        scrollit() {
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.scrollWrapper, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            });
        },
        orderStatus(status) {
            return covertStatus(status);
        },
        // 显示订单详情页,路由传递单个订单的信息
        showDetailPage(record) {
            log.debug('jump to record');
            log.debug(record.id);
            // 传递单个订单的信息
            this.$router.push({name: 'record', params: {record: record}});
        },
        date(datetime) {
            log.debug('datetime is ' + datetime);
            let format = formatDate(datetime);
            let result = format.Year + '-' + format.Month + '-' + format.Day;
            return result;
        },
        time(datetime) {
            let format = formatDate(datetime);
            let result = format.Hour + ':' + format.Minute;
            return result;
        }
    },
    components: {
        logo,
        split,
        imagelist,
        Divider,
        Loading
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
