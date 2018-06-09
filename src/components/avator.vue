<template>
  <div :style="{height: height + 'px'}">
    <img
      :src="url"
      :style="{
        width: width + 'px',
        height: height + 'px',
        borderRadius: radius + '%'
      }">
  </div>
</template>

<script type="text/ecmascript=6">
export default {
  props: {
    url: {
      type: String
    },
    width: {
      type: Number,
      default: 50
    },
    height: {
      type: Number,
      default: 50
    },
    radius: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
