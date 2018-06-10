<template>
  <div class="split" :class="{'split-margin': margin}">

  </div>
</template>

<script type="text/ecmascript=6">
export default {
  props: {
    margin: {
      type: Boolean
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.split
  width 100%
  height 16px
  border-top 1px solid rgba(7, 17, 27, 0.1)
  border-bottom 1px solid rgba(7, 17, 27, 0.1)
  background #f3f5f7
.split-margin
  margin 5px 0px
</style>
