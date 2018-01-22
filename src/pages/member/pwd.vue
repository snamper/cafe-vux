<template>
    <div>
        <x-header :left-options="{showBack: true}" title="修改密码"></x-header>
        <logo></logo>
        <group>
            <x-input label-width="6em" text-align="left" title="旧密码"  :min="1" :max="20" type="password" :required="true" v-model='pwd.old' ref="old"></x-input>
            <x-input label-width="6em" text-align="left" title="新密码"  :min="1" :max="20" type="password" :required="true" v-model='pwd.new' ref="new"></x-input>
            <x-input label-width="6em" text-align="left" title="确认密码"  :min="1" :max="20" type="password" :required="true" v-model='pwd.confirm' ref="confirm" @on-enter="modify"></x-input>
            <x-button type="primary" @click.native="modify">修改</x-button>
        </group>
    </div>
</template>

<script type="text/ecmascript-6">
import logo from '../../components/logo';
import { md5, Group, XInput, XButton, XHeader } from 'vux';
import { mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('pages/member/pwd');
export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            log.debug('置空密码状态');
            // 置空密码状态
            vm.$store.commit('updateStatusOld', false);
            vm.$store.commit('updateStatusPwd', false);
            if (from.path !== '/member') {
                vm.$router.back();
            }
        });
    },
    data() {
        return {
            pwd: {
                old: '',
                new: '',
                confirm: ''
            }
        };
    },
    computed: {
        ...mapState([
            'status'
        ])
    },
    methods: {
        modify() {
            if (this.$refs.old.invalid) {
                this.$vux.toast.text('原密码不能为空', 'middle');
            } else if (this.$refs.new.invalid) {
                this.$vux.toast.text('新密码不能为空', 'middle');
            } else if (this.$refs.confirm.invalid) {
                this.$vux.toast.text('确认密码不能为空', 'middle');
            } else if (this.pwd.new !== this.pwd.confirm) {
                this.$vux.toast.text('两次输入的密码不一致,请检查', 'middle');
                this.$refs.new.reset();
                this.$refs.confirm.reset();
            } else {
                // 提交登陆,看看返回值是否成功确认原密码正确
                let data = {
                    name: this.$store.state.memberInfo.phone,
                    passWd: md5(this.pwd.old),
                    valid: true
                };
                this.$store.dispatch('login', data).then(() => {
                    let data = {
                        entityId: this.$store.state.memberInfo.id,
                        entityName: md5(this.pwd.new)
                    };
                    log.debug(JSON.stringify(data));
                    this.$store.dispatch('modifyPwd', data).then(() => {
                        this.$vux.toast.text('密码修改成功', 'middle');
                        this.$router.back();
                    }).catch((error) => {
                        log.error(error);
                        this.$vux.toast.text('密码修改失败, 请稍后再试', 'middle');
                        // 重置密码框
                        this.$refs.old.reset();
                        this.$refs.new.reset();
                        this.$refs.confirm.reset();
                    });
                }).catch((error) => {
                    log.error(error);
                    this.$vux.toast.text('原密码不正确,请重试', 'middle');
                    // 重置密码框
                    this.$refs.old.reset();
                });
            }
        }
    },
    components: {
        logo,
        Group,
        XInput,
        XButton,
        XHeader
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
