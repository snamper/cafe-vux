<template>
 <div class="desc">
    <div class="title">{{name}}</div>
    <div class="info">
      <span class="price">
        <span class="normal">￥{{price}}</span>
        <span class="member" v-if="memberPrice !== price">会员价:￥{{memberPrice}}</span>
      </span>
      <span class="opera">
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
@import '../../common/stylus/mixin.styl'
.desc
  .title,.info
    width 100%
  .title
    font-size 20px
    padding-left 10px
    margin 10px 0
  .info
    display flex
    justify-content space-between
    padding 5px
    margin 5px 0
    .price
      padding-left 10px
      .normal,.member
        price-color()
        font-size 18px
      .member
        margin-left 5px 
        font-size 18px
    .opera
      margin-left auto
      margin-right 20px
</style>
