<template>
    <div>
        <div class="list-wrapper">
            <logo></logo>
            <div class="orderlist-wrapper" v-if="recordList">
                <p class="title">{{titleBar}}</p>
                <div class="scroll-wrapper" ref="scrollWrapper">
                    <ul>
                        <li @click="showDetailPage(item)" v-for="(item,index) in recordList" :key="index">                        
                            <split>{{item.createTime}}</split>
                            <div class="title">
                                <!-- <span class="orderNo">{{date(item.createTime)}}  {{time(item.createTime)}}</span> -->
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
            <div class="non-order" v-if="!recordList">
                <p class="title">亲，您还没有购买任何商品</p>
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
import { Divider } from 'vux';
import Logger from 'chivy';
const log = new Logger('page/record/records');
export default {
    data() {
        return {
            loading: false
        };
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // 获取vux的实例
            vm.init();
        });
    },
    computed: {
        ...mapState([
            'memberInfo',
            'UUID',
            'recordList'
        ]),
        titleBar() {
            if (this.memberInfo === null) {
                return '游客，您的最近订单如下';
            } else if (this.memberInfo.name !== '') {
                return this.memberInfo.name + ', 您的历史订单如下';
            } else {
                return this.memberInfo.phone + ', 您的历史订单如下';
            }
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
    methods: {
        init() {
            this.loading = true;
            let data = {
                userCode: null,
                needDetail: true
            };
            if (this.memberInfo === null) {
                data.userCode = this.UUID;
            } else {
                data.userCode = this.memberInfo.id;
            }
            log.debug(JSON.stringify(data));
            this.$store.dispatch('getRecordList', data).then(() => {
                if (this.recordList !== null) {
                    this.scrollit();
                } else {
                    // TODO
                    log.debug('返回到菜单页面');
                }
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
        showDetailPage(good) {
            log.debug('jump to record');
            this.$router.push({name: 'record', params: {record: good}});
        }
    },
    components: {
        logo,
        split,
        imagelist,
        Divider
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
