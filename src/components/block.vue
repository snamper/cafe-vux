<template>
  <div class="block">
    {{title}}
  </div>
</template>

<script type="text/ecmascript=6">
export default {
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.block
  background-color rgb(243, 245, 247)
  height 40px
  width 100%
  font-size 20px
  padding 10px
  display flex
  align-items center
</style>
