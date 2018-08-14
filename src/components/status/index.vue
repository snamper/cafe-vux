<template>
  <div class="van-steps van-steps--horizontal van-hairline--bottom">
    <div class="van-steps__icon" v-if="icon || $slots.icon">
      <slot name="icon">
        <van-icon name="clear" />
      </slot>
    </div>
    <div class="van-steps__message">
      <div class="van-steps__title" v-text="title" />
      <div class="van-steps__desc van-ellipsis" v-text="description" />
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Icon } from 'vant';
export default {
  name: 'Status',
  components: {
    [Icon.name]: Icon
  },
  props: {
    icon: String,
    title: String,
    active: Number,
    iconClass: String,
    description: String
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.van-steps
  overflow hidden
  background-color #fff
  &--horizontal
    padding 0 10px
  &__icon
    float left
    margin-top 15px
    margin-right 10px
  .van-icon
    font-size 40px
  &__message
    height 40px
    margin 15px 0
  &__title
    font-size 14px
    color #333
    padding-top 4px
  &__desc
    font-size 12px
    line-height 1.5
    color #999
</style>
