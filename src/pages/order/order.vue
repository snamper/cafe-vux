<template>
    <div>
        <div class="order">
            <x-header title="" :left-options="{showBack: true, preventGoBack: true}" @on-click-back="back"></x-header>
            <thumbBar :background="background" :thumb="thumb"></thumbBar>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
// import BScroll from 'better-scroll';
import thumbBar from '../../components/thumbBar';
import { Divider, XHeader, Group, XSwitch } from 'vux';
// import { mapGetters, mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('page/order/order');
export default {
    data() {
        return {
            background: '../../../static/img/avator.jpg',
            thumb: '../../../static/img/wechat.jpg'
        };
    },
    methods: {
        back() {
            log.debug('back');
        }
    },
    components: {
        thumbBar,
        Divider,
        XHeader,
        Group,
        XSwitch
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
