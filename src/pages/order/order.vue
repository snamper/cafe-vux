<template>
    <div>
        <div class="order">
            <x-header title="" :left-options="{showBack: true, preventGoBack: true}" @on-click-back="back"></x-header>
            <thumbBar :background="images.background" :thumb="images.avator" :username="username"></thumbBar>
            <divider>您的订单</divider>
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
            'memberInfo',
            'images'
        ]),
        // 显示游客或者显示昵称或者显示电话号码(唯一标识符)
        username() {
            if (this.memberInfo === null) {
                return '游客';
            } else if (this.memberInfo.name !== '' || this.memberInfo.name !== null) {
                return this.memberInfo.name;
            } else {
                return this.memberInfo.phone;
            }
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
