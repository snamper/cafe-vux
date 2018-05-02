<template>
    <transition name="move">
        <div class="common" v-if="content">
            <x-header :left-options="{showBack: true}" :title="content.title"><a slot="right" @click="save">保存</a></x-header>
            <group>
                <x-input :title="content.input" v-model="value" :type="type" :mask="mask" :min="min" :max="max" :is-type="istype" ref="input"></x-input>
            </group>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
import { expressType } from '../../common/js/consts';
import { isObjEmpty } from '../../common/js/util';
import { XHeader, XInput, Group } from 'vux';
import { mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('page/member/modify');
export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            log.debug('from ' + from.path);
            // 当不是从会员详情页跳转到本页,就跳转到member页
            if (from.path !== '/memberinfo') {
                vm.$router.push({name: 'member'});
            }
        });
    },
    data() {
        return {
            value: null,
            modifyData: null
        };
    },
    props: {
        content: {
            type: Object
        }
    },
    computed: {
        ...mapState([
            'memberInfo',
            'status'
        ]),
        type() {
            if (this.content.input === '邮箱') {
                return 'email';
            }
        },
        mask() {
            if (this.content.type === expressType.mobile) {
                return '999 9999 9999';
            }
        },
        min() {
            if (this.content.type === expressType.name) {
                return 2;
            }
        },
        max() {
            if (this.content.type === expressType.name) {
                return 20;
            }
        },
        istype() {
             if (this.content.type === expressType.email) {
                return 'email';
            }
        }
    },
    methods: {
        duplicate() {
            return new Promise((resolve, reject) => {
                if (this.content.type === expressType.email) {
                    // 保存之前需要检查邮箱是否被注册
                    let duplicate = {'email': this.value};
                    this.$store.dispatch('duplicate', duplicate).then(() => {
                        this.$vux.toast.text('你输入的email已被注册,请更换后重试', 'center');
                        this.$refs.input.reset();
                    }).catch((error) => {
                        log.error(error);
                        this.modifyData = {
                            type: expressType.email,
                            userId: this.memberInfo.id,
                            email: this.value
                        };
                        resolve();
                    });
                } else if (this.content.type === expressType.name) {
                    // 保存之前需要检查用户名是否被注册
                    let duplicate = {'name': this.value};
                    this.$store.dispatch('duplicate', duplicate).then(() => {
                        this.$vux.toast.text('你输入的用户名已被注册,请更换后重试', 'center');
                        this.$refs.input.reset();
                    }).catch((error) => {
                        log.error(error);
                        this.modifyData = {
                            type: expressType.name,
                            userId: this.memberInfo.id,
                            name: this.value
                        };
                        resolve();
                    });
                } else if (this.content.type === expressType.nick) {
                    this.modifyData = {
                        type: expressType.nick,
                        userId: this.memberInfo.id,
                        nick: this.value
                    };
                    resolve();
                } else if (this.content.type === expressType.detailAddress) {
                    this.modifyData = {
                        type: expressType.detailAddress,
                        userId: this.memberInfo.id,
                        detailAddress: this.value
                    };
                    resolve();
                }
            });
        },
        save() {
            /**
             * 当类型为email或者是name的时候,提交检查,如果检查通过了,再提交
             * 其他类型则直接提交
             */

            // 当输入框校验通过且数值不为空的时候,可以提交
            if (this.$refs.input.valid && !isObjEmpty(this.value)) {
                log.debug('the value is ' + this.value);
                this.duplicate().then(() => {
                    if (!isObjEmpty(this.modifyData)) {
                        this.submitData(this.modifyData);
                    } else {
                        this.$refs.input.reset();
                    }
                });
            } else {
                log.debug('input is nok');
                this.$vux.toast.text('您输入的内容不符合要求,请重试', 'middle');
            }
        },
        submitData(data) {
            this.$store.dispatch('modifyMemberInfo', data).then(() => {
                this.$vux.toast.text('修改成功', 'center');
                this.$store.commit('updateOneMemberInfo', data);
                this.$router.back();
            });
        }
    },
    components: {
        XHeader,
        XInput,
        Group
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.common
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
