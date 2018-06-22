<template>
  <div class="round-wrapper">
    <span>{{number}}</span>
  </div>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.round-wrapper
  span
    width 30px
    height 30px
    background-color gray;
    color black
    text-align center
    border-radius 15px
</style>
