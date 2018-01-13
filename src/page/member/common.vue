<template>
    <transition name="move">
        <div class="common">
            <x-header :left-options="{showBack: true}" :title="content.title"><a slot="right" @click="save">保存</a></x-header>
            <group>
                <x-input :title="content.input" v-model="value" :type="type" :mask="mask" :min="min" :max="max" :is-type="istype" ref="input"></x-input>
            </group>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
import { XHeader, XInput, Group } from 'vux';
import { mapState } from 'vuex';
import config from '../../config/config';
import Logger from 'chivy';
const log = new Logger('cafe/member/common');
export default {
    data() {
        return {
            value: null
        };
    },
    props: {
        content: {
            type: Object
        }
    },
    computed: {
        ...mapState([
            'memberInfo'
        ]),
        type() {
            if (this.content.type === config.type.phone) {
                return 'tel';
            } else if (this.content.input === '邮箱') {
                return 'email';
            }
        },
        mask() {
            if (this.content.type === config.type.phone) {
                return '999 9999 9999';
            }
        },
        min() {
            if (this.content.type === config.type.name) {
                return 2;
            }
        },
        max() {
            if (this.content.type === config.type.name) {
                return 20;
            }
        },
        istype() {
            if (this.content.type === config.type.phone) {
                return 'china-mobile';
            } else if (this.content.type === config.type.email) {
                return 'email';
            }
        }
    },
    methods: {
        save() {
            log.debug('save');
            if (this.$refs.input.valid) {
                log.debug('the value is ' + this.value);
                let data = {};
                if (this.content.type === config.type.phone) {
                    data = {
                        'type': config.type.phone,
                        'userId': this.memberInfo.id,
                        'mobile': this.value
                    };
                } else if (this.content.type === config.type.email) {
                    data = {
                        'type': config.type.email,
                        'userId': this.memberInfo.id,
                        'email': this.value
                    };
                } else if (this.content.type === config.type.name) {
                    data = {
                        'type': config.type.name,
                        'userId': this.memberInfo.id,
                        'name': this.value
                    };
                } else if (this.content.type === config.type.detailAddress) {
                    data = {
                        'type': config.type.detailAddress,
                        'userId': this.memberInfo.id,
                        'detailAddress': this.value
                    };
                }
                this.submitData(data);
            } else {
                log.debug('input is nok');
                this.$vux.toast.text('您输入的内容不符合要求,请重试', 'middle');
            }
        },
        submitData(data) {
            log.debug('submit data is ' + JSON.stringify(data));
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
