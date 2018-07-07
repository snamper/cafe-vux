<template>
  <div class="van-contact-card" :class="[`van-contact-card--${type}`, { 'van-contact-card--uneditable': !editable }]" @click="onClick">
    <div class="van-contact-card__content">
      <template v-if="type === 'add'">
        <van-icon class="van-contact-card__icon" name="add2" />
        <div class="van-contact-card__text">{{title}}</div>
      </template>
      <template v-else-if="type === 'edit'">
        <van-icon class="van-contact-card__icon" name="contact" />
        <div class="van-contact-card__text">
          <div>{{$t('addressCard.cotact')}}{{address.name}}</div>
          <div>{{$t('addressCard.tel')}}{{ address.tel}}</div>
          <div>{{$t('addressCard.address')}}{{address.address}}</div>
        </div>
      </template>
    </div>
    <van-icon v-if="editable" class="van-contact-card__arrow" name="arrow" />
  </div>
</template>

<script type="text/ecmascript=6">
import { Icon } from 'vant';
export default {
  data() {
    return {
    }
  },
  components: {
    [Icon.name]: Icon
  },
  props: {
    address: {
      type: Object,
      default: null
    },
    addText: {
      type: String
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    title() {
      return this.$tools.isNotEmpty(this.addText) ? this.addText : this.$t('addressCard.addContact');
    },
    type() {
      return this.$tools.isEmpty(this.address) ? 'add': 'edit';
    },
    detail() {
      return address.province + address.city + address.county + address.address;
    }
  },
  methods: {
    onClick(event) {
      if (this.editable) {
        this.$emit('addaddress', event);
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.van-contact-card
  position relative
  background-color #fff
  &:active
    background-color #e8e8e8
  &--uneditable
    &:active
      background-color #e8e8e8
  &--add
    line-height 40px
    .van-contact-card__icon
      width 40px
      color #38f
      font-size 40px
  &--edit
    .van-contact-card__icon
      font-size 18px
      vertical-align top
  &__content
    padding 15px 10px
  &__icon,&__text
    display inline-block
    vertical-align middle
  &__icon
    margin-right 10px
  &__text
    line-height 20px
    font-size 14px
  &__arrow
    top 50%
    right 10px
    font-size 12px
    position absolute
    color #666
    transform translate3d(0, -50%, 0)
  &::after
    content ' '
    display block
    width 100%
    height 2px
    background-image url('data:image/false;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAECAYAAAA3S5neAAAAAXNSR0IArs4c6QAAAIpJREFUOBHF0iESg1AMBNDshx4H0+EUSCxnQKBAVDIMjhnOgO8NOADTI7V/CcjU58ckq/aJQHTYto2u7bpdB3hjXWvb+Ry/jTC6e6CeQBIK6i3KJWfZbHsuDxiTeCCcc+m6SlGFhTnkHcty2J5y+lVM4NHv2D+vxxEkxsGiXHIIf99x95JJPIDcnhMVeyVty5S/SAAAAABJRU5ErkJggg==')
    background-size 34px 2px
</style>
