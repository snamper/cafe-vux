<template>
  <div class="block" :style="{height: height + 'px'}">
    {{title}}
  </div>
</template>

<script type="text/ecmascript=6">
export default {
  props: {
    title: {
      type: String
    },
    height: {
      type: Number,
      default: 40
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.block
  background-color rgb(243, 245, 247)
  width 100%
  font-size 20px
  padding 10px
  display flex
  align-items center
</style>
