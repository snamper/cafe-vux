<template>
 <div class="desc">
    <div class="title">{{name}}</div>
    <div class="info">
      <span class="price">
        <span class="normal">￥{{price}}</span>
        <span class="member" v-if="memberPrice !== price">会员价:￥{{memberPrice}}</span>
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
        font-size 10px
      .member
        padding-left 5px
        font-size 10px
    .operation
      margin-left auto
      margin-right 5px
      display flex
      align-items center
</style>
