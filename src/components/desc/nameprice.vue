<template>
 <div class="desc">
    <div class="title">{{name}}</div>
    <div class="info">
      <span class="price">
        <span class="normal" :style="{fontSize: fontSize + 'px'}">￥{{price}}</span>
        <span class="member" :style="{fontSize: fontSize + 'px'}" v-if="memberPrice !== price">{{$t('namePrice.memberPrice')}}{{memberPrice}}</span>
      </span>
      <span class="operation">
        <slot></slot>
      </span>
    </div>
 </div>
</template>

<script>
 export default {
  props: {
    name: {
      type: String
    },
    price: {
      type: Number,
      default: 0
    },
    memberPrice: {
      type: Number,
      default: 0
    },
    fontSize: {
      type: Number,
      default: 18
    }
  }
 };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../styles/mixin.styl'
.desc
  width 95%
  .title,.info
    display flex
    width 100%
    justify-content space-between
  .title
    font-size 16px
    padding 5px
  .info
    display flex
    justify-content space-between
    .price
      padding-left 5px
      line-height 32px
      .normal,.member
        price-color()
        /* font-size 18px */
      .member
        padding-left 5px
        /* font-size 18px */
    .operation
      margin-left auto
      margin-right 5px
      display flex
      align-items center
</style>
