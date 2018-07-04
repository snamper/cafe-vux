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
import { isObjNotEmpty } from '@/utils/utils';
export default {
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
      if(isObjNotEmpty(this.size)) {
        return this.size + 'px';
      } else {
        return this.width + 'px';
      }
    },
    high() {
      if(isObjNotEmpty(this.size)) {
        return this.size + 'px';
      } else {
        return this.height + 'px';
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
