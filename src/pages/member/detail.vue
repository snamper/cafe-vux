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
                    <cell title="昵称" :value="memberInfo.nick ? memberInfo.nick : empty" is-link @click.native="modifyNickname"></cell>
                </div>
                <div class="item-bar vux-1px-b">
                    <cell title="用户名" :value="memberInfo.name ? memberInfo.name : empty" :is-link="linkType.name" @click.native="modifyUsername"></cell>
                </div>
                <div class="item-bar vux-1px-b">
                    <cell title="手机号码" :value="memberInfo.phone"></cell>
                </div>
                <div class="item-bar vux-1px-b">
                    <popup-picker title="性别" :data="sexType" :placeholder="memberSex ? memberSex : empty" v-model="sex" @on-hide="saveSex"></popup-picker>
                </div>
                <div class="item-bar vux-1px-b">
                    <cell title="邮箱" :value="memberInfo.email ? memberInfo.email:empty" :is-link="linkType.email" @click.native="modifyEmail"></cell>
                </div>
                <div class="item-bar vux-1px-b">
                    <cell title="加入时间" :value="memberInfo.createTime"></cell>
                </div>
                <spilt></spilt>
                <div class="item-bar vux-1px-b">
                    <cell title="会员积分" :value="`${memberInfo.point ? memberInfo.point : 0}分`"></cell>
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
import { consts } from '../../common/js/consts';
import { gender } from '../../common/js/util';
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
        },
        linkType() {
            let result = {
                email: false,
                name: false
            };
            if (!this.memberInfo.email) {
                result.email = true;
            }
            if (!this.memberInfo.name) {
                result.name = true;
            }
            return result;
        }
    },
    methods: {
        jumppage() {
            this.$router.push({name: 'modify', params: {content: this.content}});
        },
        modifyNickname() {
            log.debug('modifyUsername');
            this.content = {
                type: consts.expressType.nick,
                title: '设置昵称',
                input: '昵称'
            };
            this.jumppage();
        },
        modifyUsername() {
            log.debug('modifyUsername');
            /**
             * 当link标签存在的时候才能跳转
             */
            if (this.linkType.name) {
                this.content = {
                    type: consts.expressType.name,
                    title: '设置用户名',
                    input: '用户名'
                };
                this.jumppage();
            }
        },
        modifyPhoneNumber() {
            log.debug('modifyPhoneNumber');
            this.content = {
                type: consts.expressType.phone,
                title: '设置手机号',
                input: '手机号'
            };
            this.jumppage();
        },
        modifyDetailAddress() {
            log.debug('modifyDetailAddress');
            this.content = {
                type: consts.expressType.detailAddress,
                title: '设置地址',
                input: '详细地址'
            };
            this.jumppage();
        },
        modifyEmail() {
            log.debug('modifyEmail');
            if (this.linkType.email) {
                this.content = {
                    type: consts.expressType.email,
                    title: '设置邮箱',
                    input: '邮箱'
                };
                this.jumppage();
            }
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
                gender: gender(this.sex[0])
            };
            log.debug(data.gender);
            this.submitData(data);
        },
        // 提交数据到服务端,用vuex方式处理数据
        submitData(data) {
            this.$store.dispatch('modifyMemberInfo', data).then(() => {
                this.$vux.toast.text('修改成功', 'center');
                this.$store.commit('updateOneMemberInfo', data);
            }).catch((error) => {
                log.error(error);
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
