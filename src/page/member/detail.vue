<template>
    <div class="detail">
        <x-header title="会员信息" :left-options="{showBack: true}"></x-header>
        <logo></logo>
        <div class="memberinfi">
            <div class="bar  vux-1px-tb">
                <cell title="会员信息" ></cell>
            </div>
            <div class="info">
                <div class="item-bar vux-1px-b">
                    <cell title="用户名" value="philosophy" is-link @click.native="modifyUsername"></cell>
                </div>
                <div class="item-bar vux-1px-b">
                    <cell title="手机号码" value="13333333333" is-link @click.native="modifyPhoneNumber"></cell>
                </div>
                <div class="item-bar vux-1px-b">
                    <popup-picker title="性别" :data="sexType" placeholder="男" v-model="sex" @on-hide="saveSex"></popup-picker>
                </div>
                <div class="item-bar vux-1px-b">
                    <cell title="邮箱" value="totti@xxx.com" is-link @click.native="modifyEmail"></cell>
                </div>
                <div class="item-bar vux-1px-b">
                    <cell title="加入时间" value="2018-01-08"></cell>
                </div>
                <spilt></spilt>
                <div class="item-bar vux-1px-b">
                    <cell title="会员积分" value="5000分"></cell>
                </div>
                <div class="item-bar vux-1px-b">
                    <cell title="余额" value="1500元"></cell>
                </div>
                <spilt></spilt>
                <div class="item-bar vux-1px-b">
                    <x-address title="所在地区" :list="addressData" v-model="address" @on-hide="modifyAddress" placeholder="四川省成都市成华区"></x-address>
                </div>
                <div class="item-bar vux-1px-b">
                    <cell title="详细地址"  value="蜀华街xx号" is-link @click.native="modifyDetailAddress"></cell>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
// ChinaAddressV4Data
import { XHeader, Cell, XAddress, Group, PopupPicker, ChinaAddressV4Data } from 'vux';
import spilt from '../../components/split/split';
import logo from '../../components/logo/logo';
import Logger from 'chivy';
const log = new Logger('cafe/member/detail');
export default {
    data() {
        return {
            content: null,
            sexType: [['男', '女']],
            sex: [],
            addressData: ChinaAddressV4Data,
            address: []
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            log.debug('from ' + from.path);
            if (!(from.path === '/member' || from.path === '/modify')) {
                vm.$router.back();
            }
        });
    },
    methods: {
        jumppage() {
            this.$router.push({name: 'modify', params: {content: this.content}});
        },
        modifyUsername() {
            log.debug('modifyUsername');
            this.content = {
                'title': '设置名字',
                'input': '名字'
            };
            this.jumppage();
        },
        modifyPhoneNumber() {
            log.debug('modifyPhoneNumber');
            this.content = {
                'title': '设置手机号',
                'input': '手机号'
            };
            this.jumppage();
        },
        modifyDetailAddress() {
            log.debug('modifyDetailAddress');
            this.content = {
                'title': '设置地址',
                'input': '详细地址'
            };
            this.jumppage();
        },
        modifyAddress() {
            log.debug('modifyAddress');
        },
        modifyEmail() {
            log.debug('modifyEmail');
            this.content = {
                'title': '设置邮箱',
                'input': '邮箱'
            };
            this.jumppage();
        },
        modifySex() {
            log.debug('modifySex');
        },
        saveSex() {
            log.debug('save sex' + this.sex);
        }
    },
    components: {
        XHeader,
        Cell,
        XAddress,
        Group,
        spilt,
        logo,
        PopupPicker
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
