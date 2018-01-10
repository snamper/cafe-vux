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
        type() {
            if (this.content.input === '手机号') {
                return 'tel';
            } else if (this.content.input === '邮箱') {
                return 'email';
            }
        },
        mask() {
            if (this.content.input === '手机号') {
                return '999 9999 9999';
            }
        },
        min() {
            if (this.content.input === '名字') {
                return 2;
            }
        },
        max() {
            if (this.content.input === '名字') {
                return 20;
            }
        },
        istype() {
            if (this.content.input === '手机号') {
                return 'china-mobile';
            } else if (this.content.input === '邮箱') {
                return 'email';
            }
        }
    },
    methods: {
        save() {
            log.debug('save');
            if (this.$refs.input.valid) {
                log.debug('input is ok');
            } else {
                log.debug('input is nok');
            }
            // if (this.content.input === '手机号') {
            //     let reg = '^(?=\\d{11}$)^1(?:3\\d|4[57]|5[^4\\D]|66|7[^249\\D]|8\\d|9[89])\\d{8}$';
            //     var re = new RegExp(reg);
            //     if (re.test(this.value.replace(/\s/g, ''))) {
            //         log.debug('phone number is correct');
            //     } else {
            //         this.$vux.toast.text('请输入正确的手机号码', 'middle');
            //         this.value = '';
            //     }
            // } else if (this.content.input === '邮箱') {

            // }
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
