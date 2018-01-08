<template>
    <transition name="move">
        <div class="detail" v-show="showFlag">
            <x-header title="会员信息" :left-options="{showBack: true, preventGoBack: true}" @on-click-back="hidden()"></x-header>
            <div class="memberinfi">
                <div class="bar  vux-1px-tb">
                    <cell title="会员信息" ></cell>
                </div>
                <div class="info">
                    <div class="item-bar vux-1px-b">
                        <cell title="用户名" value="philosophy" is-link @click.native="modifyUsername"></cell>
                    </div>
                    <div class="item-bar vux-1px-b">
                        <cell title="会员积分" value="5000分"></cell>
                    </div>
                    <div class="item-bar vux-1px-b">
                        <cell title="余额" value="1500元"></cell>
                    </div>
                    <div class="item-bar vux-1px-b">
                        <cell title="手机号码" value="13333333333" is-link @click.native="modifyPhoneNumber"></cell>
                    </div>
                    <div class="item-bar vux-1px-b">
                        <cell title="性别" value="男" is-link @click.native="modifySex"></cell>
                    </div>
                    <div class="item-bar vux-1px-b">
                        <cell title="地址" value="四川省成都市成华区" is-link @click.native="modifyAddress"></cell>
                    </div>
                    <div class="item-bar vux-1px-b">
                        <cell title="邮箱" value="totti@xxx.com" is-link @click.native="modifyEmail"></cell>
                    </div>
                    <div class="item-bar vux-1px-b">
                        <cell title="加入时间" value="2018-01-08" is-link @click.native="modifyEmail"></cell>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
// ChinaAddressV4Data
import { XHeader, Cell, XAddress, Group } from 'vux';
import Logger from 'chivy';
const log = new Logger('cafe/member/detail');
export default {
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
        show() {
            this.showFlag = true;
        },
        hidden() {
            this.showFlag = false;
        },
        modifyUsername() {
            log.debug('modifyUsername');
        },
        modifyPhoneNumber() {
            log.debug('modifyPhoneNumber');
        },
        modifyAddress() {
            log.debug('modifyAddress');
        },
        modifyEmail() {
            log.debug('modifyEmail');
        },
        modifySex() {
            log.debug('modifySex');
        }
    },
    components: {
        XHeader,
        Cell,
        XAddress,
        Group
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.detail
    position  fixed
    left: 0
    top: 0
    bottom: 50px
    z-index: 30
    width: 100%
    background: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
</style>
