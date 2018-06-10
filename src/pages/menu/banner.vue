<template>
  <div class="banner van-hairline--bottom">
    <div class="content">{{banner.name}}</div>
    <div class="price">
      <span class="wrapper">
        价格:<span class="normal">￥{{banner.price}}</span>
      </span>
      <span class="wrapper">
        会员价:<span class="member">￥{{banner.memberPrice}}</span>
      </span>

    </div>
  </div>
</template>

<script type="text/ecmascript=6">
export default {
  props: {
    banner: {
      type: Object
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.banner
  background-color rgb(255, 255, 255)
  .content
    font-size 18px
    padding 5px 0px 5px 10px
  .price
    padding 10px 0px 10px 5px
    .wrapper
      font-size 20px
    .wrapper
      .normal,.member
        price-color()
      .member
        margin-left 5px
</style>
