<template>
  <div class="banner van-hairline--top-bottom" v-if="title">
    <div class="title">{{title}}</div>
    <div class="subtitle" v-if="subtitle">{{subtitle}}</div>
  </div>
</template>

<script type="text/ecmascript=6">
export default {
  props: {
    title: {
      type: String
    },
    subtitle: {
      type: String
    }

  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.banner
  display flex
  justify-content center
  flex-wrap wrap
  height 80px
  .title
    align-self center
    width 100%
    font-size 20px
    font-weight 900
    text-align center
    padding-bottom 5px
  .subtitle
    width 100%
    font-size 14px
    text-align center
</style>
