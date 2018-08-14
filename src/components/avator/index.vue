<template>
  <div class="avator" :style="{height: high}">
    <img
      :src="url"
      :style="{
        width: wide,
        height: high,
        borderRadius: radius + '%'
      }">
  </div>
</template>

<script type="text/ecmascript=6">
export default {
  name: 'Avator',
  props: {
    url: {
      type: String
    },
    size: {
      type: Number
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
  },
  computed: {
    wide() {
      return this.$tools.isNotEmpty(this.size) ? this.size + 'px' : this.width + 'px';
    },
    high() {
      return this.$tools.isNotEmpty(this.size) ? this.size + 'px' : this.height + 'px';
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
