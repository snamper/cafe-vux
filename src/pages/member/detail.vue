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
                    <cell title="昵称" :value="memberInfo.name ? memberInfo.name : empty" is-link @click.native="modifyUsername"></cell>
                </div>
                <div class="item-bar vux-1px-b">
                    <cell title="手机号码" :value="memberInfo.phone" is-link @click.native="modifyPhoneNumber"></cell>
                </div>
                <div class="item-bar vux-1px-b">
                    <popup-picker title="性别" :data="sexType" :placeholder="memberSex ? memberSex : empty" v-model="sex" @on-hide="saveSex"></popup-picker>
                </div>
                <div class="item-bar vux-1px-b">
                    <cell title="邮箱" :value="memberInfo.email ? memberInfo.email:empty" is-link @click.native="modifyEmail"></cell>
                </div>
                <div class="item-bar vux-1px-b">
                    <cell title="加入时间" :value="memberInfo.createTime"></cell>
                </div>
                <spilt></spilt>
                <div class="item-bar vux-1px-b">
                    <cell title="会员积分" :value="`${memberInfo.point}分`"></cell>
                </div>
                <div class="item-bar vux-1px-b">
                    <cell title="余额" :value="`${memberInfo.balance}元`"></cell>
                </div>
                <spilt></spilt>
                <div class="item-bar vux-1px-b">
                    <x-address title="所在地区" :list="addressData" v-model="address" @on-hide="modifyAddress" :placeholder="memberInfo.area ? memberInfo.area : empty"></x-address>
                </div>
                <div class="item-bar vux-1px-b">
                    <cell title="详细地址"  :value="memberInfo.address ? memberInfo.address:empty" is-link @click.native="modifyDetailAddress"></cell>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Cell, XAddress, Group, PopupPicker, ChinaAddressV4Data, Value2nameFilter as value2name } from 'vux';
import spilt from '../../components/split';
import logo from '../../components/logo';
import { mapState } from 'vuex';
import { type } from '../../common/js/values';
import Logger from 'chivy';
const log = new Logger('pages/member/detail');
export default {
    data() {
        return {
            content: null,
            sexType: [['男', '女']],
            sex: [],
            addressData: ChinaAddressV4Data,
            address: [],
            empty: '未填写'
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            log.debug('from ' + from.path);
            // 当不是从会员页跳转到本页或者不是从信息修改页跳转到本页,就跳转到member页
            if (!(from.path === '/member' || from.path === '/modify')) {
                vm.$router.push({name: 'member'});
            }
        });
    },
    computed: {
        ...mapState([
            'memberInfo',
            'status'
        ]),
        memberSex() {
            return this.memberInfo.gender;
        }
    },
    methods: {
        jumppage() {
            this.$router.push({name: 'modify', params: {content: this.content}});
        },
        modifyUsername() {
            log.debug('modifyUsername');
            this.content = {
                type: type.name,
                title: '设置名字',
                input: '名字'
            };
            this.jumppage();
        },
        modifyPhoneNumber() {
            log.debug('modifyPhoneNumber');
            this.content = {
                type: type.phone,
                title: '设置手机号',
                input: '手机号'
            };
            this.jumppage();
        },
        modifyDetailAddress() {
            log.debug('modifyDetailAddress');
            this.content = {
                type: type.detailAddress,
                title: '设置地址',
                input: '详细地址'
            };
            this.jumppage();
        },
        modifyEmail() {
            log.debug('modifyEmail');
            this.content = {
                type: type.email,
                title: '设置邮箱',
                input: '邮箱'
            };
            this.jumppage();
        },
        modifyAddress() {
            log.debug('modifyAddress');
            let result = value2name(this.address, ChinaAddressV4Data);
            log.debug('adress is modified to ' + result);
            let data = {
                type: type.address,
                userId: this.memberInfo.id,
                address: result
            };
            this.submitData(data);
        },
        saveSex() {
            log.debug('save sex ' + this.sex);
            let data = {
                type: type.gender,
                userId: this.memberInfo.id,
                gender: this.sex[0]
            };
            this.submitData(data);
        },
        // 提交数据到服务端,用vuex方式处理数据
        submitData(data) {
            this.$store.dispatch('modifyMemberInfo', data).then(() => {
                if (this.status.info) {
                    this.$vux.toast.text('修改成功', 'center');
                    this.$store.commit('updateOneMemberInfo', data);
                    // 重置状态避免问题
                    this.$store.commit('updateStatusInfo', false);
                }
            });
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
