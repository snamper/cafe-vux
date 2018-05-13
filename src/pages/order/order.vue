<template>
    <div>
        <div class="order">
            <x-header title="" :left-options="{showBack: true, preventGoBack: true}" @on-click-back="back">确认订单</x-header>
            <!--
            <thumbBar :background="images.background" :thumb="images.avator" :username="username"></thumbBar>
            
            <divider>确认订单</divider>-->
            <div class="listwrapper" ref="listwrapper" style="margin-top:15px;">
                <div class="" style="margin-left:40px;height:30px;">
                    <p style="float:left;margin-right:20px;">收货人:</p><p style="float:left;">{{ receiver }}</p><p style="float:right;padding-right:40px;">{{deliveryMobile}}</p>
                </div>
                <div class="" style="margin-left:40px;">
                    <p style="float:left;margin-right:20px;font-size:14px;">收货地址: {{ deliveryLocation }}</p>
                </div>
                <div style="clear:both"/>
            </div>
            
            <div style="width:100%;height: 10px;margin-top:15px;margin-bottom:15px; background:transparent url(http://img.alicdn.com/tfs/TB1OVRCRpXXXXaMXFXXXXXXXXXX-237-106.png) repeat-x scroll -15px -100px;">
            </div>
            <div class="listwrapper" ref="listwrapper">
                <list :goods="selectFoods" :size="list.size" :radius="list.radius"></list>
            </div>
            <ordercart></ordercart>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import thumbBar from '../../components/thumbBar';
import { Divider, XHeader, Group, XSwitch } from 'vux';
import ordercart from './orderCart';
import list from './../../components/list';
import { mapGetters, mapState } from 'vuex';
import { images } from '../../common/js/consts';
import Logger from 'chivy';
const log = new Logger('page/order/order');
export default {
    data() {
        return {
            list: {
                size: 50,
                radius: 20
            }
        };
    },
    computed: {
        ...mapGetters([
            'selectFoods'
        ]),
        ...mapState([
            'currentUser'
        ]),
        images() {
            return images;
        },
        // 显示游客或者显示昵称或者显示电话号码(唯一标识符)
        username() {
            if (this.currentUser.memberInfo === null) {
                return '游客';
            } else if (this.currentUser.memberInfo.name !== '' || this.currentUser.memberInfo.name !== null) {
                return this.currentUser.memberInfo.name;
            } else {
                return this.currentUser.memberInfo.phone;
            }
        },
        receiver() {
            return '游客';
        },
        deliveryMobile() {
            return '18011237645';
        },
        deliveryLocation() {
            return '北京市老城区第三胡同987号人民小区4-2-13-4';
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 如果选中的商品为0,则返回到menu页面
            if (vm.$store.getters.selectFoods.length === 0) {
                vm.$router.push({name: 'menu'});
            }
        });
    },
    mounted() {
        if (this.selectFoods.length > 0) {
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.listwrapper, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            });
        }
    },
    methods: {
        back() {
            this.$router.push({path: '/menu'});
            log.debug('back');
        }
    },
    components: {
        thumbBar,
        Divider,
        XHeader,
        Group,
        ordercart,
        XSwitch,
        list
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
